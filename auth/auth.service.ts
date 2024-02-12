import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthBodyDto, AuthBodySchema, LoginResponseDto, RegisterBodyDto, RegisterResponseDto } from './auth.schema';
import { JwtService } from '@nestjs/jwt';
import { uuid } from 'uuidv4';
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const db = require('../../src/db');
//Εδω βρισκεται η λογικη πισω απο τα auth endpoints
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) {
        
    }
    //Συναρτηση για ελεγχο του κρυπτογραφημενου password
    private async checkPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(password, hash);
    }
    //Συναρτηση για hashing των κωδικων
    public async hashPassword(password: string): Promise<string> {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    // H λογικη του signin endpoint
    public async signin({username, password}: AuthBodyDto): Promise<LoginResponseDto>{
        //Ελεγχος αν υπαρχει ο χρηστης
        const results = await db.query("SELECT id, username, password, displayName, role, email, created_at FROM users WHERE username = ?", [username]);
        if(results.length == 0) throw new NotFoundException("No user found for provided combination");
        const user = results[0];
        //Ελεγχος κωδικου
        const passwordMatch = await this.checkPassword(password, user.password)
        if (!passwordMatch) throw new NotFoundException('No user found for provided combination');
        delete user.password;
        //Παραγωγη jwt
        const payload = {
            access: { id: user.id, username: user.username, }
        };
        user.jwt =  await this.jwtService.signAsync(payload.access)
        //επιστροφη απαντησης
        return user;
    }
    // H λογικη του signup endpoint
    public async signup({username, password, displayName, email}: RegisterBodyDto): Promise<RegisterResponseDto>{
        //ελεγχος για διπλοτυπο username
        const results = await db.query("SELECT id FROM users WHERE username = ?", [username]);
        if(results.length != 0) throw new ConflictException("User already exists.");
        //εισαγωση στη βαση δεδομενων.
        await db.query("INSERT INTO users (id, username, password, displayName, email) VALUES (?,?,?,?,?)", [uuid(), username, await this.hashPassword(password), displayName, email]);
        return {"success": true}
    }
}

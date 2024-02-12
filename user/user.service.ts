import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EditUserDto, UserDto, UserQueryDto, UserQueryResponseDto } from './user.schema';
const db = require('../../src/db');

@Injectable()
export class UserService {
    public async queryUsers(): Promise<UserQueryResponseDto> {
        const total = await db.query("SELECT COUNT(*) AS total FROM users");
        const users = await db.query("SELECT id, username, displayName, email, role FROM users WHERE 1");
        return {total: total.total, users: users};
    }

    public async queryUser(id: string): Promise<UserDto>{
        const user = await db.query("SELECT id, username, displayName, email, role FROM users WHERE id = ?", [id]);
        if(user.length == 0) throw new NotFoundException("No user found for provided id");
        return user[0];
    }

    public async queryUserByUsername(username: string): Promise<UserDto>{
        const user = await db.query("SELECT id, username, displayName, email, role FROM users WHERE username = ?", [username]);
        if(user.length == 0) throw new NotFoundException("No user found for provided name");
        return user[0];
    }

    public async deleteUser(id: string): Promise<Boolean> {
        const user = await this.queryUser(id);
        await db.query("DELETE FROM users WHERE id = ?", [id])
        return true;
    }

    public async editUser(id: string, data: EditUserDto): Promise<Boolean> {
        const user = await this.queryUser(id);
        for(let key in data){
            if(key.includes("username")){
                try{
                    let result = this.queryUserByUsername(data[key]);
                    throw new ConflictException("Username already exists");
                }catch(e){
                    await db.query("UPDATE users SET username = ? WHERE id = ?", [data[key], id]);
                    continue;
                }
            }
            await db.query(`UPDATE users SET ${key} = ? WHERE id = ?`, [data[key], id]);
        }
        return true;
    }
}

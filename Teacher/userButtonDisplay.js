// Υποθέτοντας ότι έχετε έναν κόμβο HTML με κλάση "userBtn"
const userButton = document.querySelector('.userBtn-containerdetails');

// Διαβάζουμε τα δεδομένα από το JSON αρχείο (προσαρμόστε το διαδρομή αν χρειαστεί)
fetch('users.json')
    .then(response => response.json())
    .then(data => {
        // Ανακτήστε τον ρόλο του χρήστη από το data-role attribute
        const userRole = userButton.getAttribute('data-role');

        // Αν υπάρχει ορισμένος ρόλος χρήστη, ενημερώστε τα δεδομένα στο HTML
        if (userRole) {
            const user = getUserDataByRole(data, userRole);
            if (user) {
                updateUserData(user);
            }
        }
    })
    .catch(error => console.error('Error fetching user data:', error));

// Συνάρτηση για την επιστροφή δεδομένων χρήστη με βάση τον ρόλο
function getUserDataByRole(data, role) {
    return data.find(user => user.role.toString() === role);
}

// Συνάρτηση για την ενημέρωση του HTML με τα δεδομένα του χρήστη
function updateUserData(user) {
    const displayNameElement = userButton.querySelector('.userDescription');
    const jobRoleElement = userButton.querySelector('.userBtn-containerdetails-jobRole');

    displayNameElement.textContent = user.displayName;
    jobRoleElement.textContent = getRoleText(user.role);
}

// Συνάρτηση για την επιστροφή κειμένου ρόλου από τον αριθμό ρόλου
function getRoleText(role) {
    switch (role) {
        case 1:
            return 'Manager';
        case 2:
            return 'Teacher';
        case 3:
            return 'User';
        default:
            return 'Unknown Role';
    }
}
$(function() {
    $(".password-show").click(function(event) {
        $(this).toggleClass('fa-eye-slash fa-eye'); //Changing the icon of eye
        var input = $(".input-control");
        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;

    // Συνδεθείτε με τον πραγματικό διακομιστή και ελέγξτε τα διαπιστευτήρια
    fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (!response.ok) {
                alert('Λάθος Όνομα ή Κωδικός');
                throw new Error('Σφάλμα σύνδεσης 1');
            }
            return response.json();
        })
        .then(data => {
            console.log('Επιτυχής σύνδεση:', data);

            if (data.role === 1) {
                localStorage.setItem('userDisplayName', data.displayName);
                localStorage.setItem('jwt', data.jwt);
                console.log('JWT:', data.jwt);
                
                window.location.href = '#';
            }
        })
        .catch(error => {
            console.error('Σφάλμα σύνδεσης:', error);
        });
});
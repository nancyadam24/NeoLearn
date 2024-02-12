const newUser = {
    displayName: "Σουραβλάς Σταύρος",
    username: "teacher1",
    email: "teacher_neolearn@uom.edu.gr",
    password: "teacher1"
  };
  
  fetch('http://localhost:3000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Άλλες ενδεχόμενες κεφαλίδες που χρειάζονται, όπως ένα API κλειδί
    },
    body: JSON.stringify(newUser),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Ο νέος χρήστης προστέθηκε με επιτυχία:', data);
    })
    .catch(error => {
      console.error('Σφάλμα κατά την προσθήκη νέου χρήστη:', error);
    });
  
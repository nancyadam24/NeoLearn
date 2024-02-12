const newUser2 = {
    displayName: "Νάνσυ Αδαμίδου",
    username: "user1",
    email: "user_neolearn@uom.edu.gr",
    password: "user1"
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
  
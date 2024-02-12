document.addEventListener("DOMContentLoaded", function () {
    // Collecting the links of "Download"
   const downloadLinks = document.querySelectorAll("a[href$='.txt']");

   downloadLinks.forEach(function (link) {
         link.addEventListener("click", function (event) {
               event.preventDefault();

               // Collect URL of the file.
               const fileURL = this.getAttribute("href");

               // Φορτώστε το περιεχόμενο του αρχείου με ένα αίτημα AJAX
               const xhr = new XMLHttpRequest();
               xhr.onreadystatechange = function () {
                   if (xhr.readyState === XMLHttpRequest.DONE) {
                       if (xhr.status === 200) {
                           // Appending the content of file to the modal
                           document.getElementById("fileContent").textContent = xhr.responseText;
                           // Appending modal
                           $('#fileModal').modal('show');
                       } else {
                           console.error('Σφάλμα κατά τη φόρτωση του αρχείου.');
                       }
                   }
               };
            xhr.open("GET", fileURL);
            xhr.send();
       });
    });
});

//New Window of the file from modal
document.addEventListener('DOMContentLoaded', function() {
   var newWindowButton = document.getElementById('newWindowBtn');

   newWindowButton.addEventListener('click', function() {
       var fileContent = document.getElementById('fileContent').innerText;

       var newWindow = window.open();
       newWindow.document.write('<pre>' + fileContent + '</pre>');
   });
});

//download of files
document.querySelectorAll('.download-icon').forEach(icon => {
   icon.addEventListener('click', () => {
       const file = icon.getAttribute('data-file');
       const link = document.createElement('a');
       link.setAttribute('href', file);
       link.setAttribute('download', '');
       link.style.display = 'none';
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
   });
});

//Getting size of files
document.addEventListener('DOMContentLoaded', function () {
   getFileSize('arxitektoniki.txt/dialexi1.txt', 'fileSize4');
   getFileSize('arxitektoniki.txt/dialexi2.txt', 'fileSize5');
   getFileSize('arxitektoniki.txt/dialexi3.txt', 'fileSize6');
   getFileSize('arxitektoniki.txt/dialexi4.txt', 'fileSize7');
});

function getFileSize(fileUrl, elementId) {
   fetch(fileUrl)
       .then(response => {
           if (!response.ok) {
               throw new Error('Network response was not ok');
           }
           return response.blob();
       })
       .then(blob => {
           const sizeInKB = (blob.size / 1024).toFixed(2);
           document.getElementById(elementId).innerText = sizeInKB + ' KB';
       })
       .catch(error => {
           console.error('There has been a problem with your fetch operation:', error);
           document.getElementById(elementId).innerText = 'Μέγεθος μη διαθέσιμο';
       });
}


function formatFileSize(sizeInBytes) {
    if (sizeInBytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    // Set i to the index corresponding to KB (kilobytes)
    const i = 1; // index 1 is KB, 2 would be MB, and so on
    
    return parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function uploadFile() {
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();

        formData.append('file', file);

        // Δημιουργία αιτήματος με το fetch API
        fetch('upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('File uploaded successfully.');
                console.log('File path:', data.file_path);

                // Αφού το αρχείο ανέβει με επιτυχία, προσθέστε το στον πίνακα
                const fileDetails = {
                    fileName: file.name,
                    date: new Date().toLocaleDateString(),
                    size: file.size,
                    url: encodeURIComponent(data.file_path)  // Encode the file path
                };
                addFileRow(fileDetails);

                // Εμφάνιση του περιεχομένου του αρχείου στο Modal
                displayFileModal(data.file_path);

                // Ξεκίνηση λήψης του αρχείου
                // Δημιουργία ενός συνδέσμου για τη λήψη του αρχείου
                const downloadLink = document.createElement('a');
                downloadLink.href = data.file_path;
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);

                // Κλικ στον σύνδεσμο για να ξεκινήσει η λήψη
                downloadLink.click();

                // Αφαίρεση του συνδέσμου από το DOM
                document.body.removeChild(downloadLink);
            } else {
                alert('Error uploading file.');
                console.error('Error:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    } else {
        console.error('No file selected.');
    }
}



function getFileDetails(file) {
    // Assuming you want to get details like fileName, date, size, etc.
    // You can customize this function based on your requirements
    const fileName = file.name;
    const date = new Date().toLocaleDateString();
    const size = file.size; // This is in bytes, you may want to format it

    return {
        fileName,
        date,
        size,
        url: URL.createObjectURL(file) // Generate a URL for the file
    };
}

function showFileModal(fileDetails) {
    const fileModal = new bootstrap.Modal(document.getElementById('fileModal'));
    const fileContentElement = document.getElementById('fileContent');

    // Check if fileDetails.url is defined
    if (fileDetails.url) {
        // Fetch the file content using the fetch API
        fetch(fileDetails.url)
            .then(response => {
                // Check if the fetch was successful (status code 200)
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`Failed to fetch file. Status: ${response.status}`);
                }
            })
            .then(fileContent => {
                // Set the content of the modal with the file content
                fileContentElement.innerText = fileContent;

                // Show the modal
                fileModal.show();
            })
            .catch(error => {
                console.error('Error reading file content:', error);
                fileContentElement.innerText = 'Error loading file content.';
                fileModal.show();
            });
    } else {
        console.error('File URL is undefined.');
        fileContentElement.innerText = 'Error: File URL is undefined.';
        fileModal.show();
    }
}



// const jwtToken = 'your_actual_dynamic_jwt_token'; 
// localStorage.setItem('jwt', jwtToken);

// const courseId = 'your_actual_dynamic_course_id'; 
// localStorage.setItem('courseId', courseId);

// function uploadFile() {
//     const fileInput = document.getElementById('fileInput');

//     if (fileInput.files.length > 0) {
//         const authToken = localStorage.getItem('jwt');

//         const courseId = localStorage.getItem('courseId');

    
//         if (!authToken || !courseId) {
//             alert('Σφάλμα ανεβάσματος αρχείου: Λάθος τοκεν ή αναγνωριστικό μαθήματος.');
//             return;
//         }

//         const formData = new FormData();

//         formData.append('file', fileInput.files[0]);

//         fetch(`http://localhost:3000/course/${courseId}/file/upload`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${authToken}`, 
//             },
//             body: formData,
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('File upload successful:', data);

//             addFileRow(data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     } else {
//         alert('Επιλέξτε ένα αρχείο για ανέβασμα.');
//     }
// }


function addFileRow(fileDetails) {
    const tableBody = document.getElementById('fileTableBody');

    // Check if tableBody is null or undefined
    if (!tableBody) {
        console.error('Table body not found.');
        return;
    }

    const icon = getFileIcon(fileDetails.fileName);

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td >${icon}</td>
    <td class="w-auto"><a href="${fileDetails.fileUrl}" download>${fileDetails.fileName}</a></td>
    <td class="w-auto">${fileDetails.date}</td>
    <td class="w-auto" id="fileSizeX">${formatFileSize(fileDetails.size)}</td>
    <td><i class="fa fa-download download-icon" data-file="${fileDetails.url}"></i></td>
    `;  

    // Append the new row to the table body
    tableBody.appendChild(newRow);
    const filenameLink = newRow.querySelector('td.w-auto a');
    filenameLink.addEventListener('click', function (event) {
    event.preventDefault();
    displayFileModal(fileDetails.url);
    });


}


// Function to handle file download
function downloadFile(url) {
    // Create a temporary anchor element
    const downloadLink = document.createElement('a');

    // Set the href attribute to the file URL
    downloadLink.href = url;

    // Set the download attribute to specify the default file name
    downloadLink.download = 'downloaded_file';

    // Append the anchor element to the document body
    document.body.appendChild(downloadLink);

    // Trigger a click event on the anchor element
    downloadLink.click();

    // Remove the anchor element from the document body
    document.body.removeChild(downloadLink);
}

// Add event listener for download icon clicks
document.addEventListener('click', function (event) {
    // Check if the clicked element has the "download-icon" class
    if (event.target.classList.contains('download-icon')) {
        // Get the file URL from the "data-file" attribute
        const fileUrl = event.target.getAttribute('data-file');

        // Download the file
        downloadFile(fileUrl);
    }
});

function getFileIcon(fileName) {
    const iconMap = {
        'txt': '<i class="fa fa-file-text" id="newfiles"></i>',
        'pdf': '<i class="fa fa-file-pdf" id="newfiles"></i>',
        'doc': '<i class="fa fa-file-word" id="newfiles"></i>',
        'docx': '<i class="fa fa-file-word" id="newfiles"></i>',
        'xls': '<i class="fa fa-file-excel" id="newfiles"></i>',
        'xlsx': '<i class="fa fa-file-excel" id="newfiles"></i>',
        'mp4': '<i class="fa fa-file-video" id="newfiles"></i>',
        'avi': '<i class="fa fa-file-video" id="newfiles"></i>',
        'mkv': '<i class="fa fa-file-video" id="newfiles"></i>',
        'mov': '<i class="fa fa-file-video" id="newfiles"></i>',
        'mp3': '<i class="fa fa-file-audio" id="newfiles"></i>',
        'wav': '<i class="fa fa-file-audio" id="newfiles"></i>',
        'png': '<i class="fa fa-file-image" id="newfiles"></i>',
        'jpg': '<i class="fa fa-file-image" id="newfiles"></i>',
        'jpeg': '<i class="fa fa-file-image" id="newfiles"></i>',
        // Add more file types and icons as needed
    };
    
    const defaultIcon = '<i class="fa fa-file"></i>';
    
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const icon = iconMap[fileExtension] || defaultIcon;
    
    return icon;    
}



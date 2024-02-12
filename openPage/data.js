 //Append modal of each file...
 document.addEventListener("DOMContentLoaded", function () {
     // Collecting the links of "Download"
    const downloadLinks = document.querySelectorAll("a[href$='.txt']");

    downloadLinks.forEach(function (link) {
          link.addEventListener("click", function (event) {
                event.preventDefault();

                // Collect URL of the file.
                const fileURL = this.getAttribute("href");

                // Load the content of the file with request AJAX
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

//Download of files
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
    getFileSize('leitourgika.txt/dialexi1.txt', 'fileSize1');
    getFileSize('leitourgika.txt/dialexi2.txt', 'fileSize2');
    getFileSize('leitourgika.txt/dialexi3.txt', 'fileSize3');
    getFileSize('arxitektoniki.txt/dialexi1.txt', 'fileSize4');
    getFileSize('arxitektoniki.txt/dialexi2.txt', 'fileSize5');
    getFileSize('arxitektoniki.txt/dialexi3.txt', 'fileSize6');
    getFileSize('arxitektoniki.txt/dialexi4.txt', 'fileSize7');
    getFileSize('parallilos.txt/dialexi1.txt', 'fileSize8');
    getFileSize('parallilos.txt/dialexi2.txt', 'fileSize9');
    getFileSize('theoria.txt/dialexi3,4', 'fileSize10');
    getFileSize('theoria.txt/dialexi1.txt', 'fileSize11');
    getFileSize('theoria.txt/dialexi2.txt', 'fileSize12');
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

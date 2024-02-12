function addNewLesson() {
    // Show the modal when the button is clicked
    $('#addLessonModal').modal('show');
}

function saveLesson() {
    // Get the values from the input fields
    const lessonName = document.getElementById('lessonName').value;
    const lessonId = document.getElementById('lessonId').value;
    const lessonCont = document.getElementById('content').value;

    // Check if both fields are filled
    if (lessonName && lessonId) {
        // Create a new list item
        const newLessonItem = document.createElement('li');
        newLessonItem.classList.add('boxItems');

        // Create a new link for the lesson--
        const lessonLink = document.createElement('a');
        lessonLink.classList.add('itemsA');
        lessonLink.href = '#' + lessonId; // You can customize the link URL

        // Create a figure element for the lesson
        const lessonFigure = document.createElement('figure');
        lessonFigure.classList.add('text-center');

        // Create a blockquote for the lesson title
        const lessonBlockquote = document.createElement('blockquote');
        lessonBlockquote.classList.add('blockquote');

        // Set the lesson title
        const lessonTitle = document.createElement('h4');
        lessonTitle.innerHTML = `${lessonName} <span class="lesson-id">(${lessonId})</span>`;

        // Append the title to the blockquote
        lessonBlockquote.appendChild(lessonTitle);

        // Create a figcaption for the lesson instructor
        const lessonFigcaption = document.createElement('figcaption');
        lessonFigcaption.style.fontSize = '0.8em';
        lessonFigcaption.style.marginTop = '0.8em';
        lessonFigcaption.innerHTML = '<figcaption class="blockquote-footer">Σουραβλάς Σταύρος</figcaption>'

        // Append the figcaption to the blockquote
        lessonBlockquote.appendChild(lessonFigcaption);

        // Append the blockquote to the figure
        lessonFigure.appendChild(lessonBlockquote);

        // Append the figure to the link
        lessonLink.appendChild(lessonFigure);

        // Append the link to the list item
        newLessonItem.appendChild(lessonLink);

        // Get the existing list and append the new list item
        const lessonList = document.getElementById('box-container').getElementsByTagName('ul')[0];
        lessonList.appendChild(newLessonItem);

        const newLessonHTML = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!--=======================CSS=======================-->
            <link rel="stylesheet" href="commonFeaturesStyle.css">
            <link rel="stylesheet" href="openHomePageStyle.css">
            <link rel="stylesheet" href="content.css">
            <!--==================== "BOOTSTRAP" ====================-->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
            <!--==================== "FONTAWESOME" ====================-->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
                integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
                crossorigin="anonymous" referrerpolicy="no-referrer" />
            <!-- === tiitle of browser tab === -->
            <title>${lessonName}(${lessonId})| NeoLearn</title>
        </head>
        
        <body>
        
            <div class="main-container d-flex">
        
                <!--=============== (vertical) side-navbar ===============-->
                <div class="sidebar" id="side_nav">
                    <div class="header-box px-2 pt-3 pb-4 d-flex justify-content-between">
                        <h1 class="fs-4 logoImg">
                            <a href="lessons.html">
                                <img src="startimg.png" class="logoImage" alt="logoImg">
                            </a>
                        </h1>
                    </div>
                    <br>
        
                    <!-- === basic options with arrow button & tabs === -->
                    <section>
                        <div class="searcher">
                            <span class="search-icon">&#128269;</span>
                            <input type="text" placeholder="Αναζήτηση...">
                        </div>
                        <button class="arrow-button" onclick="toggleCategories()">
                            <img src="tagimg.png" class="backBasicOptions" alt="tagimg">
                            <span class="button-text">Βασικές Επιλογές 
                                <i class="fa fa-chevron-right arrowBMenu"></i>
                            </span>
                        </button>
                        <nav class="customNav">
                            <ul id="categories-list">
                                <a href="data_of_newLesson.html">
                                    <li>
                                        <i class="fa fa-folder"></i>
                                        Έγγραφα
                                    </li>
                                </a>
                                <a href="lessons.html">
                                    <li>
                                        <i class="fa fa-book"></i>
                                        Μαθήματα
                                    </li>
                                </a>
                                <a href="quiz.html">
                                    <li>
                                        <i class="fa fa-question"></i>
                                        Quiz
                                    </li>
                                </a>
                                <a href="#contact">
                                    <li>
                                        <i class="fa fa-phone"></i>
                                        Επικοινωνία
                                    </li>
                                </a>
                            </ul>
                        </nav>
                    </section>
        
                </div>
        
                <!--=============== main-content ===============-->
                <div class="content">
                    <main>
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                            <div class="container-fluid">
        
                                <!--=== Name instead of logo for mobile & open-btn for menu ===-->
                                <div class="d-flex justify-content-between d-md-none d-block">
                                    <a class="navbar-brand fs-4" href="#">Neolearn</a>
                                    <button class="btn px-1 py-0 open-btn navbar-toggler navbarBtn">
                                        <i class="fa fa-stream"></i>
                                    </button>
                                </div>
        
                                <!-- === Account dropdown button === -->
                                <div class="col-1 col-sm-1 col-md-7"></div>
                                <div class="col-6 col-sm-4 col-lg-3 col-xl-4 col-xxl-3 dropdown-center">
                                    <button class=" dropdown-toggle userButton" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <div class="userBtn-container">
                                            <div class="userBtn-containerdetails" data-role="2">
                                                <p class="userDescription">Όνομα χρήστη</p>
                                                <p class="userBtn-containerdetails-jobRole">Ρόλος</p>
                                            </div>
                                            <img src="userimg.png" class="userImage" alt="userImg">
                                        </div>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                                        <li><a class="dropdown-item" href="#">Προφίλ</a></li>
                                        <li><a class="dropdown-item" href="openPage/openHomePage.html">Έξοδος</a></li>
                                    </ul>
                                </div>
        
                            </div>
                        </nav>
        
                        <hr class="mx-2">
        
                        <!--=== pathway when is needed ===-->
                        <nav aria-label="breadcrumb"
                            style="padding: 1em; margin-left: 1em; padding-bottom: 0; margin-bottom: 0;">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item active">
                                    <a href="lessons.html">Αρχική</a>
                                </li>
                                <li class="breadcrumb-item">
                                    <a href="data_of_arxitektoniki.html">Έγγραφα</a>
                                </li>
                                <!-- === Current webpage === -->
                                <li class="breadcrumb-item" aria-current="page">
                                    Περιεχόμενο
                                </li>
                            </ol>
                        </nav>
        
                        <hr class="mx-2">
        
                        <!-- === title of lesson === -->
                        <div class="title">
                            <h2 class="title mt-4">${lessonName}(${lessonId}) </h2>
                            <small class="text-muted">Σουραβλάς Σταύρος</small>
                        </div>
                        <br>
                        <!-- === content of box container of leitourgika === -->
                        <div class="box-container">
                            <div class="col-md-6">
                                <h4 class="titleBoxContainer">Περιγραφή</h4>
                                <div class="col-md-11 lessonImage-container">
                                    <img src="lesson-content-img.png" class="lessonImage img-fluid" alt="lessonImg">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-12 mt-5 ms-6">
                                    ${lessonCont}
                                </div>
                            </div>
                        </div>
                        
                        <br>
        
                        </main>     
        
                         <!--=== footer ===-->
                         <footer id="contact" class="bg-light text-center text-lg-start">
                            <div class="text-center footerS">
                                <p>NeoLearn &copy; 2024</p>
                                <p>Find us on social media:
                                    <a href=""><i class="fa-brands fa-facebook-f"></i></a>
                                    <a href=""><i class="fa-brands fa-instagram"></i></a>
                                    <a href=""><i class="fa-brands fa-linkedin-in"></i></a>
                                </p>
                                <p>Tel: 23xxx-xxxxx &nbsp; Email:souravlas@uom.edu.gr</p>
                            </div>
                        </footer>
                    </div>   
        
        
                <!-- === input JS libraries & files === -->
                <!--=============== JS-BOOTSTRAP-POPPER ===============-->
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
                integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
                crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
                integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
                crossorigin="anonymous"></script>
                <!--=============== J-QUERY ===============-->
                <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        
                <!--=============== custom JS for mobile - side navbar ===============-->
                <script src="mobileSideNavBar.js"></script>
                <script src="basciOptions.js"></script>
                <script src="contact.js"></script>
                <script src="searcher.js"></script>
                <script src="userButtonDisplay.js"></script>
        </body>
        </html>
        `;
            // Create a button for the newly added lesson
            const viewLessonButton = document.createElement('button');
            viewLessonButton.classList.add('btn', 'btn-primary', 'mt-1'); 
            viewLessonButton.style.display = 'block'; 
            viewLessonButton.style.margin = '0 auto'; 
            viewLessonButton.innerHTML = '<i class="fa fa-eye"></i> &nbsp;&nbsp;Προβολή Μαθήματος';
            viewLessonButton.addEventListener('click', function () {
            // Create a new HTML document
            const newLessonHTMLDoc = document.implementation.createHTMLDocument();
            newLessonHTMLDoc.open();
            newLessonHTMLDoc.write(newLessonHTML);
            newLessonHTMLDoc.close();

            // Open the new HTML document in a new window/tab
            const newWindow = window.open();
            newWindow.document.write(newLessonHTML);
        });

        // Append the button to the new lesson item
        newLessonItem.appendChild(viewLessonButton);
        
        // Δημιουργία του HTML αρχείου ως κείμενο
        const newLessonHTMLBlob = new Blob([newLessonHTML], { type: 'text/html' });

        // Δημιουργία ενός στοιχείου link για τον σύνδεσμο του Blob
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(newLessonHTMLBlob);
        downloadLink.download = `${lessonName}_${lessonId}.html`;

        // Προσθήκη του στοιχείου link στον περιηγητή
        document.body.appendChild(downloadLink);

        // Κλικ στο στοιχείο link για το κατέβασμα του αρχείου
        downloadLink.click();

        // Αφαίρεση του στοιχείου link από το DOM
        document.body.removeChild(downloadLink);
        saveLessonToLocal({
                name: lessonName,
                id: lessonId,
        });

    
       $('#addLessonModal').modal('hide');

         // Add your code here to save the lesson details to your server using a POST request
        // // You can use fetch or another AJAX method for this
        // // Example using fetch:
        fetch('http://localhost:3000/course/create', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${jwtToken}`,
             },
             body: JSON.stringify({
                 name: lessonName,
                id: lessonId,
            }),
         });
        
         const jwtToken = localStorage.getItem('jwt');
         console.log('Stored JWT:', localStorage.getItem('jwt'));

         if (!jwtToken) {
             alert('Σφάλμα προσθήκης: Απουσία JWT token.');
            return;
         }
    }
}

 function saveLessonToLocal(lesson) {
    let lessons = JSON.parse(localStorage.getItem('lessons')) || [];

    lessons.push(lesson);

    localStorage.setItem('lessons', JSON.stringify(lessons));
 }

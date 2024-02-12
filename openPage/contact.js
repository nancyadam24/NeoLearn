// Click on link "Επικοινωνία"
$('a[href="#contact"]').on('click', function(event) {
    // Cancel of this behaviour
    event.preventDefault();

    // Scroll with id of the footer
    $('html, body').animate({
        scrollTop: $('#contact').offset().top
    }, 10);
});

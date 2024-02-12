//Select the active current page of drop-down list
$(document).ready(function () {
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.open-btn, .sidebar, .dropdown, .dropList').length) {
            $('.sidebar').removeClass('active');
        }
    });

    $('.open-btn').on('click', function () {
        $('.sidebar').toggleClass('active');
    });

    $(".sidebar ul li").on('click', function () {
        $(".sidebar ul li.active").removeClass('active');
        $(this).addClass('active');
        $('.sidebar').removeClass('active');
    });

    $(".dropList").on('click', function () {
        $('.sidebar').removeClass('active');
    });
});
    
$(document).ready(function() {
    if ($(this).scrollTop() > 0) {
        $('#navbar nav').removeClass('navbar-transparent');
    } else {
        $('#navbar nav').addClass('navbar-transparent');
    }

    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('#navbar nav').removeClass('navbar-transparent');
        } else {
            $('#navbar nav').addClass('navbar-transparent');
        }
    });
});

$(document).ready(function() {
    let catt = "Learn,Implement,Experiment,Educate,Test,Have Fun,Be Practical"

    let categories = catt.split(',');

    new TypeIt('.typed', {
        strings: categories,
        speed: 250, 
        breakLines: false, 
        loop: true
    }).go();
});

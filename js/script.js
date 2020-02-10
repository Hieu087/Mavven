//------------------SLIDES CHANGING------------------
var slideIndex = 0;
var timeOut = 5000;
//------CHANGE SLIDE------
function changeDotPic(n) {
    var pic = document.getElementsByClassName("header-pic");
    var dot = document.getElementsByClassName("dot");

    for (var i = 0; i < pic.length; i++) {
        pic[i].style.opacity = "0";
        dot[i].style.background = "none";
    }

    pic[n].style.opacity = "1";
    dot[n].style.background = "white";
    slideIndex = n;
}

carousel();

function carousel() {
    var pic = document.getElementsByClassName("header-pic");
    var dot = document.getElementsByClassName("dot");

    for (var i = 0; i < pic.length; i++) {
        pic[i].style.opacity = "0";
        dot[i].style.background = "none";
    }

    slideIndex++;
    if (slideIndex > pic.length) {slideIndex = 1}

    pic[slideIndex-1].style.opacity = "1";
    dot[slideIndex-1].style.background = "white";
    setTimeout(carousel, timeOut);
}

$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});

$(document).ready(function(){
    //------------------STICKY------------------
    $('.gender-section').waypoint(
        function(direction){
            if(direction == "down"){
                $('nav').toggleClass('sticky');
            }else{
                $('nav').removeClass('sticky');
            }
        },{
            offset: '440px'
        }
    )

    //------------------HAMBURGER------------------
    $('.hamburger-icon').click(
        function(){
            $('.hamburger').toggleClass('active');
            $('.hamburger-icon').toggleClass('toggle');
        }
    )

    //------------------CART------------------
    $('.cart-icon').click(
        function(){
            $('.cart-container').toggleClass('active');
        }
    )
    $('.cart-exit').click(
        function(){
            $('.cart-container').toggleClass('active');
        }
    )
    //------------------TESTIMONIAL------------------
    $('.testimonial-pics img').click(
        function(){
            $(".testimonial-pics img").removeClass("active");
            $(this).addClass("active");

            $(".testimonial").removeClass("active");
            $("#" + $(this).attr("alt")).addClass("active");
        }
    )
})


        
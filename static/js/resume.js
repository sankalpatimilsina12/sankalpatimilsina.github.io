(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#sideNav"
  });

  // Initialize swiper
  var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: ".swiper-pagination"
    }
  });

  $(window).scroll(function(event) {
    if (
      $(".swiper-container").offset().top <
      $(window).scrollTop() + $(window).outerHeight()
    ) {
      swiper.slideTo(1, 1000);
    }
  });

  // Email section
  $("form").submit(e => {
    e.preventDefault();
    var submitBtn = $(e.target).find("button");

    submitBtn.prop("disabled", true);
    submitBtn.html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting ...`
    );

    $.ajax({
      type: "post",
      url:
        "https://script.google.com/macros/s/AKfycbxf9Jo_UsvKClItkPWaBW8gk2rOnMEy3zmFixKu/exec",
      data: $("#gform").serialize(),
      success: () => {
        $(e.target)
          .find("input[type=text], input[type=email], textarea")
          .val("");
        $(".info-box")
          .removeClass("d-none")
          .html("Cool. I got your message.");
      },
      error: () => {
        $(".info-box")
          .removeClass("d-none")
          .html("Hmm. Something went wrong. Please try again.");
      },
      complete: () => {
        submitBtn.prop("disabled", false);
        submitBtn.html("Submit");
      }
    });
  });
})(jQuery); // End of use strict

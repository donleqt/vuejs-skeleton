/* eslint-disable one-var */

function installBackToTop() {
  if ($('#back-to-top').length) {
    const scrollTrigger = 100;
    const backToTop = function () {
      const scrollTop = $(window).scrollTop();
      if (scrollTop > scrollTrigger) {
        $('#back-to-top').addClass('show');
      } else {
        $('#back-to-top').removeClass('show');
      }
    };

    backToTop();
    $(window).on('scroll', () => {
      backToTop();
    });
    $('#back-to-top').on('click', (e) => {
      e.preventDefault();
      $('html,body').animate(
        {
          scrollTop: 0,
        },
        700,
      );
    });
  }
}

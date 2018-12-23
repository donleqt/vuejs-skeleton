if (global.isClient) {
  global.nanobar = new (require('nanobar'))();

  // $(document).on('click', '.form-check label', (event) => {
  //   event.preventDefault();
  //   event.stopImmediatePropagation();
  //   $(event.currentTarget)
  //     .siblings('input')
  //     .click();
  // });

  // $(document).on('click', '[toggle-class]', (event) => {
  //   event.preventDefault();
  //   event.stopImmediatePropagation();
  //   const className = $(event.currentTarget).attr('toggle-class');
  //   $(event.currentTarget).toggleClass(className);
  // });

  // $('html').addClass('client-mode');
}

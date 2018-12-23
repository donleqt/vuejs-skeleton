import './page-loader.scss';

let $icon = null;

if (typeof window !== 'undefined') {
  const loaderMarkup = `
    <div class="page-loader" style="display:none;">
      <span class="loading-icon"><i></i></span>
    </div>
  `;
  if ($icon === null) {
    $icon = $(loaderMarkup);
    $('body').append($icon);
  }
}

const pageLoader = {
  show() {
    if ($icon) {
      $icon.fadeIn('slow');
    }
  },
  hide() {
    if ($icon) {
      $icon.fadeOut('fast');
    }
  },
};

export default pageLoader;

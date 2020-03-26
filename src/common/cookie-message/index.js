/* eslint-disable max-len */
import './style.scss';

export default function initCookieMessage(options = {}) {
  const key = 'accepted_cookie';
  const isAccepted = localStorage.getItem(key);
  const defaultMessage = `<span>
  This website use cookies. By using our website you agree to our
  <a
    class="ilink"
    target="_blank" 
    title="Privacy Policy"
    href="/privacy-policy-doc.html">
    Privacy Policy
  </a>
  </span>`;

  const template = `
    <div class="cookie-message">
      <div class="cookie-message__inner">
        ${options.message || defaultMessage}
        <button class="btn btn-accept">
          Got it
        </button>
      </div>
    </div>
  `;

  if (!isAccepted) {
    if (!$('.cookie-message').length) {
      $('body').append(template);
    }

    $(document).on('click', '.cookie-message .btn-accept', () => {
      localStorage.setItem(key, 1);
      $('.cookie-message').remove();
    });
  }
}
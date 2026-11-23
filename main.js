// STATIC — front-end interactions (no backend yet)
// 1. Demo forms with real-time validation (errors appear as you type)
// 2. Home search: filter album cards live as the user types
// 3. Featured slider: Prev/Next sized from the real card width
//    (the track's native scrollbar is also draggable — see CSS §11)

(() => {
  'use strict';

  /* ---------------------------------------------------------
     1. Demo forms — validate while the user types
     Each field points to its error message with aria-describedby
     (the element with class "form__error"), so screen readers
     read the message when the field is focused.
     --------------------------------------------------------- */
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const SUCCESS_MESSAGE = 'Message sent (demo only — no backend connected yet).';
  const FIX_MESSAGE = 'Fix the highlighted fields, then send again.';

  function getLabelText(field) {
    const label = field.form.querySelector('label[for="' + field.id + '"]');
    return label ? label.textContent.trim() : 'This field';
  }

  function getErrorElement(field) {
    const ids = (field.getAttribute('aria-describedby') || '').split(/\s+/);
    for (const id of ids) {
      const element = id ? document.getElementById(id) : null;
      if (element && element.classList.contains('form__error')) return element;
    }
    return null;
  }

  // Returns an error message, or '' when the field is valid.
  function getErrorMessage(field) {
    const value = field.value.trim();
    const label = getLabelText(field);

    if (field.required && value === '') {
      return label + ' is required.';
    }
    if (field.type === 'email' && value !== '' && !EMAIL_PATTERN.test(value)) {
      return 'Enter a valid email address, like name@example.com.';
    }
    if (field.minLength > 0 && value.length < field.minLength) {
      return label + ' must be at least ' + field.minLength + ' characters.';
    }
    return '';
  }

  // Updates aria-invalid + the visible message. Returns true when valid.
  function validateField(field) {
    const message = getErrorMessage(field);
    const errorElement = getErrorElement(field);

    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (errorElement && errorElement.textContent !== message) {
      errorElement.textContent = message; // only changes when the message does
    }
    return message === '';
  }

  function clearFieldState(field) {
    const errorElement = getErrorElement(field);
    field.removeAttribute('aria-invalid');
    delete field.dataset.touched;
    if (errorElement) errorElement.textContent = '';
  }

  function setStatus(form, message, isError) {
    const status = form.querySelector('[data-form-status]');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('form__status--error', isError);
  }

  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    const fields = Array.from(form.querySelectorAll('.field'));

    // Our own messages replace the browser's pop-up bubbles.
    form.noValidate = true;

    fields.forEach((field) => {
      // As the user types: validate immediately and show red errors live.
      field.addEventListener('input', () => {
        field.dataset.touched = 'true';
        validateField(field);
        setStatus(form, '', false);
      });
      // When the user leaves a field: validate even if it is still empty.
      field.addEventListener('blur', () => {
        field.dataset.touched = 'true';
        validateField(field);
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let firstInvalid = null;
      fields.forEach((field) => {
        field.dataset.touched = 'true';
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        setStatus(form, FIX_MESSAGE, true);
        firstInvalid.focus();
        return;
      }

      form.reset();
      fields.forEach(clearFieldState);
      setStatus(form, SUCCESS_MESSAGE, false);
    });
  });

  /* ---------------------------------------------------------
     2. Home search — filter album cards LIVE
     --------------------------------------------------------- */
  const searchForm = document.querySelector('[data-search]');
  if (searchForm) {
    const input = searchForm.querySelector('input[type="search"]');
    const status = document.querySelector('[data-search-status]');
    const cards = Array.from(document.querySelectorAll('.album-card'));

    function runSearch() {
      const query = input.value.trim().toLowerCase();
      let shown = 0;

      cards.forEach((card) => {
        const matches = query === '' || card.textContent.toLowerCase().includes(query);
        card.hidden = !matches;
        if (matches) shown += 1;
      });

      if (status) {
        status.textContent =
          query === ''
            ? ''
            : 'Showing ' + shown + ' of ' + cards.length + ' releases for "' + input.value.trim() + '".';
      }

      // Let sliders recalculate their Prev/Next state after cards hide or show.
      document.dispatchEvent(new CustomEvent('static:filter'));
    }

    // Filter live as they type
    input.addEventListener('input', runSearch);

    // Prevent form submission from reloading the page
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      runSearch();
    });
  }

  /* ---------------------------------------------------------
     3. Featured slider — Prev/Next
     The scroll distance is measured from the real .album-card width
     plus the track's gap. It scrolls one card at a time.
     --------------------------------------------------------- */
  const EDGE_TOLERANCE = 1; // sub-pixel rounding allowance when checking the scroll edges
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('.slider__track');
    const prev = slider.querySelector('[data-slider-prev]');
    const next = slider.querySelector('[data-slider-next]');
    if (!track) return;

    function getScrollDistance() {
      const card = Array.from(track.querySelectorAll('.album-card')).find((item) => !item.hidden);
      if (!card) return track.clientWidth;

      const cardWidth = card.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return cardWidth + gap; // Scroll exactly one card at a time
    }

    function setDisabled(button, isDisabled) {
      if (!button) return;
      // aria-disabled (not "disabled") keeps keyboard focus on the button at the ends.
      button.setAttribute('aria-disabled', String(isDisabled));
    }

    function updateButtons() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      setDisabled(prev, track.scrollLeft <= EDGE_TOLERANCE);
      setDisabled(next, track.scrollLeft >= maxScroll - EDGE_TOLERANCE);
    }

    function scrollTrack(direction) {
      track.scrollBy({
        left: direction * getScrollDistance(),
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
      });
    }

    if (prev) {
      prev.addEventListener('click', () => {
        if (prev.getAttribute('aria-disabled') !== 'true') scrollTrack(-1);
      });
    }
    if (next) {
      next.addEventListener('click', () => {
        if (next.getAttribute('aria-disabled') !== 'true') scrollTrack(1);
      });
    }

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    document.addEventListener('static:filter', updateButtons);
    updateButtons();
  });
})();
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

export function setupCloseButtons() {
  document.querySelectorAll('.popup__close').forEach(button => {
    button.addEventListener('click', (evt) => {
      const popup = evt.target.closest('.popup');
      if (popup) {
        closeModal(popup);
      }
    });
  });
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

export function setupCloseModalOnOverlayClick() {
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  });
}
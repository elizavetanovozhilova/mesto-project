import '../pages/index.css';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';
import { initialCards } from './cards.js';
import { setupCloseButtons } from '../components/modal.js';
import { 
    enableValidation, 
    hideInputError,
    showInputError,
    checkInputValidity,
    toggleButtonState
  } from '../components/validate.js';
import { createCard, handleLike, handleDelete } from '../components/card.js';
import { openModal, closeModal, setupCloseModalOnOverlayClick } from '../components/modal.js';

document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placesList = document.querySelector('.places__list');
const profileFormElement = document.querySelector('form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('[name="name"]');
const jobInput = profileFormElement.querySelector('[name="description"]');
const cardFormElement = document.querySelector('form[name="new-place"]');
const placeNameInput = cardFormElement.querySelector('[name="place-name"]');
const placeLinkInput = cardFormElement.querySelector('[name="link"]');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

setupCloseModalOnOverlayClick();
enableValidation(validationSettings);
setupCloseButtons();
renderInitialCards();

editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    
    const formElement = document.querySelector('form[name="edit-profile"]');
    const settings = validationSettings;
    
    hideInputError(formElement, nameInput, settings);
    hideInputError(formElement, jobInput, settings);
    
    const inputList = [nameInput, jobInput];
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    
    openModal(profilePopup);
  });

profileAddButton.addEventListener('click', () => openModal(cardPopup));

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

function renderInitialCards() {
  initialCards.forEach(cardData => {
    const cardElement = createCard(
      cardData,
      handleDelete,
      handleLike,
      (cardData) => {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;
        openModal(imagePopup);
      }
    );
    placesList.prepend(cardElement);
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  
  const newCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };
  
  const cardElement = createCard(
    newCard,
    handleDelete,
    handleLike,
    (cardData) => {
      popupImage.src = cardData.link;
      popupImage.alt = cardData.name;
      popupCaption.textContent = cardData.name;
      openModal(imagePopup);
    }
  );
  
  placesList.prepend(cardElement);
  cardFormElement.reset();
  closeModal(cardPopup);
}
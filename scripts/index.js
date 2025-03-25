const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editProfileButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const closeProfileButton = profilePopup.querySelector('.popup__close');
const closeCardButton = cardPopup.querySelector('.popup__close'); 

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const closeImageButton = imagePopup.querySelector('.popup__close');

// Добавлены константы для элементов профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

document.querySelectorAll('.popup').forEach(popup => {
  popup.classList.add('popup_is-animated');
});

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

editProfileButton.addEventListener('click', () => openModal(profilePopup));
profileAddButton.addEventListener('click', () => openModal(cardPopup));

closeProfileButton.addEventListener('click', () => closeModal(profilePopup));
closeCardButton.addEventListener('click', () => closeModal(cardPopup));

const profileFormElement = document.querySelector('form[name="edit-profile"]')
const nameInput = profileFormElement.querySelector('[name="name"]')
const jobInput = profileFormElement.querySelector('[name="description"]')

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
});

const placesList = document.querySelector('.places__list');

function createCard(cardData, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button')
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name; 
    cardTitle.textContent = cardData.name;
    
    deleteButton.addEventListener('click', () => deleteCallback(cardElement));
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    }); 

    cardImage.addEventListener('click', () => {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;
        openModal(imagePopup);
    });
    
    return cardElement;
}

closeImageButton.addEventListener('click', () => closeModal(imagePopup));

function deleteCard(cardElement) {
    cardElement.remove();
}

function addCard(cardElement) {
    placesList.prepend(cardElement);
}

function renderCards() {
    initialCards.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard);
        addCard(cardElement);
    });
}

const cardFormElement = document.querySelector('form[name="new-place"]');
const placeNameInput = cardFormElement.querySelector('[name="place-name"]');
const placeLinkInput = cardFormElement.querySelector('[name="link"]');

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    
    const newCard = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };
    
    const cardElement = createCard(newCard, deleteCard);
    addCard(cardElement);
    
    cardFormElement.reset();
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

renderCards();
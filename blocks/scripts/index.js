const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.popup-open');
const closePopup = popup.querySelector('.popup__close');

//функция открытия/закрытия попапа
function togglePopup() {
  popup.classList.toggle('popup__opened');
} 

popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

openPopup.addEventListener('click', togglePopup);

closePopup.addEventListener('click', togglePopup);



let profile = document.querySelector('.profile');
let profileInfo = profile.querySelector('.profile__info');
let profileTitle = profile.querySelector('.profile__title'); /*Имя в профиле*/
let profileSubtitle = profile.querySelector('.profile__subtitle'); /*Кто есть в профиле*/

let heading = popup.querySelector('.popup__item_heading'); //имя в попап
let subheading = popup.querySelector('.popup__item_subheading'); //данные в попап

let submitButton = popup.querySelector('.popup__submit'); //кнопка Сохранить в попап

submitButton.addEventListener('click', addInfo); /*Событие для кнопки Сохранить*/
openPopup.addEventListener('click', newAtt);


function addInfo() {
  profileTitle.innerHTML = heading.value; //innerHTML - записать текст(код) в парный тег (<h1>) 
  profileSubtitle.innerHTML = subheading.value; //value - получить текст из input 'имя'
  event.preventDefault(); //обработчик чтобы страница не перезагружалась после отправки формы
  togglePopup(); //функция для закрытия попапа после успешной отправки формы
  heading.value = ''; //очистить поля после отправки
  subheading.value = '';
} 

function newAtt() {
  heading.setAttribute("placeholder", profileTitle.textContent); //подставляет текст из заголовка в placeholder
  subheading.setAttribute("placeholder", profileSubtitle.textContent);
}




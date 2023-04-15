import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getDatabase,
  get,
  set,
  update,
  ref,
  push,
  child,
} from 'firebase/database';
import Notiflix from 'notiflix';

const refs = {
  authorizationButton: document.querySelector('.btn__authorization'),
  authorizationModal: document.querySelector('.authorization-modal__backdrop'),
  authorizationModalCloseButton: document.querySelector(
    '.authorization-modal__close-button'
  ),
  loginForm: document.querySelector('.authorization-modal__login-form'),
  signupForm: document.querySelector('.authorization-modal__signup-form'),
  loginButton: document.querySelector('.authorization-modal__login-button'),
  signupButton: document.querySelector('.authorization-modal__signup-button'),
  logOffButton: document.querySelector('.logoff'),
};

refs.authorizationButton.addEventListener('click', authorizationModalToggle);
// refs.authorizationModal.addEventListener('click', onBackdropClick);
refs.authorizationModalCloseButton.addEventListener('click', onCloseModal);
refs.loginForm.addEventListener('submit', loginSubmitHandler);
refs.signupForm.addEventListener('submit', signupSubmitHandler);
refs.logOffButton.addEventListener('click', logOff);

function authorizationModalToggle() {
  window.addEventListener('keydown', onEscButtonPressed);
  refs.authorizationModal.classList.toggle('hidden');
}

function onEscButtonPressed(event) {
  if (event.code === 'Escape') {
    refs.authorizationModal.classList.toggle('hidden');
    window.removeEventListener('keydown', onEscButtonPressed);
  }
}

// function onBackdropClick(event) {
//   event.preventDefault();
//   const backdrop = event.target;
//   if (backdrop.classList.contains('authorization-modal__backdrop')) {
//     onCloseModal();
//   }
// }

function onCloseModal() {
  authorizationModalToggle();
  window.removeEventListener('keydown', onEscButtonPressed);
}

const rawData = [
  { id: '1', name: 'Yu Soroka', number: '111-11-11' },
  { id: '2', name: 'Yurii Soroka', number: '111-11-11' },
  { id: '3', name: 'Yur Soroa', number: '111-11-11' },
  { id: '4', name: 'Yrii Soka', number: '111-11-11' },
];

// ініціалізація додатку, авторизації, та бази даних firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

const currentDate = new Date();

// функція реєстрації
function signupSubmitHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const login = form.elements.login.value;
  const password = form.elements.password.value;
  console.log(form);

  createUserWithEmailAndPassword(auth, login, password)
    .then(userCredential => {
      const user = userCredential.user;

      set(ref(database, 'users/' + user.uid), {
        email: login,
        registerDate: currentDate.toLocaleString(),
      })
        .then(() => {
          Notiflix.Notify.success('Реєстрація успішна');
          form.reset();
          onCloseModal();
        })
        .catch(error => {
          Notiflix.Notify.failure(`Помилка реєстрації ${error.message}`);
        });
    })
    .catch(error => {
      const errorMessage = error.message;
      Notiflix.Notify.failure(`Помилка реєстрації ${errorMessage}`);
    });
}

// функція логіну
function loginSubmitHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const login = form.elements.login.value;
  const password = form.elements.password.value;
  console.log(form);

  signInWithEmailAndPassword(auth, login, password)
    .then(userCredential => {
      const user = userCredential.user;
      // додати або оновити властивість lastLoginDate в конкретного користувача
      update(ref(database, 'users/' + user.uid), {
        lastLoginDate: currentDate.toLocaleString(),
      })
        .then(() => {
          Notiflix.Notify.success('Авторизація успішна');
          form.reset();
          onCloseModal();
        })
        .catch(error => {
          Notiflix.Notify.failure(`Помилка входу ${error.message}`);
        });
    })
    .catch(error => {
      const errorMessage = error.message;
      Notiflix.Notify.failure(`Помилка входу ${errorMessage}`);
    });
}

// функція виходу
function logOff() {
  signOut(auth)
    .then(() => {
      Notiflix.Notify.warning('Авторизацію скасовано');
    })
    .catch(error => {
      Notiflix.Notify.warning(`Виникли проблеми при виході: ${error.message}`);
    });
}

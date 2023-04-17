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

const LOGIN_STATE_KEY = 'loginState';
let uid = '';

const queueResults = [];
const watchedResults = [];

let temp;

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
  signupFormSwitcher: document.querySelector(
    '.authorization-modal__signup-form-switcher'
  ),
  loginFormSwitcher: document.querySelector(
    '.authorization-modal__login-form-switcher'
  ),
  logOffButton: document.querySelector('.authorization-modal__logoff'),
  userInformation: document.querySelector(
    '.authorization-modal__user-information'
  ),
  userEmailLabel: document.querySelector('.authorization-modal__user-email'),
};

refs.authorizationButton.addEventListener('click', authorizationModalToggle);
refs.authorizationModal.addEventListener('click', onBackdropClick);
refs.authorizationModalCloseButton.addEventListener('click', onCloseModal);
refs.loginForm.addEventListener('submit', loginSubmitHandler);
refs.signupForm.addEventListener('submit', signupSubmitHandler);
refs.logOffButton.addEventListener('click', logOff);
refs.loginFormSwitcher.addEventListener('click', loginFormHideSwitcher);
refs.signupFormSwitcher.addEventListener('click', signupFormHideSwitcher);

//
isUserAuthenticatedHandler();

function authorizationModalToggle() {
  window.addEventListener('keydown', onEscButtonPressed);
  refs.authorizationModal.addEventListener('click', onBackdropClick);
  refs.authorizationModal.classList.toggle('hidden');
}

function onEscButtonPressed(event) {
  if (event.code === 'Escape') {
    refs.authorizationModal.classList.toggle('hidden');
    window.removeEventListener('keydown', onEscButtonPressed);
  }
}

function onBackdropClick(event) {
  event.preventDefault();
  const backdrop = event.target;
  // backdrop.classList.contains('authorization-modal__backdrop');
  if (backdrop === refs.authorizationModal) {
    onCloseModal();
  }
  refs.authorizationModal.removeEventListener('click', onBackdropClick);
}

function onCloseModal() {
  authorizationModalToggle();
  window.removeEventListener('keydown', onEscButtonPressed);
}

function loginFormHideSwitcher() {
  refs.loginForm.classList.toggle('hidden');
  refs.signupForm.classList.toggle('hidden');
}

function signupFormHideSwitcher() {
  refs.signupForm.classList.toggle('hidden');
  refs.loginForm.classList.toggle('hidden');
}

function isUserAuthenticatedHandler() {
  const isLoginState = localStorage.getItem(LOGIN_STATE_KEY);
  if (isLoginState) {
    const parsedData = JSON.parse(isLoginState);
    refs.loginForm.classList.toggle('hidden');
    refs.userInformation.classList.toggle('hidden');
    refs.userEmailLabel.textContent = parsedData.userEmail;
    uid = parsedData.userId;
  }
  return;
}

function saveLoginState(userId, userEmail) {
  const loginState = {
    userId,
    userEmail,
  };
  const rawData = JSON.stringify(loginState);
  localStorage.setItem(LOGIN_STATE_KEY, rawData);
}

function removeLoginState() {
  localStorage.removeItem(LOGIN_STATE_KEY);
}

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
          isUserAuthenticated = true;
          userEmail = login;
          saveLoginState(user.uid, login);
          isUserAuthenticatedHandler();
          onCloseModal();
          dataSync();
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
      removeLoginState();
      onCloseModal();
      refs.loginForm.classList.toggle('hidden');
      refs.userInformation.classList.toggle('hidden');
    })
    .catch(error => {
      Notiflix.Notify.warning(`Виникли проблеми при виході: ${error.message}`);
    });
}

async function readQueueDataFromDatabase() {
  const userId = uid;
  const dbRef = ref(database, `users/${userId}/queue`);
  const queueSnapshot = await get(dbRef);
  if (queueSnapshot.exists()) {
    return queueSnapshot.val();
  }
}

async function readWatchedDataFromDatabase() {
  const userId = uid;
  const dbRef = ref(database, `users/${userId}/watched`);
  const watchedSnapshot = await get(dbRef);
  if (watchedSnapshot.exists()) {
    return watchedSnapshot.val();
  }
}

if (uid !== '') {
  dataSync();
}
// синхронізація firebase та local storage
function dataSync() {
  const watchedLocalData = localStorage.getItem('watched');
  const queueLocalData = localStorage.getItem('queue');
  const watchedLocalArray = JSON.parse(watchedLocalData);
  const queueLocalArray = JSON.parse(queueLocalData);
  readWatchedDataFromDatabase().then(movies => {
    try {
      if (!watchedLocalArray && movies) {
        localStorage.setItem('watched', JSON.stringify(movies));
      }
      const watchedArrayRef = ref(database, `users/${uid}/watched`);
      movies ? watchedLocalArray?.concat(movies) : null;
      set(watchedArrayRef, watchedLocalArray);
    } catch (error) {
      Notiflix.Notify.failure(`Помилка ${error.message}`);
    }
  });

  readQueueDataFromDatabase().then(movies => {
    try {
      if (!queueLocalArray && movies) {
        localStorage.setItem('queue', JSON.stringify(movies));
      }
      const queueArrayRef = ref(database, `users/${uid}/queue`);
      movies ? queueLocalArray?.concat(movies) : null;
      set(queueArrayRef, queueLocalArray);
    } catch (error) {
      Notiflix.Notify.failure(`Помилка ${error.message}`);
    }
  });
}

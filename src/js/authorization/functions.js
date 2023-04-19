import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDatabase, get, set, update, ref } from 'firebase/database';
import { Notify } from 'notiflix';
import { showLoader, hideLoader } from '../loader';

const LOGIN_STATE_KEY = 'loginState';
let uid = '';

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
refs.authorizationModalCloseButton.addEventListener('click', onCloseModal);
refs.loginForm.addEventListener('submit', loginSubmitHandler);
refs.signupForm.addEventListener('submit', signupSubmitHandler);
refs.logOffButton.addEventListener('click', logOff);
refs.loginFormSwitcher.addEventListener('click', loginFormHideSwitcher);
refs.signupFormSwitcher.addEventListener('click', signupFormHideSwitcher);

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

function isUserRegisteredHandler() {
  const isLoginState = localStorage.getItem(LOGIN_STATE_KEY);
  if (isLoginState) {
    const parsedData = JSON.parse(isLoginState);
    refs.signupForm.classList.toggle('hidden');
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
  showLoader();
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
          Notify.success('Signup successful.');
          form.reset();
          saveLoginState(user.uid, login);
          isUserRegisteredHandler();
          dataSync();
          onCloseModal();
          hideLoader();
          if (
            window.location.href === 'http://localhost:1234/my-library.html' ||
            window.location.href ===
              'https://di-liza.github.io/filmoteka-team-3/my-library.html'
          ) {
            setTimeout(() => location.reload(), 900);
          }
        })
        .catch(error => {
          Notify.failure(`Firebase signup error.`);
          hideLoader();
        });
    })
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        Notify.failure(`Signup error: Invalid email.`);
      } else if (error.code === 'auth/weak-password') {
        Notify.failure(`Signup error: Password is too weak.`);
      } else {
        Notify.failure(`Firebase signup error.`);
      }
      hideLoader();
    });
}

// функція логіну
function loginSubmitHandler(event) {
  showLoader();
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
          Notify.success('Login successful.');
          form.reset();
          saveLoginState(user.uid, login);
          isUserAuthenticatedHandler();
          onCloseModal();
          dataSync();
          hideLoader();
          if (
            window.location.href === 'http://localhost:1234/my-library.html' ||
            window.location.href ===
              'https://di-liza.github.io/filmoteka-team-3/my-library.html'
          ) {
            setTimeout(() => location.reload(), 900);
          }
        })
        .catch(error => {
          Notify.failure(`Firebase login error.`);
          hideLoader();
        });
    })
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        Notify.failure(`Login error: Invalid email.`);
      } else if (error.code === 'auth/user-not-found') {
        Notify.failure(`Login error: User not found.`);
      } else if (error.code === 'auth/wrong-password') {
        Notify.failure(`Login error: Wrong password.`);
      } else {
        Notify.failure(`Firebase login error.`);
      }
      hideLoader();
    });
}

// функція виходу
function logOff() {
  signOut(auth)
    .then(() => {
      Notify.warning('Logout successful.');
      removeLoginState();
      onCloseModal();
      localStorage.clear();
      refs.loginForm.classList.toggle('hidden');
      refs.userInformation.classList.toggle('hidden');
      setTimeout(() => location.reload(), 900);
    })
    .catch(error => {
      Notify.warning(`Firebase logout error.`);
    });
}

async function readQueueDataFromDatabase() {
  const dbRef = ref(database, `users/${uid}/queue`);
  const queueSnapshot = await get(dbRef);
  if (queueSnapshot.exists()) {
    return queueSnapshot.val();
  }
}

async function readWatchedDataFromDatabase() {
  const dbRef = ref(database, `users/${uid}/watched`);
  const watchedSnapshot = await get(dbRef);
  if (watchedSnapshot.exists()) {
    return watchedSnapshot.val();
  }
}

if (uid !== '') {
  dataSync();
}
// синхронізація firebase та local storage
export function dataSync() {
  const watchedLocalData = localStorage.getItem('watched');
  const queueLocalData = localStorage.getItem('queue');
  const watchedLocalArray = JSON.parse(watchedLocalData);
  const queueLocalArray = JSON.parse(queueLocalData);
  readWatchedDataFromDatabase().then(movies => {
    try {
      const watchedArrayRef = ref(database, `users/${uid}/watched`);
      if (watchedLocalArray && movies) {
        if (movies.length > watchedLocalArray.length) {
          set(watchedArrayRef, watchedLocalArray);
        } else {
          const arrayOfUniqueMovies = watchedLocalArray
            .concat(movies)
            .filter((movie, index, array) => {
              return (
                index ===
                array.findIndex(obj => {
                  return obj.id === movie.id;
                })
              );
            });
          set(watchedArrayRef, arrayOfUniqueMovies);
          localStorage.setItem('watched', JSON.stringify(arrayOfUniqueMovies));
        }
      } else if (!watchedLocalArray && movies) {
        localStorage.setItem('watched', JSON.stringify(movies));
      } else if (watchedLocalArray && !movies) {
        set(watchedArrayRef, watchedLocalArray);
      }
    } catch (error) {
      Notify.failure(`Error: ${error.message}`);
    }
  });

  readQueueDataFromDatabase().then(movies => {
    try {
      const queueArrayRef = ref(database, `users/${uid}/queue`);
      if (queueLocalArray && movies) {
        if (movies.length > queueLocalArray.length) {
          set(queueArrayRef, queueLocalArray);
        } else {
          const arrayOfUniqueMovies = queueLocalArray
            .concat(movies)
            .filter((movie, index, array) => {
              return (
                index ===
                array.findIndex(obj => {
                  return obj.id === movie.id;
                })
              );
            });
          set(queueArrayRef, arrayOfUniqueMovies);
          localStorage.setItem('queue', JSON.stringify(arrayOfUniqueMovies));
        }
      } else if (!queueLocalArray && movies) {
        localStorage.setItem('queue', JSON.stringify(movies));
      } else if (queueLocalArray && !movies) {
        set(queueArrayRef, queueLocalArray);
      }
    } catch (error) {
      Notify.failure(`Error: ${error.message}`);
    }
  });
}

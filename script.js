import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { GithubAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDT-JMa0jFS_4ye3PNAe74WJi2uU8Rubt4",
  authDomain: "autentificacion-confiweb.firebaseapp.com",
  projectId: "autentificacion-confiweb",
  storageBucket: "autentificacion-confiweb.appspot.com",
  messagingSenderId: "375052651567",
  appId: "1:375052651567:web:8ed292809a3fa8c37d0ada",
  measurementId: "G-G73NENNTW7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const container = document.querySelector('.container');
const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');

btnSignUp.addEventListener('click', () => {
  container.classList.add('toggle'); 
});

btnSignIn.addEventListener('click', () => {
  container.classList.remove('toggle'); 
});


const signInForm = document.querySelector('.sign-in');
const signUpForm = document.querySelector('.sign-up');


signInForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signInForm.querySelector('input[placeholder="Email"]').value;
  const password = signInForm.querySelector('input[placeholder="Password"]').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      alert(`¡Bienvenido, ${user.email}! Has iniciado sesión.`);
    })
    .catch(error => {
      alert("Error al iniciar sesión: " + error.message);
    });
});


signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signUpForm.querySelector('input[placeholder="Email"]').value;
  const password = signUpForm.querySelector('input[placeholder="Password"]').value;
  const nombre = signUpForm.querySelector('input[placeholder="Nombre"]').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;


      updateProfile(user, { displayName: nombre })
        .then(() => {
          alert(`Usuario registrado: ${nombre}`);

        });
    })
    .catch(error => {
      alert("Error al registrarse: " + error.message);
    });
});

//google login
const googleIcon = document.querySelector('ion-icon[name="logo-google"]');

if (googleIcon) {
  googleIcon.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account' 
    });

signInWithPopup(auth, provider)
  .then(result => {
    const user = result.user;
  
    window.location.href = 'dashboard.html';
  })      .catch(error => {
        console.error('Error en inicio con Google:', error);
        alert('Error al iniciar sesión con Google: ' + error.message);
      });
  });
} else {
  console.error('No se encontró el icono de Google');
}
//github login
const gitHubIcon = document.querySelector('ion-icon[name="logo-github"]');

gitHubIcon.addEventListener('click', async () => {
  const provider = new GithubAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert(`¡Bienvenido, ${user.displayName || user.email}! Has iniciado sesión con GitHub.`);
} catch (error) {
  console.error('Error en inicio con GitHub:', error);

  if (error.code === 'auth/account-exists-with-different-credential') {
    alert("Ya existe una cuenta con ese correo. Intenta iniciar sesión con Google o Email.");
  } else {
    alert('Error al iniciar sesión con GitHub: ' + error.message);
  }
}
  
});
//Facebook login
const facebookIcon = document.querySelector('ion-icon[name="logo-facebook"]');

facebookIcon.addEventListener('click', async () => {
  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert(`¡Bienvenido, ${user.displayName || user.email}! Has iniciado sesión con Facebook.`);
  } catch (error) {
    console.error('Error en inicio con Facebook:', error);

    if (error.code === 'auth/account-exists-with-different-credential') {
      alert("Ya existe una cuenta con ese correo. Intenta iniciar sesión con Google o Email.");
    } else {
      alert('Error al iniciar sesión con Facebook: ' + error.message);
    }
  }
});

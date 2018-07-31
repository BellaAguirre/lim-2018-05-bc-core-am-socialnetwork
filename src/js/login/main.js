const formRegisterUser = document.getElementById('register-user');
const btnEnviar = document.getElementById('submitbutton');
const email = document.getElementById('email');
const name = document.getElementById('usr');
const password = document.getElementById('pwd');
const repeatPassword = document.getElementById('rpwd');
const valido = document.getElementById('emailOK');
const validusr = document.getElementById('usrOK');
const valid = document.getElementById('rpwdOK');
const validpwd = document.getElementById('pwdOK');
const menssageErrorEmail = document.getElementById('mesage');
const menssageErrorPassword = document.getElementById('mesage-pwd');
const menssageErrorLogin = document.getElementById('mesage-login');
const signInBtn = document.getElementById('signInButton');
const formSignIn = document.getElementById("signIn");
const formSingUp = document.getElementById("signUp");
const linkSignUp = document.getElementById("signUpLink");
const linkSignIn = document.getElementById("signInLink");
const btnSignUpFacebook = document.getElementById('signFacebook');
const btnSignUpGoogle = document.getElementById('signGoogle');
const btnSignInFacebook = document.getElementById('signIFacebook');
const btnSignInGoogle = document.getElementById('signIGoogle');
const sendMuro = document.getElementById('send-muro');

//cambiando de clases a los formularios
const replaceClass = (formFirst, formSecond) => {
  formFirst.classList.replace('block', 'none');
  formSecond.classList.replace('none', 'block');
}

//observador de firebase
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    //ESTAMOS LOGUEADOS
    if (user.displayName !== null) {
      window.location.href = 'wall.html'
    }
  } else {
  //NO ESTAMOS LOGUEADOS
  }
});
//funcion para añadir clases de los iconos a usar
const addClassIcon = (inputElement, spanElement) => {
  spanElement.classList.add('fa-times');
  inputElement.classList.add('danger');
} 
//funcion de remplazo de clases a los iconos para cuando es valido lo que escribio en el input
const replaceClassIconValid = (inputElement, spanElement) => {
  inputElement.classList.replace('danger', 'valid')
  spanElement.classList.replace('fa-times', 'fa-check');
}
//funcion de remplazo de clases a los iconos para cuando es incorrecto lo que escribio en el input
const replaceClassIconDanger = (inputElement, spanElement) => {
  inputElement.classList.replace('valid', 'danger');
  spanElement.classList.replace('fa-check', 'fa-times');
}
//Mensajes de Error
const handleError = (error) => {
  switch (error.message) {
    case 'The email address is badly formatted.':
      menssageErrorEmail.innerHTML = 'Email invalido';
      menssageErrorLogin.innerHTML = 'Email invalido';
      break;
    case 'The email address is already in use by another account.':
      replaceClassIconDanger(email,valido);
      menssageErrorEmail.innerHTML = 'Email en uso';
      break;
    case 'The password must be 6 characters long or more.':
      menssageErrorPassword.innerHTML = 'La contraseña debe tener 6 o mas caracteres';
      break;
    case 'Password should be at least 6 characters':
      menssageErrorPassword.innerHTML = 'La contraseña debe tener almenos 6 caracteres';
      break;
    case 'There is no user record corresponding to this identifier. The user may have been deleted.':
      menssageErrorLogin.innerHTML = 'No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.'
    break;
    case 'The password is invalid or the user does not have a password.':
      menssageErrorLogin.innerHTML = 'La contraseña no es válida o el usuario no tiene una contraseña.';
    break;
    default:
      menssageErrorPassword.innerHTML = error.message;
      menssageErrorLogin.innerHTML = error.message;
    break;
  }
}
//Cambiando iconos segun lo que escriba el usuario
email.addEventListener('input', () => {
  const campo = event.target;  
  menssageErrorEmail.innerHTML = '';
  addClassIcon(email,valido);
  validateEmail(campo.value) ? replaceClassIconValid(email,valido) : replaceClassIconDanger(email,valido);
});
password.addEventListener('input', () => {
  const campo = event.target;
  addClassIcon(password,validpwd);
  passwordLength(campo.value) ? replaceClassIconValid(password, validpwd) : replaceClassIconDanger(password, validpwd);
});
repeatPassword.addEventListener('input', () => {
  const campo = event.target;
  menssageErrorPassword.innerHTML = '';
  addClassIcon(repeatPassword, valid);
  passwordLength(campo.value) && passwordRepeatValid(campo.value, password.value) ? replaceClassIconValid(repeatPassword, valid) : replaceClassIconDanger(repeatPassword, valid);
});
//funcion para registrar usuario con email y password
const userRegister = (emailValue,repeatPasswordValue, nameUser) => {
  menssageErrorEmail.innerHTML = '';
  menssageErrorPassword.innerHTML = '';
  registerUser(emailValue,repeatPasswordValue,nameUser, handleError);
}
//Enviando informacion a firebase del nuevo registro
btnEnviar.addEventListener('click', () => {
  const emailValue = email.value;
  const repeatPasswordValue = repeatPassword.value;
  const nameUser = name.value; 
  if (passwordRepeatValid(repeatPasswordValue, password.value) === false) {
    menssageErrorPassword.innerHTML = 'Contraseña no coincide';
    
  } else {
    userRegister(emailValue,repeatPasswordValue, nameUser);
    // replaceClass(formSingUp, formSignIn);
  }
});

//Direccionando al muro
const directionPageMuro = () => {
  window.location.href = "wall.html";
}

//Inicio de sesion
signInBtn.addEventListener('click', () => {
  const emailSing = document.getElementById('email1').value;
  const passwordSing = document.getElementById('pwd1').value;
  loginUser(emailSing,passwordSing,directionPageMuro,handleError);
  
})
//Cambiando de interfaz de Registro a Login
linkSignUp.addEventListener('click', () => {    
  replaceClass(formSingUp, formSignIn);
});
linkSignIn.addEventListener('click', () => {
  replaceClass(formSignIn, formSingUp);
});
//Iniciando sesion con facebook y google
btnSignUpFacebook.addEventListener('click', () => {
  sesionFacebook(directionPageMuro,handleError);
});
btnSignUpGoogle.addEventListener('click', () => {
  sesionGoogle(directionPageMuro,handleError);
});
btnSignInFacebook.addEventListener('click', () => {
  sesionFacebook(directionPageMuro,handleError);
});
btnSignInGoogle.addEventListener('click', () => {
  sesionGoogle(directionPageMuro,handleError);
});

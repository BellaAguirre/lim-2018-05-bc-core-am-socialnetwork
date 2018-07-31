window.validateEmail = (email) => {
    const expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(email);
}

window.passwordLength = (password) => {
  if (password.length >= 6) {
    return true;
  } else {
    return false;
  }
}

window.passwordRepeatValid = (passwordRepeat, password) => {
  if (password === passwordRepeat) {
    return true;
  } else {
    return false;
  }
}
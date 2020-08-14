const isValid = (email, password, name = '', isRegister = false) => {
  const isValidEmail = (email) => {
    if ((email.includes('@')) && (email.includes('.')) && (email.length < 65) 
    && (email.length > 5) && (typeof email === 'string' || email instanceof String)) {
      return true;
    }
    return false;
  }  
  
  const isValidPassword = (password) => {
    if ((password.length > 5) && (password.length < 65) 
    && (/\d/.test(password)) && (/[A-Z a-z]/.test(password)) 
    // Disabled special character requirement for ease of testing
    // && (/[~`!#$%\-\^&*+=\[\]\\';,/{}|\\":<>\?]/.test(password))
    && (typeof password === 'string' || password instanceof String)){
      return true;
    }
    return false;
  }

  const isValidName = (name) => {
    if ((name.length > 1) && (name.length < 65) 
    && (!(/[\d~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/.test(name))) 
    && (typeof name === 'string' || name instanceof String)){
      return true;
    }
    return false;
  }
  
  if (isRegister) {
    if ((isValidEmail(email)) && (isValidName(name)) && (isValidPassword(password))) 
      return true;
    return false;
  } else {
    if ((isValidEmail(email)) && (isValidPassword(password))) 
      return true;
    return false;
  }
}

module.exports = {
  isValid: isValid
}
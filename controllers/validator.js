const isValid = (email, name, password) => {
  const isValidEmail = (email) => {
    if ((email.includes('@')) && (email.includes('.')) && (email.length < 65) 
    && (email.length > 5) && (typeof email === 'string' || email instanceof String)) {
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

  const isValidPassword = (password) => {
    if ((password.length > 5) && (password.length < 64) && (/\d/.test(password)) 
    // Disabling special character requirement for testing purposes
    && (/[~`!#$%\-\^&*+=\[\]\\';,/{}|\\":<>\?]/.test(password))
    && (typeof password === 'string' || password instanceof String)){
      return true;
    }
    return false;
  }

  if ((isValidEmail(email)) && (isValidName(name)) && (isValidPassword(password))) 
    return true;
  return false;
}

module.exports = {
  isValid: isValid
}
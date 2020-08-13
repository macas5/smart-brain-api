const isValid = (email, name, password) => {
  const isValidEmail = (email) => {
    if ((email.includes('@')) && (email.includes('.')) && (email.length < 65) 
    && (email.length > 0) && (typeof email === 'string' || email instanceof String)) {
      return true;
    }
    return false;
  }  

  const isValidName = (name) => {
    if ((name.length > 0) && (name.length < 65) 
    && (!(/[\d~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(name))) 
    && (typeof name === 'string' || name instanceof String)){
      return true;
    }
    return false;
  }

  const isValidPassword = (password) => {
    return true;
  }

  if ((isValidEmail(email)) && (isValidName(name)) && (isValidPassword(password))) 
    return true;
  return false;
}

module.exports = {
  isValid: isValid
}
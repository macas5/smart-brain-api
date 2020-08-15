const handleSignIn = (db, bcrypt, isValid) => (req, res) => {
  const { email, password } = req.body;
  //Disabled login info validator for ease of testing
  if (isValid(email, password)){
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
      .then(data => {
        bcrypt.compare(password, data[0].hash).then((response) => {
          if (response) {
            return (db.select('*').from('users')
              .where('email', '=', email)
              .then (user => {
                res.json(user[0])
              })
              .catch(err => res.status(400).json('Unable to get user'))
              )
          } else {
            res.status(400).json('wrong credentials')
          }
        })
        .catch (err => res.status(400).json('wrong credentials'));
        });
  } else {
    res.status(400).json('One of the parameters is incorrect');
  }
}

module.exports = {
  handleSignIn: handleSignIn
}
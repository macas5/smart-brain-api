const handleSignIn = (db, bcrypt, isValid, jwt) => (req, res) => {
  const { email, password } = req.body;
  if (isValid(email, password)){
    db.select('email', 'hash').from('login')
    .where('email', '=', email.toLowerCase())
    .then(data => {
      bcrypt.compare(password, data[0].hash).then((response) => {
        if (response) {
          return (db.select('*').from('users')
            .where('email', '=', email.toLowerCase())
            .then (user => {
              const accessToken = jwt.sign(user[0], process.env.ACCESS_TOKEN_SECRET, 
              {expiresIn: '3h'});
              res.json({accessToken: accessToken});
            })
            .catch(err => res.status(400).json('Unable to get user'))
            )
        } else {
          res.status(409).json('wrong credentials')
        }
      })
      .catch (err => res.status(409).json('wrong credentials'));
      });
  } else {
    res.status(409).json('One of the parameters is incorrect');
  }
}

module.exports = {
  handleSignIn: handleSignIn
}
const handleRegister = (db, bcrypt, isValid) => (req, res) => {
  const {email, name, password} = req.body;
  if (isValid(email, password, name, true)) {
    bcrypt.genSaltSync(10, (err, salt) => {
      bcrypt.hashSync(password, salt, (err, hash) => {
        db.transaction(trx =>  {
          trx.insert ({
            hash: hash,
            email: email
          })
          .into('login')
          .returning('email')
          .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert ({
              email: loginEmail[0],
              name: name,
              joined: new Date()
            }).then(user => {
              res.json(user[0]);
            })
          })
          .then(trx.commit)
          .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'));
      });
    });
  } else {
    res.status(400).json('One of the parameters is incorrect');
  }
}

module.exports ={
  handleRegister: handleRegister
}
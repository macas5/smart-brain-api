const handleProfileGet = (db) => (req, res) => {
  const { id } = req.params;
  console.log(req.user);
  if (!isNaN(id) && (id > 0)){
    db.select('*').from('users').where({id}).then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json('No such user');
      };
    });
  } else {
    res.status(409).json('Wrong paramaeter passed');
  }
}

module.exports = {
  handleProfileGet: handleProfileGet,
}
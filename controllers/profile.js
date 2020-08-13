const handleProfileGet = (db) => (req, res) => {
  const { id } = req.params;
  if (!isNaN(id) && (id > 0)){
    db.select('*').from('users').where({id}).then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('No such user');
      };
    });
  } else {
    res.status(400).json('Wrong paramaeter passed');
  }
}

module.exports = {
  handleProfileGet
}
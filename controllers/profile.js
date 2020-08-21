const handleProfileGet = (db) => (req, res) => {
  const { id } = req.params;
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

const updateProfile = (db) => (req, res) => {
  db.select('entries').from('users').where('id', '=', req.user.id)
  .then(data => {
    Object.assign(req.user, {entries: data[0].entries});
    res.json(req.user)
  })
  .catch(err => res.status(404).json('Entries not found'));
}

module.exports = {
  handleProfileGet,
  updateProfile
}
const getRankings = (db) => (req, res) => {
  db.select('id', 'name', 'entries').from('users').orderBy('entries', 'DESC')
  .then(users => {
    res.json(users);
  })
  .catch(err => {res.json('error')})
}

module.exports = {
  getRankings
}
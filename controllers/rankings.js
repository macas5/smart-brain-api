const getRankings = (db) => (req, res) => {
  db.select('name', 'entries').from('users').orderBy('entries', 'DESC').limit(10)
  .then(users => {
    res.json(users);
  })
  .catch(err => {res.json('error')})
}

module.exports = {
  getRankings
}
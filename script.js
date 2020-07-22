console.log('a webo', PouchDB);
const db = PouchDB('http://142.93.50.47:5984/user_110226829767702988118');

db.changes({
  since: 'now',
  live: true,
  include_docs: true,
})
.on('change', function (change) {
  console.log('el change =====>', change);
});

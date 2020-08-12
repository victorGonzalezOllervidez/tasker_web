import nano from '../../lib/couch';

export default async (req, res) => {
  if (req.cookies.user_id) {
    const db = nano.use(`user_${req.cookies.user_id}`)
    db.find({
      selector: {
        parent_id: 'home'
      }
    }).then((result) => {
      res.statusCode = 200
      res.json(result)
    })
  }
}

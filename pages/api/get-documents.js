import nano from '../../lib/couch';

export default async (req, res) => {
  if (req.cookies.user_id) {
    const db = nano.use(`user_${req.cookies.user_id}`)
    db.find({
      selector: {
        parent_id: req.query.id,
      }
    }).then((result) => {
      res.status(200).send(result);
    })
  }
}

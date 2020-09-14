import nano from '../../lib/couch';

export default async (req, res) => {
  if (req.cookies.user_id) {
    const db = nano.use(`user_${req.cookies.user_id}`)
    let currentId = req.query.id;


    let home = false;
    let breadcumbs = [];
    while (!home) {
      let view = await db.view('parents', 'get-parents', {
        'key': currentId,
        'include_docs': true,
      });
      if (view.rows.length) {
        let doc = view.rows[0];
        breadcumbs = breadcumbs.concat({name: doc.value.current_doc, id: doc.id});
        if (doc.doc && doc.doc.parent_id !== 'home') {
          breadcumbs = breadcumbs.concat({name: doc.doc.name, id: doc.doc._id});
          currentId = doc.doc.parent_id
        } else {
          home = true;
        }
      } else {
        home = true;
      }
    }
    breadcumbs.push({name: 'home', id: 'home'});
    return res.json({breadcumbs: breadcumbs.reverse()});
  }
}

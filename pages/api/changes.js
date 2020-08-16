import nano from '../../lib/couch';
import Server from 'socket.io';

const ioHandler = (req, res) => {
  const db = nano.use(`user_${req.cookies.user_id}`);
  const feed = db.follow({ since: 'now', include_docs: true });
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server(res.socket.server);

    io.on('connection', socket => {
      feed.on('change', (change) => {
        console.log('change ====>', change);
        socket.emit('change', change)
      });
      feed.follow();
    });

    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default ioHandler;

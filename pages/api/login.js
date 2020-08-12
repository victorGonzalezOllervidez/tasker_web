import { OAuth2Client } from 'google-auth-library';
import { setTokenCookie } from '../../lib/cookie';
import nano from '../../lib/couch';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const idToken = req.headers.authorization.replace('Barer ', '');
  const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
  const ticket = await client.verifyIdToken({
      idToken,
      audience: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}.apps.googleusercontent.com`,
  });
  const payload = ticket.getPayload();

  if (payload) {
    const user = `user_${payload['sub']}`;
    const dbExists = await nano.db.get(user)
    .then((body) => body)
    .catch((err) => err);
    if (dbExists.statusCode && dbExists.statusCode === 404) {
      nano.db.create(user).then((body) => {
        console.log('database alice created!', body);
      })
    }
    setTokenCookie(res, idToken, payload['sub']);
  }

  res.end()
}

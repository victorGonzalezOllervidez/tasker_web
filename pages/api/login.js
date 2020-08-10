import { OAuth2Client } from 'google-auth-library';
import { setTokenCookie } from '../../lib/cookie';

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
    const userid = payload['sub'];
    setTokenCookie(res, idToken)
  }

  res.end()
}

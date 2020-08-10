import { destroyCookies } from '../../lib/cookie';

export default (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  destroyCookies(res, req.cookies);
}

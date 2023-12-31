import 'axios';
import {
  OAUTH2_CLIENT_ID,
  OAUTH2_SCOPES,
  DISCORD_API_BASE_URL,
  OAUTH2_CLIENT_SECRET,
} from '../data';
import axios from 'axios';

export function generateDiscordOauthUrl(baseUrl: string) {
  const url = new URL('https://discord.com/api/oauth2/authorize');

  url.searchParams.append('client_id', OAUTH2_CLIENT_ID);
  url.searchParams.append('redirect_uri', `${baseUrl}/auth/callback`);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('scope', OAUTH2_SCOPES);

  return url.href;
}

export async function exchangeDiscordCode(baseUrl: string, code: string) {
  try {
    const res = await axios.post(
      `${DISCORD_API_BASE_URL}/oauth2/token`,
      {
        client_id: OAUTH2_CLIENT_ID,
        client_secret: OAUTH2_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${baseUrl}/auth/callback`,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (res.status != 200) {
      return null;
    } else {
      return res.data;
    }
  } catch {
    return null;
  }
}

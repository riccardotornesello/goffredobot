import axios from 'axios';
import Cookies from 'cookies';
import { DISCORD_API_BASE_URL } from '../../data/constants';
import SoundsTable from '../../components/sounds-table';
import { getUserSounds } from 'apps/goffredo-bot-platform/database/sounds';
import { initDb } from 'apps/goffredo-bot-platform/database/init';

export async function getServerSideProps({ req, res, query }) {
  const cookies = new Cookies(req, res);
  const authToken = cookies.get('auth');

  if (!authToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(`${DISCORD_API_BASE_URL}/users/@me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const sounds = await getUserSounds(res.data.id);

    return { props: { user: res.data, sounds: sounds } };
  } catch (e) {
    cookies.set('auth');
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default function DashboardPage({ user, sounds }) {
  console.log(user);

  return (
    <div>
      <p>Username: {user.username}</p>
      <p>User id: {user.id}</p>
      <SoundsTable sounds={sounds} />
    </div>
  );
}

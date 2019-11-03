import axios from 'axios';
import appConfig from '../config/appConfig';

const { BACKEND_PATH } = appConfig;

export default (setAccounts, setLoading, setError) => {
  const { data: { email, token } } = JSON.parse(localStorage.getItem('Banka'));
  axios.get(`${BACKEND_PATH}/user/${email}/accounts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setAccounts(res.data.accounts);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError(true);
    });
};

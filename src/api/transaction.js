import axios from 'axios';
import appConfig from '../config/appConfig';

const { BACKEND_PATH } = appConfig;

export default (setTransaction, setLoading, setError) => {
  const { data: { id, token } } = JSON.parse(localStorage.getItem('Banka'));
  axios.get(`${BACKEND_PATH}/user/${id}/transactions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setTransaction(res.data.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError(true);
    });
};

export const getAccountTransactions = (setTransaction, setLoading, accountNumber, setError) => {
  const { data: { token } } = JSON.parse(localStorage.getItem('Banka'));
  axios.get(`${BACKEND_PATH}/accounts/${accountNumber}/transactions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setTransaction(res.data.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError(true);
    });
};

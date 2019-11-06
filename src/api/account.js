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

export const createAccount = (setLoading, values, setAjaxError, history, setGenAccount) => {
  const { data: { token } } = JSON.parse(localStorage.getItem('Banka'));
  const data = {
    accountname: values.accountName,
    type: values.type,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  axios.post(`${BACKEND_PATH}/accounts`, data, {
    headers,
  })
    .then((res) => {
      const { accountnumber } = res.data.data;
      setLoading(false);
      history.push(`/account?acctNo=${accountnumber}`);
      setGenAccount(res.data.data);
    }).catch(() => {
      setAjaxError(true);
      setLoading(false);
    });
};

export const getAccount = (setLoading, setAccount, setError, accountNumber) => {
  const { data: { token } } = JSON.parse(localStorage.getItem('Banka'));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  axios.get(`${BACKEND_PATH}/accounts/${accountNumber}`, {
    headers,
  })
    .then((res) => {
      setAccount(res.data.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError(true);
    });
};

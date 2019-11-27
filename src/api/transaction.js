import axios from 'axios';
import appConfig from '../config/appConfig';

const { BACKEND_PATH } = appConfig;

export default (setTransaction, setLoading, accountNumber, setError,
  search, lts, order, type, setMore, setNext) => {
  const { data: { id, token } } = JSON.parse(localStorage.getItem('Banka'));
  const startPoint = lts ? `&lts=${lts}` : '';
  const searchQuery = search ? `&search=${search}` : '';
  const acctType = type ? `&type=${type}` : '';
  if (!accountNumber) {
    axios.get(`${BACKEND_PATH}/user/${id}/transactions?limit=8${startPoint}${searchQuery}&order=${order}${acctType}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const nextTransactions = res.data.data.slice(1);
        const more = Number(res.data.currentCount) < res.data.total;
        if (lts) {
          setMore(more);
          setTransaction((prev) => {
            const temp = prev;
            return [...temp, ...nextTransactions];
          });
          setNext(res.data.next);
        } else {
          setMore(more);
          setTransaction(res.data.data);
          setNext(res.data.next);
        }
        setLoading(false);
      }).catch(() => {
        setLoading(false);
        if (setError) {
          setError(true);
        }
      });
  } else {
    axios.get(`${BACKEND_PATH}/accounts/${accountNumber}/transactions?limit=8${startPoint}${searchQuery}&order=${order}${acctType}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const more = Number(res.data.currentCount) < res.data.total;
        setNext(res.data.next);
        setMore(more);
        const nextTransactions = res.data.data.slice(1);
        if (lts) {
          setTransaction((prev) => {
            const temp = prev;
            return [...temp, ...nextTransactions];
          });
        } else {
          setTransaction(res.data.data);
        }
        setLoading(false);
      }).catch(() => {
        setLoading(false);
        setError(true);
      });
  }
};

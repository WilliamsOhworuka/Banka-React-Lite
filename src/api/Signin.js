import axios from 'axios';
import appConfig from '../config/appConfig';

const { BACKEND_PATH } = appConfig;

export default (setError, formData, setResourceLoading, history, setUser) => {
  axios.post(`${BACKEND_PATH}/auth/signin`, {
    email: formData[0].value,
    password: formData[1].value,
  })
    .then((res) => {
      setResourceLoading(false);
      setUser(res.data);
      history.push('/dashboard');
    })
    .catch((err) => {
      const message = err.response.data.error;
      setError(message);
      setResourceLoading(false);
    });
};

import axios from 'axios';
import appConfig from '../config/appConfig';

const { BACKEND_PATH } = appConfig;

export default (setFormData, formData, setResourceLoading, history, setUser) => {
  axios.post(`${BACKEND_PATH}/auth/signup`, {
    firstName: formData[0].value,
    lastName: formData[1].value,
    email: formData[2].value,
    password: formData[3].value,
    confirmPassword: formData[3].value,
  })
    .then((res) => {
      setResourceLoading(false);
      setUser(res.data.user);
      localStorage.setItem('Banka', JSON.stringify(res.data.user));
      history.push('/dashboard');
    })
    .catch((err) => {
      const message = err.response.data.error;
      setFormData((prevFormdata) => {
        const tempFormData = [...prevFormdata];
        tempFormData[2].errorMessage = message;
        return tempFormData;
      });
      setResourceLoading(false);
    });
};

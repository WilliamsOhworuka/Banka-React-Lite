import axios from 'axios';
import appConfig from '../config/appConfig';

const { BACKEND_PATH } = appConfig;

export default (setError, formData, setLoading, setUser) => {
  const { data: { token, id } } = JSON.parse(localStorage.getItem('Banka'));
  const data = {
    firstname: formData.firstname,
    lastname: formData.lastname,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  axios.patch(`${BACKEND_PATH}/user/edit-name/${id}`, data, {
    headers,
  })
    .then((res) => {
      const { data: { data: { firstName, lastName } } } = res;
      setLoading(false);
      setUser((prev) => {
        const temp = { ...prev, data: { ...prev.data, firstName, lastName } };
        return temp;
      });
    })
    .catch((err) => {
      const message = err.response.data.error;
      setError(message);
      setLoading(false);
    });
};

export const updateEmail = (setError, formData, setLoad, setUser, handleClose, setControls) => {
  const { data: { token, id } } = JSON.parse(localStorage.getItem('Banka'));
  const data = {
    email: formData.email,
    password: formData.password,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  axios.patch(`${BACKEND_PATH}/user/edit-email/${id}`, data, {
    headers,
  })
    .then((res) => {
      const { data: { data: { email } } } = res;
      setLoad(false);
      setUser((prev) => {
        const temp = { ...prev, data: { ...prev.data, email } };
        return temp;
      });
      setControls((prev) => ({ ...prev, email: false }));
      handleClose();
    })
    .catch((err) => {
      const message = err.response.data.error;
      setError(message);
      setLoad(false);
    });
};

export const updatePassword = (setError, formData, setLoad, setSuccess) => {
  const { data: { token, id } } = JSON.parse(localStorage.getItem('Banka'));
  const data = {
    oldPassword: formData.CurrentPassword,
    newPassword: formData.NewPassword,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  axios.patch(`${BACKEND_PATH}/user/edit-password/${id}`, data, {
    headers,
  })
    .then(() => {
      setLoad(false);
      setSuccess(true);
    })
    .catch((err) => {
      const message = err.response.data.error;
      setError(message);
      setLoad(false);
    });
};

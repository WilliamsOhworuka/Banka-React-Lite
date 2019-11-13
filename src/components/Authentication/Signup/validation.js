import validator from 'validator';

const validation = (field, value, setFormData) => {
  switch (field) {
    case 'Password':
      if (validator.isEmpty(value)) {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[3].errorMessage = 'password cannot be empty';
          return tempFormData;
        });
      } else if (!validator.isAlphanumeric(value)) {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[3].errorMessage = 'Password must be 6 characters long and contain only alphanumeric characters ';
          return tempFormData;
        });
      } else if (!validator.isByteLength(value, { min: 6 })) {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[3].errorMessage = 'Password must be 6 characters long and contain only alphanumeric characters ';
          return tempFormData;
        });
      } else {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[3].errorMessage = '';
          return tempFormData;
        });
      }
      break;
    case 'Email':
      if (validator.isEmpty(value)) {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[2].errorMessage = 'Email cannot be empty';
          return tempFormData;
        });
      } else if (!validator.isEmail(value)) {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[2].errorMessage = 'Email is invalid';
          return tempFormData;
        });
      } else {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[2].errorMessage = '';
          return tempFormData;
        });
      }
      break;
    case 'First name':
      if (validator.isEmpty(value)) {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[0].errorMessage = 'Firstname cannot be empty';
          return tempFormData;
        });
      } else if (!validator.isAlpha(value)) {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[0].errorMessage = 'Firstname must contain only alphabets';
          return tempFormData;
        });
      } else {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[0].errorMessage = '';
          return tempFormData;
        });
      }
      break;
    default:
      if (validator.isEmpty(value)) {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[1].errorMessage = `${field} cannot be empty`;
          return tempFormData;
        });
      } else if (!validator.isAlpha(value)) {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[1].errorMessage = `${field} must contain only alphabets`;
          return tempFormData;
        });
      } else {
        setFormData((prevFormdata) => {
          const tempFormData = [...prevFormdata];
          tempFormData[1].errorMessage = '';
          return tempFormData;
        });
      }
  }
};

export default validation;

export default (value, setError) => {
  const regex1 = /^([a-zA-Z]+\s)*([a-zA-Z]+)$/g;
  const valid = regex1.test(value);
  if (!value) {
    setError('This field is required');
  } else if (!valid) {
    setError('This name should only contain letters and one white space inbetween letters');
  } else {
    setError(null);
  }
};

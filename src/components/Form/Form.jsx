import React from 'react';
import Styles from './Form.module.scss';

const required = <sup className={Styles.required} title="Required">*</sup>;

const Form = ({
  elem,
  authentication,
  className,
  buttonText,
  title,
  handleClick,
  resourceLoading,
  onChange,
  toggle,
  see,
  error,
}) => (
  <form className={className} onSubmit={handleClick}>
    <p>{title}</p>
    {error ? <p className={Styles.error}>{error}</p> : null}
    {elem.map((item, index) => (
      <div className={Styles.inputBox}>
        {item.type === 'password' && item.value ? <i className={see ? `far fa-eye-slash ${Styles.see}` : `far fa-eye ${Styles.see}`} role="presentation" onClick={toggle} /> : null}
        <label htmlFor={index}>
          {item.placeholder}
          {' '}
          {authentication ? required : null}
        </label>
        <input
          type={item.type === 'password' && see ? 'text' : item.type}
          onChange={(e) => onChange(e, index)}
          placeholder={item.placeholder}
          className={item.className}
          id={index}
          required
        />
        <span key={`#${index + 2}`}>{item.errorMessage}</span>
      </div>
    ))}
    <button type="submit" disabled={resourceLoading}>
      {resourceLoading
        ? <i className="fa fa-spinner fa-spin loader" />
        : buttonText}
    </button>
  </form>
);

export default Form;

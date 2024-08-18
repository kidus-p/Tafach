
import FormComponent from './FormComponent';

const Popout = ({
  isLoginForm,
  handleLogin,
  handleSignup,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  toggleForm,
  message,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  return (
    <FormComponent
      isLoginForm={isLoginForm}
      handleSubmit={handleSubmit}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      toggleForm={toggleForm}
      message={message}
    />
  );
};

export default Popout;

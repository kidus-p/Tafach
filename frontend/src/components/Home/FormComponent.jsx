import { useCallback } from 'react';
// f9f7f2
// ffc0cb

const FormComponent = ({
  isLoginForm,
  handleSubmit,
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
  const handleNameChange = useCallback((e) => setName(e.target.value), [setName]);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), [setEmail]);
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), [setPassword]);
  const handleConfirmPasswordChange = useCallback((e) => setConfirmPassword(e.target.value), [setConfirmPassword]);

  return (
    <form onSubmit={handleSubmit} className="bg-[#f9f7f2] p-8 rounded-lg mx-auto borde">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {isLoginForm ? 'Welcome Back!' : 'Join Us!'}
      </h2>

      {!isLoginForm && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
            placeholder="Enter your name"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          required
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          required
          placeholder="Enter your password"
        />
      </div>

      {!isLoginForm && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            required
            placeholder="Confirm your password"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
      >
        {isLoginForm ? 'Login' : 'Register'}
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={toggleForm}
          className="text-blue-500 hover:underline focus:outline-none"
        >
          {isLoginForm ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
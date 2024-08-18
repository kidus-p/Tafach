

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
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLoginForm && (
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
      )}
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      {!isLoginForm && (
        <div>
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {isLoginForm ? 'Login' : 'Register'}
      </button>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={toggleForm}
          className="text-blue-500 hover:underline"
        >
          {isLoginForm ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </div>
    </form>
  );
};

export default FormComponent;

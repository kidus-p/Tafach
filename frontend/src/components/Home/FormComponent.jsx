import { useId } from 'react'; // React 18+ API

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
  message
}) => {
  const id = useId(); 

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 shadow-lg rounded-lg max-w-lg mx-auto border border-green-200"
      style={{
        backgroundImage: 'url("/images/form-bg.jpg")', // Use an appropriate background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
        {isLoginForm ? "Welcome Back!" : "Join Our Recipe Community"}
      </h2>

      {/* Name field only shown for Signup */}
      {!isLoginForm && (
        <div>
          <label htmlFor={`${id}-name`} className="block text-sm font-medium text-gray-800 mb-2">
            Full Name
          </label>
          <input
            id={`${id}-name`} // Unique id
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition duration-300 ease-in-out bg-white bg-opacity-80"
            autoComplete="name"
            required
            placeholder="Enter your name"
          />
        </div>
      )}

      <div>
        <label htmlFor={`${id}-email`} className="block text-sm font-medium text-gray-800 mb-2">
          Email Address
        </label>
        <input
          id={`${id}-email`} // Unique id
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition duration-300 ease-in-out bg-white bg-opacity-80"
          autoComplete="email"
          required
          placeholder="Your email address"
        />
      </div>

      <div>
        <label htmlFor={`${id}-password`} className="block text-sm font-medium text-gray-800 mb-2">
          Password
        </label>
        <input
          id={`${id}-password`} 
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition duration-300 ease-in-out bg-white bg-opacity-80"
          autoComplete="current-password"
          required
          placeholder="Create a password"
        />
      </div>

      {!isLoginForm && (
        <div>
          <label htmlFor={`${id}-confirmPassword`} className="block text-sm font-medium text-gray-800 mb-2">
            Confirm Password
          </label>
          <input
            id={`${id}-confirmPassword`} // Unique id
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition duration-300 ease-in-out bg-white bg-opacity-80"
            autoComplete="new-password"
            required
            placeholder="Confirm your password"
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          {isLoginForm ? "Log In" : "Sign Up"}
        </button>
        <button
          type="button"
          onClick={toggleForm}
          className="text-green-600 hover:underline transition duration-300"
        >
          {isLoginForm ? "New here? Sign Up" : "Already have an account? Log In"}
        </button>
      </div>
    </form>
  );
};

export default FormComponent;

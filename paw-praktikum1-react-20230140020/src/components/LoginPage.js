import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // Switched from React.useState to the imported useState for standard practice
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: email,
        password: password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      navigate('/dashboard');

    } catch (err) {
      // Use optional chaining (?) for safer access to err.response
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-sm transform transition duration-500 hover:shadow-3xl">
        <h2 className="text-4xl font-extrabold text-center mb-2 text-indigo-700">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign in to access your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input Group */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Password Input Group */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-[1.01]"
          >
            Sign In
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
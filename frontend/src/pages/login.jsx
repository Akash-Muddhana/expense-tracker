import { useEffect, useState } from 'react'
import { newUser } from '../../services/authService'
import axios from 'axios'

export function Login({ isLoggedIn, setIsLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/auth/auth-check', { withCredentials: true })
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
  }, [setIsLoggedIn])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await newUser(email, password)
      setIsLoggedIn(true)
    } catch (err) {
      console.error('error while adding user', err)
      setError('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">You are already logged in.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login to your account</h2>

        <form onSubmit={handleSubmit} className="space-y-5" aria-label="login-form">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-primary-50 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-primary-50 transition-all"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <a href="#" className="text-sm text-gray-500 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
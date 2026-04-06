import { useState } from "react";
import { newUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const API = import.meta.env.VITE_API_URL || "";
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    const errs = [];
    if (!firstName.trim()) errs.push("First name is required.");
    if (!email.trim()) errs.push("Email is required.");
    if (password.length < 4)
      errs.push("Password must be at least 6 characters.");
    if (password !== confirmPassword) errs.push("Passwords do not match.");

    if (errs.length) {
      setErrors(errs);
      return;
    }

    try {
      setSubmitting(true);

      await newUser(firstName, secondName, email, password);

      navigate("/login");
      setFirstName("");
      setSecondName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setErrors([err.message || "Signup failed"]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-20 bg-gradient-to-br from-sky-50 to-rose-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 space-y-4 border border-gray-100"
        aria-label="signup-form"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Start tracking your expenses in seconds
          </p>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-3">
            <ul className="list-disc list-inside text-sm">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-3 text-center">
            Account created successfully.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pl-12 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Second name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Enter last name (optional)"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                className="w-full pl-12 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-rose-50 text-rose-600 rounded-full">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-amber-50 text-amber-600 rounded-full">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11V7a4 4 0 10-8 0v4m12 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6h14z"
                  />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-amber-50 text-amber-600 rounded-full">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11V7a4 4 0 10-8 0v4m12 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6h14z"
                  />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md shadow hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 flex items-center justify-center gap-2"
            disabled={submitting}
          >
            {submitting ? (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            <span>{submitting ? "Creating..." : "Create account"}</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a className="text-blue-600 hover:underline" href="/login">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

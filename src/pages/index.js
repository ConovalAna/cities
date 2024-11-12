import { useAuth } from "@/hooks/auth";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, signup, user, signout } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signin(email, password);
      if (!result) {
        alert("Wrong credentials. Please try again.");
        return;
      }
    } catch (error) {
      debugger;
      console.error("Login error:", error);
      alert("Wrong credentials");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      if (!result) {
        alert("Something went wrong");
        return;
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {user ? (
          <div className="text-center">
            <p className="text-lg font-semibold mb-4">Welcome, {user.email}</p>
            <button
              onClick={signout}
              type="button"
              className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 mb-6">
              Please Sign In or Sign Up
            </p>
            <div className="space-y-8">
              {/* Sign In Form */}
              <div>
                <p className="text-xl font-semibold mb-4">Sign In</p>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Sign In
                  </button>
                </form>
              </div>
              <button
                type="submit"
                onClick={handleSignup}
                className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

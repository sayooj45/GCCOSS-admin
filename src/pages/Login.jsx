import { ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    console.log(email, password);

    try {
      const res = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      // console.log(res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/partners");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d9488] to-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#0d9488]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            {/* <ShieldCheck className="w-10 h-10 text-[#0d9488]" /> */}
            <img src="./logo.png" alt="logo" className=" h-15" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
            Admin Panel
          </h1>

          <p className="text-gray-500 mt-3 text-sm sm:text-base">
            Secure login for administrators
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form className="space-y-5" onSubmit={onSubmitHandle}>
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
              Admin Email
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 focus-within:border-[#0d9488] focus-within:ring-2 focus-within:ring-[#0d9488]/20 transition">
              <Mail className="w-5 h-5 text-[#0d9488]" />

              <input
                type="email"
                placeholder="Enter admin email"
                className="w-full ml-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
              Password
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 focus-within:border-[#0d9488] focus-within:ring-2 focus-within:ring-[#0d9488]/20 transition">
              <Lock className="w-5 h-5 text-[#0d9488]" />

              <input
                type="password"
                placeholder="Enter password"
                className="w-full ml-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0d9488] hover:bg-[#0b7f75] disabled:opacity-70 text-white font-semibold py-3.5 rounded-2xl transition duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              "Secure Login"
            )}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Authorized administrators only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

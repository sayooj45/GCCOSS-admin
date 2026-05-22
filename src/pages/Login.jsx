import { ShieldCheck, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const onSubmitHandle = (e) => {
    e.preventDefault();
    navigate("/partners");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d9488] to-[#0f172a] flex items-center justify-center px-4">
      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#0d9488]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="w-10 h-10 text-[#0d9488]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
            Admin Panel
          </h1>

          <p className="text-gray-500 mt-3 text-sm sm:text-base">
            Secure login for administrators
          </p>
        </div>

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
              />
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" className="accent-[#0d9488] w-4 h-4" />
              Remember me
            </label>

            <button type="button" className="text-[#0d9488] hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#0d9488] hover:bg-[#0b7f75] text-white font-semibold py-3.5 rounded-2xl transition duration-300 shadow-lg"
          >
            Secure Login
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

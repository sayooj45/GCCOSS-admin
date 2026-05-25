import { Bell, UserCircle2, Menu, LogOut, ChevronDown, X } from "lucide-react";

export default function Navbar({ setSidebarOpen, sidebarOpen }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-[#0d9488]/10 px-4 sm:px-6 lg:px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          {/* MOBILE MENU */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-[#0d9488]/10 transition"
          >
            <Menu className="text-[#0d9488]" size={24} />
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="./logo.png"
              alt="logo"
              className="h-11 w-auto object-contain"
            />

            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-[#0d9488] leading-none">
                Admin Panel
              </h1>

              <p className="text-xs text-gray-500 mt-1">Management Dashboard</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* NOTIFICATION */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">
            <Bell className="text-gray-600" size={22} />

            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* ADMIN PROFILE */}
          <div className="hidden md:flex items-center gap-3 bg-[#0d9488]/5 hover:bg-[#0d9488]/10 px-3 py-2 rounded-2xl transition cursor-pointer">
            <div className="bg-[#0d9488]/10 p-2 rounded-full">
              <UserCircle2 className="text-[#0d9488] w-6 h-6" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-800 leading-none">
                Admin
              </h2>

              <p className="text-xs text-gray-500 mt-1">Super Admin</p>
            </div>

            <ChevronDown size={18} className="text-gray-500" />
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 bg-[#0d9488] hover:bg-[#0b7f75] text-white px-4 sm:px-5 py-2.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <LogOut size={18} className="group-hover:rotate-12 transition" />

            <span className="hidden sm:block font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

import {
  Mail,
  Handshake,
  CalendarDays,
  Newspaper,
  Settings,
  Bell,
  ShieldCheck,
  ChevronRight,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Partners",
    icon: Handshake,
    path: "/partners",
  },
  {
    name: "Enquiries",
    icon: Mail,
    path: "/contact-submissions",
  },
  {
    name: "Events",
    icon: CalendarDays,
    path: "/events",
  },
  {
    name: "Publications",
    icon: Newspaper,
    path: "/publications",
  },
  {
    name: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <aside
      className={`
    fixed lg:static top-0 left-0 z-50
    flex flex-col w-[300px] min-h-screen
    bg-gradient-to-b from-[#0d9488] via-[#0b7f75] to-[#0f172a]
    text-white overflow-hidden
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
    >
      {" "}
      {/* BACKGROUND EFFECT */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      {/* TOP LOGO SECTION */}
      <div className="relative z-10 px-6 py-6 border-b border-white/10">
        <div className="flex items-start justify-between gap-4">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            {/* LOGO ICON */}
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg shrink-0">
              <ShieldCheck size={30} className="text-white" />
            </div>

            {/* TEXT */}
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-white leading-tight">
                Admin Panel
              </h1>

              <p className="text-sm text-white/70 mt-1">Management Dashboard</p>
            </div>
          </div>

          {/* MOBILE CLOSE BUTTON */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="
        lg:hidden
        w-10 h-10
        flex items-center justify-center
        rounded-xl
        bg-white/10
        hover:bg-white/20
        border border-white/10
        backdrop-blur-md
        transition-all duration-300
        shrink-0
      "
          >
            <X size={20} className="text-white" />
          </button>
        </div>
      </div>
      {/* NAVIGATION */}
      <div className="relative z-10 flex-1 px-5 py-8">
        <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-5 px-4">
          Main Menu
        </p>

        <nav className="space-y-2">
          {menus.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-white text-[#0d9488] shadow-xl"
                    : "hover:bg-white/10 text-white/90"
                }`
              }
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl transition-all duration-300`}>
                  <menu.icon size={21} />
                </div>

                <span className="font-medium text-[15px]">{menu.name}</span>
              </div>

              {/* RIGHT ICON */}
              <ChevronRight
                size={18}
                className="opacity-0 group-hover:opacity-100 transition duration-300"
              />
            </NavLink>
          ))}
        </nav>
      </div>
      {/* BOTTOM PROFILE CARD */}
      {/* <div className="relative z-10 p-5">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-4 flex items-center gap-4 shadow-xl">
          
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold">
            A
          </div>

          INFO
          <div className="flex-1">
            <h3 className="font-semibold text-white">Admin</h3>

            <p className="text-sm text-white/60 mt-1">Super Administrator</p>
          </div>

        
          <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_12px_#4ade80]"></div>
        </div>
      </div> */}
    </aside>
  );
}

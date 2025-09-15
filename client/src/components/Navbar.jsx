import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const linkBase =
    "block px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50";
  const linkActive = "text-indigo-600";
  const linkInactive = "text-gray-700";

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div
          onClick={() => navigate("/home")}
          className="cursor-pointer select-none text-xl font-extrabold tracking-tight"
        >
          🌱 SkillGrow
        </div>

        {/* desktop menu */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/mood"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            MoodQuest
          </NavLink>
          <NavLink
            to="/pomodoro"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Pomodoro
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Reports
          </NavLink>
          <NavLink
            to="/streaks"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Streaks
          </NavLink>

          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* hamburger */}
        <button
          onClick={() => setOpen((s) => !s)}
          className="md:hidden p-2 rounded hover:bg-gray-100"
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
            <NavLink
              to="/home"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/mood"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Mood Tracker
            </NavLink>
            <NavLink
              to="/pomodoro"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Pomodoro
            </NavLink>
            <NavLink
              to="/reports"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Reports
            </NavLink>
            <NavLink
              to="/streaks"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Streaks
            </NavLink>

            <button
              onClick={handleLogout}
              className="w-full mt-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

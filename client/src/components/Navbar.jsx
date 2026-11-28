import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, LogOut, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const linkCls = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium transition ${isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"}`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-fuchsia-600 text-white">
              <Search className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold text-slate-900">
              Re<span className="text-indigo-600">Connect</span>
            </span>
          </Link>
          {user && (
            <div className="hidden items-center md:flex">
              <NavLink to="/items" className={linkCls}>Browse</NavLink>
              <NavLink to="/my-items" className={linkCls}>My reports</NavLink>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/report/lost"
                className="flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" /> Report
              </Link>
              <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 sm:flex">
                {user.name?.[0]?.toUpperCase()}
              </span>
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
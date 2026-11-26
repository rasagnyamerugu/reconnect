import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Field({ icon: Icon, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        type={isPassword && show ? "text" : type}
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label="Show or hide password"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
}
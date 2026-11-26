import { Bell, ShieldCheck, Sparkles } from "lucide-react";

const points = [
  { icon: Sparkles, text: "Smart matching finds your item automatically" },
  { icon: Bell, text: "Instant alerts the moment a match appears" },
  { icon: ShieldCheck, text: "Verified claims keep items safe" },
];

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="absolute -left-20 -top-20 h-80 w-80 animate-blob rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-96 w-96 animate-blob rounded-full bg-pink-400/20 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Lost it? Found it?
            <br />
            Let us reconnect.
          </h2>
          <p className="mt-4 max-w-md text-indigo-100">
            One platform for your college, office or city to report lost items and return found ones.
          </p>
          <ul className="mt-10 space-y-5">
            {points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-indigo-50">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
          <p className="mt-2 text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-slate-600">{footer}</div>
        </div>
      </div>
    </div>
  );
}
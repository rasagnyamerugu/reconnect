import LostFoundSign from "../components/LostFoundSign";
import { Link } from "react-router-dom";
import {
  PackageSearch, PackageCheck, Zap, ShieldCheck, MessageCircle,
  Bell, Users, ArrowRight, Sparkles, Search,
  Smartphone, Wallet, KeyRound, Laptop, Backpack, BookOpen, CreditCard,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
const steps = [
  { icon: PackageSearch, title: "Report", text: "Post a lost or found item with a photo, place and date." },
  { icon: Sparkles, title: "Match", text: "Our engine scores every report against the others." },
  { icon: PackageCheck, title: "Reunite", text: "Verify ownership, chat privately and hand it over." },
];

const features = [
  { icon: Zap, title: "Smart matching", text: "Category, text, colour, place and time combine into one match score.", color: "bg-amber-100 text-amber-600" },
  { icon: Bell, title: "Real-time alerts", text: "Owners are notified within seconds of a possible match.", color: "bg-indigo-100 text-indigo-600" },
  { icon: ShieldCheck, title: "Verified claims", text: "Finders set a secret question so only the real owner can claim.", color: "bg-emerald-100 text-emerald-600" },
  { icon: MessageCircle, title: "Private chat", text: "Talk in-app without sharing your phone number or email.", color: "bg-fuchsia-100 text-fuchsia-600" },
  { icon: Search, title: "Search and filter", text: "Find items by keyword, category, date and location.", color: "bg-sky-100 text-sky-600" },
  { icon: Users, title: "Communities", text: "Scope posts to your college, office or city.", color: "bg-rose-100 text-rose-600" },
];

const things = [
  { icon: Smartphone, label: "Phones" },
  { icon: Wallet, label: "Wallets" },
  { icon: KeyRound, label: "Keys" },
  { icon: CreditCard, label: "ID cards" },
  { icon: Laptop, label: "Laptops" },
  { icon: Backpack, label: "Bags" },
  { icon: BookOpen, label: "Books" },
];

export default function Home() {
  const { user } = useAuth();
  const lostTo = user ? "/report/lost" : "/register";
  const foundTo = user ? "/report/found" : "/register";

  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
        <div className="absolute -left-24 -top-24 h-96 w-96 animate-blob rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-112 w-md animate-blob rounded-full bg-pink-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            {user && (
              <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-sm">
                Welcome back, {user.name.split(" ")[0]}
              </span>
            )}
            <h1 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
              Lost something?
              <br />
              <span className="text-amber-300">Let us reconnect.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-indigo-100">
              ReConnect matches lost items with found items, alerts the owner in real time and verifies every claim.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={lostTo} className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg transition hover:scale-105">
                I lost something <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to={foundTo} className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20">
                I found something
              </Link>
            </div>
          </div>

          <div className="relative hidden md:flex md:justify-center">
            <LostFoundSign className="w-80 rotate-3 animate-float drop-shadow-2xl" />

            <div className="absolute -bottom-6 -left-10 flex items-center gap-3 rounded-2xl bg-white p-3 text-slate-800 shadow-2xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Match found</p>
                <p className="text-xs text-slate-500">Black wallet, 92%</p>
              </div>
            </div>
            <div className="absolute -right-8 -top-4 flex items-center gap-3 rounded-2xl bg-white p-3 text-slate-800 shadow-2xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Bell className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold">Owner notified</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-indigo-600">
          What people lose most
        </p>
        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {things.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center font-display text-3xl font-bold text-slate-900">How it works</h2>
        <p className="mt-2 text-center text-slate-500">Three simple steps from lost to found.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-fuchsia-600 text-white">
                <Icon className="h-7 w-7" />
              </span>
              <p className="mt-5 text-sm font-semibold text-indigo-600">Step {i + 1}</p>
              <h3 className="mt-1 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-900">Why ReConnect</h2>
          <p className="mt-2 text-center text-slate-500">Built to be fast, safe and private.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text, color }) => (
              <div key={title} className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                <p className="mt-1 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!user && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl bg-linear-to-r from-indigo-600 to-fuchsia-600 px-8 py-14 text-center text-white">
            <h2 className="font-display text-3xl font-bold">Ready to find what you lost?</h2>
            <p className="mt-2 text-indigo-100">Create a free account in under a minute.</p>
            <Link to="/register" className="mt-6 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-indigo-700 transition hover:scale-105">
              Get started
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="max-w-3xl mx-auto mt-16 text-center">
      <h1 className="text-4xl font-bold text-indigo-600">Welcome, {user.name}</h1>
      <p className="mt-3 text-slate-600">
        Lost something? Found something? We will help it find its way home.
      </p>
    </div>
  );
}
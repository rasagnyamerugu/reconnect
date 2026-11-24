import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [msg, setMsg] = useState("Connecting...");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/health`)
      .then((res) => setMsg(res.data.message))
      .catch(() => setMsg("Could not reach the server"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-4xl font-bold text-indigo-600">ReConnect</h1>
      <p className="mt-3 text-slate-600">{msg}</p>
    </div>
  );
}
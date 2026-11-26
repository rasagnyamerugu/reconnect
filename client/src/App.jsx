import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function NotFound() {
  return (
    <div className="py-32 text-center">
      <h1 className="font-display text-5xl font-bold text-indigo-600">404</h1>
      <p className="mt-2 text-slate-500">This page does not exist yet.</p>
      <Link to="/" className="mt-4 inline-block font-semibold text-indigo-600">Back home</Link>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
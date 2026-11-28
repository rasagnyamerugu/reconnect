import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import api from "../api";
import ItemCard from "../components/ItemCard";

export default function MyItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/items/mine")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-slate-900">My reports</h1>
        <Link to="/report/lost" className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> New report
        </Link>
      </div>

      {loading ? (
        <p className="mt-12 text-center text-slate-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="mt-16 text-center text-slate-500">You have not reported anything yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
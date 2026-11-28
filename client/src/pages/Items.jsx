import { useEffect, useState } from "react";
import { Search, SearchX } from "lucide-react";
import api from "../api";
import ItemCard from "../components/ItemCard";
import { CATEGORIES } from "../constants";

const tabs = [
  { value: "", label: "All" },
  { value: "lost", label: "Lost" },
  { value: "found", label: "Found" },
];

export default function Items() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ q: "", type: "", category: "" });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const setFilter = (key, value) => {
    setPage(1);
    setFilters((f) => ({ ...f, [key]: value }));
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      api
        .get("/items", { params: { ...filters, page } })
        .then((res) => {
          setItems(res.data.items);
          setPages(res.data.pages);
          setTotal(res.data.total);
          setError("");
        })
        .catch(() => setError("Could not load items"))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, page]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-slate-900">Browse items</h1>
      <p className="mt-1 text-slate-500">Search every lost and found report.</p>

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={filters.q}
            onChange={(e) => setFilter("q", e.target.value)}
            placeholder="Search by title, description or place"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        <select
          value={filters.category}
          onChange={(e) => setFilter("category", e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.label}
            onClick={() => setFilter("type", t.value)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              filters.type === t.value ? "bg-indigo-600 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="mt-6 rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}

      {loading ? (
        <p className="mt-12 text-center text-slate-500">Loading...</p>
      ) : items.length === 0 ? (
        <div className="mt-16 text-center text-slate-500">
          <SearchX className="mx-auto h-12 w-12" />
          <p className="mt-3">No items match your search.</p>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-slate-500">{total} result{total !== 1 && "s"}</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
          {pages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-xl border border-slate-200 bg-white px-4 py-2 disabled:opacity-40">
                Previous
              </button>
              <span className="text-sm text-slate-600">Page {page} of {pages}</span>
              <button disabled={page >= pages} onClick={() => setPage(page + 1)} className="rounded-xl border border-slate-200 bg-white px-4 py-2 disabled:opacity-40">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
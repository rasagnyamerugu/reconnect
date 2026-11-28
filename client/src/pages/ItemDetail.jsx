import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Package, Trash2, User, ShieldCheck } from "lucide-react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { fmtDate } from "../constants";

export default function ItemDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    api
      .get(`/items/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => setError(err.response?.data?.message || "Could not load this item"));
  }, [id]);

  const remove = async () => {
    if (!window.confirm("Delete this report?")) return;
    try {
      await api.delete(`/items/${id}`);
      navigate("/my-items");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete");
    }
  };

  if (error) return <p className="p-12 text-center text-red-600">{error}</p>;
  if (!item) return <p className="p-12 text-center text-slate-500">Loading...</p>;

  const isLost = item.type === "lost";
  const isOwner = item.reportedBy?._id === user?.id;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Link to="/items" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
        <ArrowLeft className="h-4 w-4" /> Back to browse
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div>
          <div className="flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
            {item.images?.[active] ? (
              <img src={item.images[active]} alt={item.title} className="h-full w-full object-cover" />
            ) : (
              <Package className="h-16 w-16 text-slate-300" />
            )}
          </div>
          {item.images?.length > 1 && (
            <div className="mt-3 flex gap-3">
              {item.images.map((src, i) => (
                <button key={src} onClick={() => setActive(i)} className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${active === i ? "border-indigo-600" : "border-transparent"}`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${isLost ? "bg-rose-500" : "bg-emerald-500"}`}>
              {isLost ? "Lost" : "Found"}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">{item.status}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-slate-900">{item.title}</h1>

          <div className="mt-4 space-y-2 text-slate-600">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {item.location?.name}</p>
            <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {fmtDate(item.dateEvent)}</p>
            <p className="flex items-center gap-2"><User className="h-4 w-4" /> Reported by {item.reportedBy?.name}</p>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
            <div><dt className="text-slate-400">Category</dt><dd className="font-medium capitalize">{item.category}</dd></div>
            <div><dt className="text-slate-400">Colour</dt><dd className="font-medium">{item.color || "-"}</dd></div>
            <div><dt className="text-slate-400">Brand</dt><dd className="font-medium">{item.brand || "-"}</dd></div>
          </dl>

          {item.description && <p className="mt-6 text-slate-600">{item.description}</p>}

          {!isLost && item.verificationQuestion && (
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <p>The finder will ask a secret question to confirm you are the owner. This keeps the item safe.</p>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {isOwner ? (
              <button onClick={remove} className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-medium text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4" /> Delete report
              </button>
            ) : (
              <button disabled className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white opacity-60">
                {isLost ? "I found this" : "This is mine"} (coming soon)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { MapPin, Calendar, Package } from "lucide-react";
import { fmtDate } from "../constants";

const statusStyle = {
  open: "bg-slate-100 text-slate-600",
  matched: "bg-amber-100 text-amber-700",
  claimed: "bg-sky-100 text-sky-700",
  returned: "bg-emerald-100 text-emerald-700",
};

export default function ItemCard({ item }) {
  const isLost = item.type === "lost";

  return (
    <Link
      to={`/items/${item._id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44 bg-linear-to-br from-slate-100 to-slate-200">
        {item.images?.[0] ? (
          <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <Package className="h-12 w-12" />
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
            isLost ? "bg-rose-500" : "bg-emerald-500"
          }`}
        >
          {isLost ? "Lost" : "Found"}
        </span>
      </div>

      <div className="p-4">
        <h3 className="truncate font-display text-lg font-bold text-slate-900 group-hover:text-indigo-600">
          {item.title}
        </h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4 shrink-0" /> <span className="truncate">{item.location?.name}</span>
        </p>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="h-4 w-4 shrink-0" /> {fmtDate(item.dateEvent)}
        </p>
        <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyle[item.status]}`}>
          {item.status}
        </span>
      </div>
    </Link>
  );
}
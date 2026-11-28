import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import api from "../api";

const tone = (score) =>
  score >= 80 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700";

export default function MatchList({ itemId }) {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    api
      .get(`/items/${itemId}/matches`)
      .then((res) => setMatches(res.data))
      .catch(() => setMatches([]));
  }, [itemId]);

  return (
    <section className="mt-12">
      <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900">
        <Sparkles className="h-6 w-6 text-indigo-600" /> Possible matches
      </h2>

      {matches === null ? (
        <p className="mt-4 text-slate-500">Checking for matches...</p>
      ) : matches.length === 0 ? (
        <p className="mt-4 text-slate-500">
          No matches yet. We will notify you when a similar report appears.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {matches.map(({ item, score, reasons }) => (
            <Link
              key={item._id}
              to={`/items/${item._id}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {item.images?.[0] && (
                  <img src={item.images[0]} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900">{item.title}</p>
                <p className="truncate text-sm text-slate-500">
                  {item.type === "found" ? "Found" : "Lost"} at {item.location?.name}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {reasons.map((r) => (
                    <span key={r} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${tone(score)}`}>
                {score}%
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
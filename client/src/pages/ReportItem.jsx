import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";
import api from "../api";
import { CATEGORIES } from "../constants";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

export default function ReportItem() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", category: "", description: "", color: "", brand: "",
    locationName: "", dateEvent: "", verificationQuestion: "", verificationAnswer: "",
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p)), [previews]);

  if (type !== "lost" && type !== "found") return <Navigate to="/" />;
  const isLost = type === "lost";
  const today = new Date().toISOString().split("T")[0];

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addFiles = (e) => {
    const picked = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...picked].slice(0, 3));
    e.target.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLost && (!form.verificationQuestion || !form.verificationAnswer)) {
      return setError("Please add a secret question and its answer so the real owner can be verified.");
    }

    const fd = new FormData();
    fd.append("type", type);
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
    files.forEach((f) => fd.append("images", f));

    setLoading(true);
    try {
      const { data } = await api.post("/items", fd);
      navigate(`/items/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit the report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <span className={`rounded-full px-4 py-1 text-sm font-semibold text-white ${isLost ? "bg-rose-500" : "bg-emerald-500"}`}>
        {isLost ? "Lost item" : "Found item"}
      </span>
      <h1 className="mt-3 font-display text-3xl font-bold text-slate-900">
        {isLost ? "Report something you lost" : "Report something you found"}
      </h1>
      <p className="mt-1 text-slate-500">
        {isLost
          ? "The more detail you add, the better our matching works."
          : "Thank you for helping. Your contact details stay private."}
      </p>

      {error && <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input name="title" value={form.title} onChange={set} placeholder="e.g. Black leather wallet" className={inputCls} required />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <select name="category" value={form.category} onChange={set} className={inputCls} required>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{isLost ? "Date lost" : "Date found"}</label>
            <input type="date" name="dateEvent" value={form.dateEvent} max={today} onChange={set} className={inputCls} required />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Colour</label>
            <input name="color" value={form.color} onChange={set} placeholder="e.g. Black" className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Brand</label>
            <input name="brand" value={form.brand} onChange={set} placeholder="e.g. Samsung" className={inputCls} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{isLost ? "Where did you lose it?" : "Where did you find it?"}</label>
          <input name="locationName" value={form.locationName} onChange={set} placeholder="e.g. Central Library, 2nd floor" className={inputCls} required />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={set} rows={3} placeholder="Marks, stickers, contents, anything special" className={inputCls} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Photos (up to 3)</label>
          <div className="flex flex-wrap gap-3">
            {previews.map((src, i) => (
              <div key={src} className="relative h-24 w-24 overflow-hidden rounded-xl border border-slate-200">
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {files.length < 3 && (
              <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-400 transition hover:border-indigo-400 hover:text-indigo-500">
                <ImagePlus className="h-6 w-6" />
                <span className="mt-1 text-xs">Add</span>
                <input type="file" accept="image/*" multiple onChange={addFiles} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {!isLost && (
          <div className="space-y-4 rounded-xl bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-800">Verification (hidden from everyone)</p>
            <p className="text-sm text-amber-700">
              Ask something only the real owner would know. Do not describe the answer in the public description.
            </p>
            <input name="verificationQuestion" value={form.verificationQuestion} onChange={set} placeholder="e.g. What is the wallpaper on the phone?" className={inputCls} />
            <input name="verificationAnswer" value={form.verificationAnswer} onChange={set} placeholder="Correct answer" className={inputCls} />
          </div>
        )}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-600 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit report"}
        </button>
      </form>
    </div>
  );
}
const WEIGHTS = { category: 30, text: 25, location: 15, color: 10, brand: 10, time: 10 };

export const MATCH_THRESHOLD = 60;

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "of", "in", "on", "at", "my", "is",
  "with", "near", "lost", "found", "one", "has", "have",
]);

const tokens = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

const jaccard = (a, b) => {
  const setA = new Set(a);
  const setB = new Set(b);
  if (!setA.size || !setB.size) return 0;
  let shared = 0;
  setA.forEach((w) => setB.has(w) && shared++);
  return shared / (setA.size + setB.size - shared);
};

const sameWord = (a = "", b = "") => {
  const x = a.trim().toLowerCase();
  const y = b.trim().toLowerCase();
  if (!x || !y) return 0.5;
  return x === y ? 1 : 0;
};

const toRad = (deg) => (deg * Math.PI) / 180;

const distanceKm = (a, b) => {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
};

const locationScore = (a = {}, b = {}) => {
  const byName = jaccard(tokens(a.name), tokens(b.name));
  let byGeo = 0;
  if (a.lat != null && a.lng != null && b.lat != null && b.lng != null) {
    const km = distanceKm(a, b);
    byGeo = km <= 0.2 ? 1 : Math.max(0, 1 - (km - 0.2) / 1.8);
  }
  return Math.max(byName, byGeo);
};

const timeScore = (lostDate, foundDate) => {
  const days = (new Date(foundDate) - new Date(lostDate)) / 86400000;
  if (days < -1) return 0;
  return Math.max(0, 1 - Math.max(days, 0) / 14);
};

export const scoreMatch = (lost, found) => {
  if (lost.category !== found.category) return { score: 0, reasons: [] };

  const parts = {
    category: 1,
    text: jaccard(
      tokens(`${lost.title} ${lost.description}`),
      tokens(`${found.title} ${found.description}`)
    ),
    location: locationScore(lost.location, found.location),
    color: sameWord(lost.color, found.color),
    brand: sameWord(lost.brand, found.brand),
    time: timeScore(lost.dateEvent, found.dateEvent),
  };

  let score = 0;
  for (const key of Object.keys(WEIGHTS)) score += WEIGHTS[key] * parts[key];

  const reasons = ["Same category"];
  if (parts.text >= 0.4) reasons.push("Similar description");
  if (parts.location >= 0.8) reasons.push("Same place");
  if (parts.color === 1) reasons.push("Same colour");
  if (parts.brand === 1) reasons.push("Same brand");
  if (parts.time >= 0.8) reasons.push("Close in time");

  return { score: Math.round(score), reasons };
};
import Item from "../models/Item.js";
import Notification from "../models/Notification.js";
import { scoreMatch, MATCH_THRESHOLD } from "./matcher.js";

export const findMatches = async (item, limit = 5) => {
  const opposite = item.type === "lost" ? "found" : "lost";

  const candidates = await Item.find({
    type: opposite,
    category: item.category,
    community: item.community,
    status: { $in: ["open", "matched"] },
    _id: { $ne: item._id },
  }).populate("reportedBy", "name");

  return candidates
    .map((candidate) => {
      const lost = item.type === "lost" ? item : candidate;
      const found = item.type === "found" ? item : candidate;
      const { score, reasons } = scoreMatch(lost, found);
      return { item: candidate, score, reasons };
    })
    .filter((m) => m.score >= MATCH_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const notifyMatches = async (newItem) => {
  const matches = await findMatches(newItem);
  if (!matches.length) return [];

  const notes = [
    {
      user: newItem.reportedBy,
      item: newItem._id,
      type: "match",
      message: `${matches.length} possible match${matches.length > 1 ? "es" : ""} for your ${newItem.type} item "${newItem.title}"`,
    },
  ];

  for (const m of matches) {
    notes.push({
      user: m.item.reportedBy._id,
      item: m.item._id,
      type: "match",
      message: `A new ${newItem.type} report may match your ${m.item.type} item "${m.item.title}" (${m.score}%)`,
    });
  }

  return Notification.insertMany(notes);
};
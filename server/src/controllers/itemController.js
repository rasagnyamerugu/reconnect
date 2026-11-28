import mongoose from "mongoose";
import Item from "../models/Item.js";
import cloudinary from "../config/cloudinary.js";
import { findMatches, notifyMatches } from "../utils/matchService.js";

const uploadBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "reconnect" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createItem = async (req, res) => {
  try {
    const {
      type, title, description, category, color, brand,
      locationName, lat, lng, dateEvent,
      verificationQuestion, verificationAnswer,
    } = req.body;

    if (!type || !title || !category || !locationName || !dateEvent) {
      return res.status(400).json({
        message: "Type, title, category, location and date are required",
      });
    }

    const images = [];
    for (const file of req.files || []) {
      const result = await uploadBuffer(file.buffer);
      images.push(result.secure_url);
    }

    const item = await Item.create({
      type,
      title,
      description,
      category,
      color,
      brand,
      location: {
        name: locationName,
        lat: lat ? Number(lat) : undefined,
        lng: lng ? Number(lng) : undefined,
      },
      dateEvent,
      images,
      reportedBy: req.user._id,
      community: req.user.community,
      verificationQuestion: type === "found" ? verificationQuestion : "",
      verificationAnswer: type === "found" ? verificationAnswer?.trim().toLowerCase() : "",
    });

          try {
      await notifyMatches(item);
    } catch (matchErr) {
      console.error("Matching failed:", matchErr.message);
    }

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const { type, category, status, q, page = 1, limit = 12 } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    filter.status = status || { $ne: "returned" };

    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      filter.$or = [{ title: rx }, { description: rx }, { "location.name": rx }];
    }

    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.min(Math.max(Number(limit), 1), 50);

    const [items, total] = await Promise.all([
      Item.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate("reportedBy", "name"),
      Item.countDocuments(filter),
    ]);

    res.json({ items, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ reportedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getItem = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item id" });
    }
    const item = await Item.findById(req.params.id).populate("reportedBy", "name community trustScore");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item id" });
    }
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (String(item.reportedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "You can only edit your own reports" });
    }

    const allowed = ["title", "description", "color", "brand", "dateEvent"];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) item[field] = req.body[field];
    });
    if (req.body.locationName) item.location.name = req.body.locationName;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item id" });
    }
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const isOwner = String(item.reportedBy) === String(req.user._id);
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed to delete this report" });
    }

    await item.deleteOne();
    res.json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getMatches = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item id" });
    }
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (String(item.reportedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "Only the reporter can see matches" });
    }

    const matches = await findMatches(item, 10);
    res.json(matches.map((m) => ({ item: m.item, score: m.score, reasons: m.reasons })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
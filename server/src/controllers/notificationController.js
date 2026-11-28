import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const [notifications, unread] = await Promise.all([
      Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(30),
      Notification.countDocuments({ user: req.user._id, read: false }),
    ]);
    res.json({ notifications, unread });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markRead = async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true }
    );
    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
    res.json({ message: "All marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
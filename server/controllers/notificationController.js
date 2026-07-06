const Notification = require("../models/Notification");

// Send Notification
const sendNotification = async (req, res) => {
  try {

    const { user, title, message } = req.body;

    const notification = await Notification.create({
      user,
      title,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Notification Sent Successfully",
      notification,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get User Notifications
const getNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: notifications.length,
      notifications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Mark as Read
const markAsRead = async (req, res) => {
  try {

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification Marked as Read",
      notification,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Notification
const deleteNotification = async (req, res) => {
  try {

    const notification = await Notification.findByIdAndDelete(
      req.params.id
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  sendNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
};
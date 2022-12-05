import axios from "axios";

import { config } from "../config";

export const getImage = async (id) => {
  try {
    const result = await axios.get(config().getImage + "/" + id);
    return result.data;
  } catch (e) {
    return null;
  }
};

export const getNotifications = async () => {
  try {
    const result = await axios.get(config().getNotificationsUrl);
    return result.data;
  } catch (e) {
    return { data: [] };
  }
};

export const deleteNotification = async (id) => {
  try {
    const result = await axios.post(config().deleteNotificationUrl, { id });
    return result.data;
  } catch (e) {
    return e;
  }
};

import axios from "axios";
import { projectId } from "../../../env.config";
import { fetchAccessToken } from "./fetchAccessToken";

export const sendNotification = async (fcmToken, title, body, data) => {
  const token = await fetchAccessToken();

  // console.log(fcmToken);

  const message = {
    message: {
      notification: {
        title,
        body,
      },
      data: {
        screen: data.screen,
        item: JSON.stringify(data.item), // Serialize the item object
        channel: JSON.stringify(data.channel), // Serialize the channel object
        user: JSON.stringify(data.user), // Serialize the channel object
      },
      token: fcmToken,
    },
  };

  const config = {
    method: "post",
    url: `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: message,
  };

  try {
    const response = await axios(config);
    console.log("Successfully sent message:", response.data);
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response ? error.response.data : error.message
    );
  }
};

// const message = {
//   notification: {
//     title: title,
//     body: body,
//   },
//   token: fcmToken,
//   priority: 'high',
//   time_to_live: 60 * 60 * 24,
// };

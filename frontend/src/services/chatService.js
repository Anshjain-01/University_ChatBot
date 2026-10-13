import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const createConversation = async () => {
  const response = await axios.post(
    `${API_URL}/conversations`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getConversations = async () => {
  const response = await axios.get(
    `${API_URL}/conversations`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const sendMessage = async (conversationId, content) => {
  const response = await axios.post(
    `${API_URL}/messages`,
    {
      conversationId,
      content,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};


export const getMessages = async (conversationId) => {
  const response = await axios.get(
    `${API_URL}/messages/${conversationId}`,
    { withCredentials: true }
  );

  return response.data;
};

export const deleteConversation = async (conversationId) => {
  const response = await axios.delete(
    `${API_URL}/conversations/${conversationId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

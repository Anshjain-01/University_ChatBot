export const getCurrentUser = async () => {
  const response = await axios.get("http://localhost:5000/api/user/me", {
    withCredentials: true,
  });

  return response.data;
};
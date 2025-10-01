const API_URL = "http://localhost:5000/api/profile";

export const sendProfile = async (profileData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  return res.json();
};

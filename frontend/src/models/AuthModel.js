export async function registerUser(userData) {
  const res = await fetch("http://localhost:3001/api/v1/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  return data;
}

export async function loginUser(userData) {
  const res = await fetch("http://localhost:3001/api/v1/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  return data;
}

export function saveToLocalStorage(token, email) {
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
}

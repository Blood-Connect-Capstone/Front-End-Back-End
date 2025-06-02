export async function form1Data(formData) {
  const res = await fetch("http://localhost:3001/api/v1/donorform1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to submit form data");
  }

  const data = await res.json();
  return data;
}
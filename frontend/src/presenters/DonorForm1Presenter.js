import { form1Data } from "../models/donorForm1Model";

export async function donorForm1Presenter(formData, router) {
  try {
    const data = await form1Data(formData);
    if (data.success) {
      return data;
    } else {
      alert(data.message || "Failed to submit form.");
    }
  } catch (err) {
    alert("Error occurred during form submission.");
    console.error(err);
  }
}
export default donorForm1Presenter;

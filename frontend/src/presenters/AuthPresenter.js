import { registerUser, saveToLocalStorage, loginUser } from "../models/AuthModel";

export async function RegisterPresenter(formData, router) {
  try {
    const data = await registerUser(formData);
    if (data.success) {
      saveToLocalStorage(data.token, formData.email);
      alert("Registration succeed!");
      router.push("/");
    } else {
      alert(data.message || "Registration Failed.");
    }
  } catch (err) {
    alert("Error occurred during registration.");
    console.error(err);
  }
}

export async function LoginPresenter(formData, router) {
  try {
    const data = await loginUser(formData);
    console.log(data)
    if (data.success) {
      saveToLocalStorage(data.token, formData.email);
      alert("Login succeed!");
      router.push("/home");
    } else {
      alert(data.message || "Login Failed.");
    }
  } catch (err) {
    alert("Error occurred during login.");
    console.error(err);
  }
}

export function LogoutPresenter(router) {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  router.push("/");
}

export default LoginPresenter;;


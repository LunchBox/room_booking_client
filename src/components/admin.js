import { ref } from "vue";
import { signOut as signOutUser } from "./admin";

const currentAdmin = ref(null);

if (localStorage.getItem("admin")) {
  currentAdmin.value = JSON.parse(localStorage.getItem("admin"));
}

function signIn(admin) {
  signOutUser();
  localStorage.setItem("admin", JSON.stringify(admin));
  currentAdmin.value = admin;
}

function signOut() {
  localStorage.removeItem("admin");
  currentAdmin.value = null;
}

export { currentAdmin, signIn, signOut };

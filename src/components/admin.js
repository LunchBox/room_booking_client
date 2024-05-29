import { ref } from "vue";

const currentAdmin = ref(null);

if (localStorage.getItem("admin")) {
  currentAdmin.value = JSON.parse(localStorage.getItem("admin"));
}

function signIn(admin) {
  localStorage.setItem("admin", JSON.stringify(admin));
  currentAdmin.value = admin;
}

function signOut() {
  localStorage.removeItem("admin");
  currentAdmin.value = null;
}

export { currentAdmin, signIn, signOut };

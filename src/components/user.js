import { ref, computed } from "vue";

const currentUser = ref(null);

if (localStorage.getItem("user")) {
  currentUser.value = JSON.parse(localStorage.getItem("user"));
}

function regUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  currentUser.value = user;
}

function signOut() {
  localStorage.removeItem("user");
  currentUser.value = null;
}

export { currentUser, regUser, signOut };

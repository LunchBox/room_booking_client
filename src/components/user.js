import { ref } from "vue";

const currentUser = ref(null);

if (localStorage.getItem("user")) {
  currentUser.value = JSON.parse(localStorage.getItem("user"));
}

function signIn(user) {
  localStorage.setItem("user", JSON.stringify(user));
  currentUser.value = user;
}

function signOut() {
  localStorage.removeItem("user");
  currentUser.value = null;
}

export { currentUser, signIn, signOut };

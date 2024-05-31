import { currentUser } from "@/components/user";
import { currentAdmin } from "@/components/admin";

async function userFetch(url, method = "GET", data = null) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser.value.token}`,
    },
    body: data,
  });

  return res;
}

async function adminFetch(url, method = "GET", data = null) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentAdmin.value.token}`,
    },
    body: data,
  });

  return res;
}

export { userFetch, adminFetch };

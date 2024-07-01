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

const BASE_URL = "http://172.18.17.2:7078/api/v1";

export { userFetch, adminFetch, BASE_URL };

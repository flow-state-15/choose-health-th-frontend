import { toast } from "sonner";

import { fetchFromAPI } from "../utilities/wrappers";

export async function postAuth(type, credentials) {
  const data = await fetchFromAPI(`/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  
  if (data.error) {
    return { error: data.message };
  } else {
    return data;
  }
}

export function restoreUser(dispatcher) {
  fetchFromAPI("/restore")
    .then((data) => dispatcher(data))
    .catch((error) => toast.error(error.message));
}

export function fetchAllPlans(dispatcher) {
  fetchFromAPI("/plans")
    .then((data) => dispatcher(data))
    .catch((error) => toast.error(error.message));
}

export function fetchUserPlan(dispatcher) {
  fetchFromAPI(`/user/plan`)
    .then((data) => dispatcher(data.plan || null))
    .catch((error) => toast.error(error.message));
}

export function fetchUserPurchases(dispatcher) {
  fetchFromAPI(`/user/purchases`)
    .then((data) => dispatcher(data.purchases))
    .catch((error) => toast.error(error.message));
}

export function postPlanPurchase(planId, dispatcher) {
  fetchFromAPI(`/purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId }),
  })
    .then((data) => dispatcher(data))
    .catch((error) => toast.error(error.message));
}

export function completeStep(stepId, type, dispatcher) {
  fetchFromAPI(`/user/step/${stepId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: type }),
  })
    .then((data) => dispatcher(data))
    .catch((error) => toast.error(error.message));
}

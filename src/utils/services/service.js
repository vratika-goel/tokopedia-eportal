import fetch from "isomorphic-fetch";

export async function serviceCall(url) {
  const response = await fetch(url);
  return response.json();
}
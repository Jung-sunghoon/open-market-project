import { router } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const body = document.querySelector("body");

  if (!app || !body) {
    console.error("DOM elements not found.");
    return;
  }

  router();

  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const url = new URL(e.target.href);
      window.history.pushState({}, "", url.pathname);
      router();
    });
  });

  window.addEventListener("popstate", () => {
    router();
  });
});

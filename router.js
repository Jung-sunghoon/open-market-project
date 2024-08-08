// routes.js
import Login from "./components/login/Login.js";
import Home from "./components/Home.js";
import Signup from "./components/signup/signup.js";

const routes = {
  "/": Home,
  "/login": Login,
  "/signup": Signup,
};

export const router = () => {
  const path = window.location.pathname;
  const PageComponent =
    routes[path] ||
    (() => (document.createElement("h1").innerText = "404 Not Found"));
  const app = document.getElementById("app");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  // Remove sr-only class by default
  header.classList.remove("sr-only");
  footer.classList.remove("sr-only");

  // Add sr-only class based on route
  if (path === "/login" || path === "/signup") {
    header.classList.add("sr-only");
    footer.classList.add("sr-only");
  }

  app.innerHTML = "";
  if (PageComponent) {
    app.appendChild(PageComponent());
  } else {
    app.innerHTML = "<h1>404 Not Found</h1>";
  }
};

export const navigateTo = (path) => {
  window.history.pushState({}, path, window.location.origin + path);
  router();
};

window.addEventListener("popstate", () => {
  router();
});

const handleLinkClick = (event, path) => {
  event.preventDefault();
  window.history.pushState(null, "", path);
  router();
};

export { handleLinkClick };

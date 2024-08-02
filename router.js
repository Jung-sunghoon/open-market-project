import Login from "./components/login/Login.js";
import Home from "./components/Home.js";

const routes = {
  "/": Home,
  "/login": Login,
};

export const router = () => {
  const path = window.location.pathname;
  const matchedRoute = Object.keys(routes).find((route) =>
    new RegExp(`^${route.replace(/:[^\s/]+/g, "([^\\s/]+)")}$`).test(path)
  );
  const PageComponent = routes[matchedRoute];
  const app = document.getElementById("app");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (matchedRoute === "/login") {
    header.classList.toggle("sr-only");
    footer.classList.toggle("sr-only");
  }
  app.innerHTML = "";
  if (PageComponent) {
    app.appendChild(PageComponent());
  } else {
    app.innerHTML = "<h1>404 Not Found</h1>";
  }
};

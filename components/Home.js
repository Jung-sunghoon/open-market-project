const Home = () => {
  const container = document.createElement("div");

  const title = document.createElement("h1");
  title.textContent = "Home Page";

  container.appendChild(title);

  return container;
};

export default Home;

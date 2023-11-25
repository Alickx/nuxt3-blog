let theme = localStorage.getItem("vueuse-color-scheme");

function setTheme(theme) {
  if (theme === "auto" || !theme) {
    theme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }
  document.querySelector("html").classList.add(theme);
  document.documentElement.setAttribute("data-theme", theme);
}

setTheme(theme);

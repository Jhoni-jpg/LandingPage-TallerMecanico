const viewer = document.querySelector("model-viewer");
const loader = document.querySelector("#loading-spinner");

viewer.addEventListener("load", () => {
    loader.style.display = "none";
});
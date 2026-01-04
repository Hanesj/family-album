// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
let albumForm;
const initApp = () => {
  if (document.querySelector("#searchAlbum")) {
    albumForm = document.querySelector("#searchAlbum");
    albumForm.addEventListener("submit", filterAlbums);
  }
};

const filterAlbums = (e) => {
  e.preventDefault();
  const name = albumForm.querySelector("input");
  console.log(name.value);
  console.log(window.location.href);
  window.location.assign(`${window.location.href}/${name.value}`);
  name.value = "";
};

document.addEventListener("DOMContentLoaded", initApp);

import { checkToken, redirect, logout } from "./utils.js";

const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const productsContainer = document.querySelector(".product-container");
const logoutBtn = document.getElementById("logout-btn");
const form = document.forms[0];

let products = [];

document.addEventListener("DOMContentLoaded", () => {
  if (!checkToken()) {
    redirect("/login.html");
  } else {
    renderProducts();
  }
});

logoutBtn.addEventListener("click", handleLogout);
form.addEventListener("submit", handleFormSubmit);

function handleLogout() {
  logout();
}

function handleFormSubmit(event) {
  event.preventDefault();

  const newProduct = {
    id: Date.now(),
    title: titleInput.value.trim(),
    price: priceInput.value.trim(),
    description: descriptionInput.value.trim(),
  };

  if (validateProduct(newProduct)) {
    products.push(newProduct);
    console.log(products);

    clearFormInputs();
    renderProducts();
  } else {
    alert("All fields are required and must be filled out correctly.");
  }
}

function validateProduct(product) {
  return product.title && !isNaN(product.price) && product.description;
}

function clearFormInputs() {
  titleInput.value = '';
  priceInput.value = '';
  descriptionInput.value = '';
}

function renderProducts() {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const titleElem = document.createElement("h1");
    const priceElem = document.createElement("p");
    const descriptionElem = document.createElement("h3");
    const deleteBtn = document.createElement("button");

    titleElem.textContent = product.title;
    priceElem.textContent = `$${product.price}`;
    descriptionElem.textContent = product.description;
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => handleDeleteProduct(product.id));

    productDiv.append(titleElem, priceElem, descriptionElem, deleteBtn);
    productsContainer.append(productDiv);

    productDiv.classList.add("fade-in");
  });
}

function handleDeleteProduct(productId) {
  products = products.filter(product => product.id !== productId);
  renderProducts();
}

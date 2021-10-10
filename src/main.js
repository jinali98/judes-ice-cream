"use strict";

const hamburgerBtn = document.querySelector(".hamburger-icon");
const navigationBar = document.querySelector(".nav-items");

const productGallery = document.querySelector(".product-gallery");

const productNavLinks = document.querySelectorAll(".product-item");

let productData = [];

//toggle navigation menu
hamburgerBtn.addEventListener("click", function () {
  navigationBar.classList.toggle("nav-toggle");
});

const fetchData = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("something Went wrong!!");
    const data = await response.json();

    return data;
  } catch (err) {
    return err;
  }
};

const createProductCard = function (product) {
  const productImg = document.createElement("div");
  productImg.className = "card";
  productImg.style.backgroundImage = `url(${product.imageUrl})`;
  productGallery.insertAdjacentElement("beforeend", productImg);
};

const productNavLinkHandler = function (link) {
  link.classList.add("active");
  productGallery.innerHTML = "";
  const indexId = link.dataset.product;
  const productCat = productData[indexId];
  productCat.forEach((product) => {
    createProductCard(product);
  });
};

const removeActiveClass = function () {
  productNavLinks.forEach((link) => {
    link.classList.remove("active");
  });
};

productNavLinks.forEach((link) => {
  link.addEventListener("click", function () {
    removeActiveClass();
    productNavLinkHandler(link);
  });
});

const fetchProducts = function () {
  fetchData("./src/products.json")
    .then((res) => {
      productData = [...res];
      displayProducts();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const displayProducts = function () {
  productData.forEach((category) => {
    category.forEach((each) => {
      if (each.inMain) {
        const productImg = document.createElement("div");
        productImg.className = "card";
        productImg.style.backgroundImage = `url(${each.imageUrl})`;
        productGallery.insertAdjacentElement("beforeend", productImg);
      }
    });
  });
};

fetchProducts();

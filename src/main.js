"use strict";

const hamburgerBtn = document.querySelector(".hamburger-icon");
const navigationBar = document.querySelector(".nav-items");

const productGallery = document.querySelector(".product-gallery");

const productNavLinks = document.querySelectorAll(".product-item");

const questions = document.querySelectorAll(".question");
const answers = document.querySelectorAll(".answer");

let productData = [];

//toggle navigation menu
hamburgerBtn.addEventListener("click", function () {
  navigationBar.classList.toggle("nav-toggle");
});

// re usable function to remove classNames
const removeActiveClass = function (list, className) {
  list.forEach((item) => {
    item.classList.remove(className);
  });
};

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

productNavLinks.forEach((link) => {
  link.addEventListener("click", function () {
    removeActiveClass(productNavLinks, "active");
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

questions.forEach((question) => {
  question.addEventListener("click", function () {
    removeActiveClass(answers, "open-ans");
    // add the active class
    question.nextElementSibling.classList.add("open-ans");
  });
});

// create silder for teimonial section

const swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  speed: 300,
});

fetchProducts();

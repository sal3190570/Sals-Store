const search = document.getElementById("search__container");
const button = document.getElementById("search__button");
const input = document.getElementById("search__input");

button.addEventListener("click", () => {
  search.classList.toggle("active");
  input.focus();
});

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  const products = data;
  return products;
}

async function renderSpinner() {
  const productsList = document.querySelector("#all-products-list");
  const spinnerHTML = `<i class="fa-solid fa-spinner products__list__spinner"></i>`;
  productsList.innerHTML = spinnerHTML;

  await new Promise((resolve) => setTimeout(resolve, 100));
}

async function renderProducts(searchString = "") {
  await renderSpinner();

  const products = await fetchProducts();
  const productsList = document.querySelector("#all-products-list");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchString.toLowerCase())
  );

  const productsHTML = filteredProducts
    .slice(0, 6)
    .map((product) => {
      return `<div class="product">
                <figure class="product__image--wrapper">                                             
                  <img referrerpolicy="no-referrer" src="${product.image}" alt="" class="product__image" />
                   <h3 class="product__info--title">${product.title}</h3>
                   <div class="product__info--list">
                    <div class="product__info1">
                      <i class="fa-solid fa-dollar-sign product__info--icon"></i>
                      <p class="product__info--text">$${product.price}</p>
                    </div>
                    <div class="product__info2">
                      <i class="fa-solid fa-list product__info--icon"></i>
                      <p class="product__info--text">${product.category}</p>
                    </div>
                  </div>                
                </figure>
                <div class= "product__text">
                  <h4 class="product__text__title">${product.title}</h4>
                  <p class="product__text__subtitle">$${product.price}</p>
                </div>
              </div>`;
    })
    .join("");

  productsList.innerHTML =
    filteredProducts.length > 0
      ? productsHTML
      : `<p class="product__none" >No results found.</p>`;
}

function setupSearchInput(inputSelector) {
  const searchInput = document.querySelector(inputSelector);
  searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const searchString = e.target.value.trim();
      await renderProducts(searchString);
    }
  });
}

setupSearchInput(".search__input");
setupSearchInput(".landing__background__search__input");

const searchResultsDiv = document.querySelector(".products__search--results");

function setupSearchText(inputSelector) {
  const searchInput = document.querySelector(inputSelector);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const searchText = event.target.value.trim();
      if (searchText) {
        searchResultsDiv.innerText = `' ${searchText} '`;
      } else {
        searchResultsDiv.innerText = "";
      }
    }
  });
}

setupSearchText(".landing__background__search__input");
setupSearchText(".search__input");
renderProducts();

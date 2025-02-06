const listContainer = document.querySelector(".container");

const myCategory = new URLSearchParams(window.location.search).get("category");

const overskrift = document.querySelector(".h_category");

if (myCategory) {
  overskrift.textContent = myCategory;
}

let allData;

fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}&limit=30`)
  .then((response) => response.json())
  .then((json) => {
    allData = json;
    showList(allData);
  });

document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", showFiltered));

function showFiltered() {
  const filter = this.dataset.season;
  if (filter == "All") {
    showList(allData);
  } else {
    fraction = allData.filter((product) => product.season === filter);
    showList(fraction);
  }
}

// Jeg har bedt min data om at hente produkterne
function showList(products) {
  const markup = products
    .map((product) => {
      const discountPrice = product.discount ? (product.price * (100 - product.discount)) / 100 : product.price;

      return `
        <div class="box box-1${product.soldout ? " sold-out-card" : ""}">
          <div class="image-container">
            <a href="produkt.html?id=${product.id}">
              <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" class="opacity" alt="product image" />
            </a>
            ${product.soldout ? `<p class="sold-out">Sold out</p>` : ""}
            ${!product.soldout && product.discount ? `<p class="sale">Sale ${product.discount}%</p>` : ""}
          </div>
          <h4 class="opacity">${product.productdisplayname}</h4>
          <p class="opacity">${product.category} | ${product.articletype}</p>

          <p class="opacity">
            ${product.discount ? `<span class="ny-pris">${discountPrice.toFixed(2)} kr.</span> <span class="gammel-pris">${product.price} kr.</span>` : `<span class="regular-price">${product.price} kr.</span>`}
          </p>

          <a href="produkt.html">
            <p class="click opacity">Read more</p>
          </a>
        </div>
      `;
    })
    .join("");

  listContainer.innerHTML = markup;
}

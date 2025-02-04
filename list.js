const listContainer = document.querySelector(".container");

const myCategory = new URLSearchParams(window.location.search).get("category");

// Hver gang man fetcher henter man data, og man skal have de tre flg linjer:
fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}`)
  .then((response) => response.json())
  .then((data) => showList(data));

// Jeg har bedt min data om at hente produkterne
function showList(products) {
  const markup = products
    // For hvert produkt putter jeg et nyt produkt ind der hedder "markup"
    .map(
      (product) => `
<div class="box box-1 ${product.discount && "sale"} ${product.soldout && "sold-out"}">
        <div class="image-container">
          <a href="produkt.html?id=${product.id}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="product image" /></a>
          <p class="sold-out">Sold out</p>
        </div>
        <h4 class="opacity">${product.productdisplayname}</h4>
        <p class="opacity">${product.category} | ${product.articletype}</p>
        <p class="opacity">${product.price} kr.</p>
        <a href="produkt.html"> <p class="click opacity">Read more</p></a>
      </div>
    `
    )
    .join("");
  listContainer.innerHTML = markup;
}

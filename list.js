const listContainer = document.querySelector(".container");

const myCategory = new URLSearchParams(window.location.search).get("category");

const overskrift = document.querySelector(".h_category");

if (myCategory) {
  overskrift.textContent = myCategory;
}

// Hver gang man fetcher henter man data, og man skal have de tre flg linjer:
fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}`)
  .then((response) => response.json())
  .then((data) => showList(data));

// Jeg har bedt min data om at hente produkterne
function showList(products) {
  const markup = products
    .map((product) => {
      // Calculate new price if there's a discount
      const discountPrice = product.discount ? (product.price * (100 - product.discount)) / 100 : product.price;

      return `
        <div class="box box-1${product.soldout && " sold-out-card"}">
          <div class="image-container">
            <a href="produkt.html?id=${product.id}">
              <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" class="opacity" alt="product image" />
            </a>
            <p class="invisible ${product.soldout && "sold-out"}">Sold out</p>
            ${product.discount ? `<p class="sale">Sale ${product.discount}%</p>` : ""}
          </div>
          <h4 class="opacity">${product.productdisplayname}</h4>
          <p class="opacity">${product.category} | ${product.articletype}</p>

          <p class="opacity">
            ${product.discount ? `<span class="ny-pris">${discountPrice.toFixed(2)} kr.</span> <span class="gammel-pris">${product.price} kr.</span>` : `${product.price} kr.`}
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

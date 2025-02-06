const productId = new URLSearchParams(window.location.search).get("id");
console.log("product loader...", productId);

let productContainer = document.querySelector(".productContainer");

// Henter JSON fil og får adgang til dens data:
fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    // Calculate discounted price if there's a discount
    const discountPrice = data.discount ? (data.price * (100 - data.discount)) / 100 : data.price;

    productContainer.innerHTML = `
      <div class="image-container">
        <img
          src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp"
          alt="${data.productdisplayname}"
        />

        ${!data.soldout && data.discount ? `<p class="isOnSale">Sale ${data.discount}%</p>` : ""}
        ${data.soldout ? `<p class="isSoldOut">Sold out</p>` : ""}
      </div>
      
      <div class="pad-top">
        <h5>${data.brandname} | ${data.category}</h5>
        <h2>${data.productdisplayname} | ${data.basecolour}</h2>

        <p class="price">
          ${data.discount ? `<span class="ny-pris2">${discountPrice.toFixed(2)} kr.</span> <span class="gammel-pris2">${data.price} kr.</span>` : `<span class="regular-price2">${data.price} kr.</span>`}
        </p>

        <div class="hover">
          <div class="buy">
            <h3>Buy now</h3>
          </div>
        </div>
        
        <h3>Product description:</h3>
        <p>${data.description}</p>
      </div>
    `;
  });

// . betyder en metode der kommer i forlængelse af noget
// Jeg har kaldt min variabel "data"
// Fjerne html fra filen, og definere med javascript istedet for. Så jeg kan bestemme hvad der skal stå i template.
// Alt inde i en container skal fjernes, container skal stadig være der så jeg har noget at referere til.

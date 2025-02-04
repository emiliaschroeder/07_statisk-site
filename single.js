const productId = new URLSearchParams(window.location.search).get("id");
console.log("product loader...", productId);

let productContainer = document.querySelector(".productContainer");

// Henter JSON fil og får adgang til dens data:
fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  // Den har hentet filen, og gør det om til gyldig json
  .then((response) => response.json())
  // Istedet for at skrive produkt nummer, kan man indsætte variablen istedet for.

  // Derefter henter den data fra json filen
  .then((data) => {
    productContainer.innerHTML = `
      <img
        src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp"
        alt="grøn cap"
      />
      <div class="pad-top">
        <h5> ${data.brandname} | ${data.category}</h5>
        <h2>${data.productdisplayname} | ${data.basecolour}</h2>
        <h2 class="price">${data.price} kr. </h2>
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

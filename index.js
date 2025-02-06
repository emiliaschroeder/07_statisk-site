console.log("siden vises");
const categorylistContainer = document.querySelector(".category_list_container");

// Hver gang man fetcher henter man data, og man skal have de tre flg linjer:
fetch(`https://kea-alt-del.dk/t7/api/categories/`)
  .then((response) => response.json())
  .then(showCategory);

// Jeg har bedt min data om at hente produkterne
function showCategory(data) {
  console.log("mine data er:", data);

  const markup = data
    // For hvert produkt putter jeg et nyt produkt ind der hedder "markup"
    .map(
      (element) => `
   <div class="red-hover">
        <a href="produktliste.html?category=${element.category}"><h3>${element.category}</h3></a>
      </div>
    `
    )
    .join("");
  categorylistContainer.innerHTML = markup;
}

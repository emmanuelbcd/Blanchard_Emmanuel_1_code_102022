//requêter l'Api pour lui demander l'ensemble des produits

async function fetchProducts () {

    const apiRequest = await fetch ("http://localhost:3000/api/products", {
      method: 'GET',
      headers: {
        "Accept" : "application/json"
      }
    })
    if (apiRequest.ok === true) {
        return apiRequest.json();
    }
    else {
      throw new Error ('Impossible de contacter le serveur')
    }
}

//Affiche dans la console le tableau de l'ensemble des produits
fetchProducts().then(products => console.table(products))

// insérer dans la page l'ensemble des produits fournis par l'Api
async function insertProducts() {
  const result = await fetchProducts()
  .then ((product) => {

  
//Parcourir cette réponse pour insérer chaque élément dans la page d'accueil
for (let i=0; i < product.length; i++) {
      //Récupération de l'élément du DOM
      const sectionItems = document.querySelector(".items");
  
      //Création des éléments et remplissage du texte ou de la source de l'image
      const article = document.createElement ("article"); 
  
      const anchor = document.createElement ("a");
      anchor.href = `./product.html?id=${product[i]._id}`;

      const imageElement = document.createElement ("img");
      imageElement.src = product[i].imageUrl;
      imageElement.alt = product[i].altTxt;
  
      const nameElement = document.createElement ("h3");
      nameElement.innerText = product[i].name;
      nameElement.setAttribute("class", "productName");
  
      const descriptionElement = document.createElement ("p");
      descriptionElement.innerText = product[i].description;
      descriptionElement.setAttribute("class", "productDescription");
  
      //Ajout des éléments créés dans le DOM
      article.appendChild(imageElement);
      article.appendChild(nameElement);
      article.appendChild(descriptionElement);
      anchor.appendChild(article);
      sectionItems.appendChild(anchor);
    } ; 
  });    
  console.log("Les produits ont été insérés");
}

insertProducts()





//requêter l'Api pour lui demander l'ensemble des produits

async function fecthProducts () {

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

//fecthProducts
fecthProducts().then(products => console.log(products))

// insérer dans la page l'ensemble des produits fournis par l'Api
async function insertProducts() {
  const result = await fecthProducts()
  .then ((products) => {

  
  //Parcourir cette réponse pour insérer chaque élément dans la page d'accueil
  for (let product of products) {
      //Récupération de l'élément du DOM
      const sectionItems = document.querySelector(".items");
  
      //Création des éléments et remplissage du texte ou de la source de l'image
      const article = document.createElement ('article'); 
  
      const anchor = document.createElement ('a');
      //anchor.href = "./product.html?id=+article._id";
      anchor.href = "./product.html?id=42";

      const imageElement = document.createElement ('img');
      imageElement.src = article.imageUrl;
      imageElement.alt = article.altTxt;
  
      const nameElement = document.createElement ('h3');
      nameElement.innerText = article.name;
      nameElement.setAttribute("class", "productName");
  
      const descriptionElement = document.createElement ('p');
      descriptionElement.innerText = article.description;
      descriptionElement.setAttribute("class", "productDescription");
  
      //Ajout des éléments créés dans le DOM
      article.append(imageElement);
      article.append(nameElement);
      article.append(descriptionElement);
      anchor.append(article);
      sectionItems.append(anchor);
    }  
  });    
  console.log("Les produits ont été insérés");
}

insertProducts()





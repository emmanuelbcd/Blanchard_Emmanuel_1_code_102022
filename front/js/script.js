//requêter l'Api pour lui demander l'ensemble des produits
const response = fetch ("http://localhost:3000/api/products");


//récupérer la réponse émise
  //Récupération de l'élément du DOM qui accueillera les
  const sectionItems = document.querySelector(".items");


  
  //Parcourir cette réponse pour insérer chaque élément dans la page d'accueil

  //Création des éléments et remplissage du texte ou de la source de l'image
  const article = document.createElement ('article'); 

  const imageElement = document.createElement ('img');
  imageElement.src = article.image;
  imageElement.innerText = article.image;

  const nameElement = document.createElement ('h3');
  nameElement.innerText = article.name;

  const descriptionElement = document.createElement ('p');
  descriptionElement.innerText = article.description;

  //Ajout des éléments créés dans le DOM
  sectionItems.appendChild(imageElement);
  sectionItems.appendChild(nameElement);
  sectionItems.appendChild(descriptionElement);













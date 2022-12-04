//Récupération du panier
let getCart = JSON.parse (localStorage.getItem("obj"));
console.table(getCart);

//Parcourir le panier récupéré pour insérer chaque élément dans la page panier
for (let i=0; i < getCart.lenght; i++ ) {

    //article
    let sectionCartItems = document.getElementById("cart__items"); //Récupération de l'élément du DOM
    sectionCartItems.appendChild(article); //SectionCartItems ajoute l'enfant article dans le DOM
    let article = document.createElement ("article"); //on crée 
    article.className = "cart__item"; //className est utilisé au lieu de class à cause d'éventuels conflits avec le mot-clé class
    article.setAttribute("data-id", getCart[i].obj.id); //nom et valeur attribués

    //div pour l'image du produit
    let divImageElement = document.createElement ("div");
    divImageElement.className = "cart__item__img"; //className est utilisé au lieu de class à cause d'éventuels conflits avec le mot-clé class
    article.appendChild(divImageElement); //article ajoute l'enfant divImageElement dans le DOM

    //image du produit
    let imageElement = document.createElement("img");
    imageElement.src = getCart[i].imageUrl; // source de l'image
    imageElement.alt = getCart[i].altTxt; // texte alternatif de l'image
    divImageElement.appendChild(imageElement); //divImageElement ajoute l'enfant imageElement dans le DOM

    //div parent pour le contenu : div enfants description et réglages (settings)
    //div parent pour le contenu
    let divContent = document.createElement("div");
    divContent.className = "cart__item__content"; //className est utilisé au lieu de class à cause d'éventuels conflits avec le mot-clé class
    article.appendChild(divContent); //article ajoute l'enfant content dans le DOM

    //div description (enfant de divContent et parent de h2 et p)
    let description = document.createElement("div");
    description.className = "cart__item__content__description";
    divContent.appendChild(description); //divContent ajoute l'enfant description dans le DOM

    //titre h2 de la description
    let titleDescription = document.createElement("h2");
    titleDescription.textContent = getCart[i].name;
    description.appendChild(titleDescription); //description ajoute l'enfant titleDescription dans le DOM

    //couleur du produit
    let colorDescription = document.createElement("p");
    colorDescription.textContent = getCart[i].colorValue;
    divContent.appendChild(colorDescription); //divContent ajoute l'enfant couleur à la description dans le DOM

    //prix du produit

}




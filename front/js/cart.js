//Récupération du panier
let getCart = JSON.parse (localStorage.getItem("obj"));
console.table(getCart);

//requêter l'Api pour lui demander l'ensemble des produits
async function getProducts () {
    const productDetails = await fetch ("http://localhost:3000/api/products", {
    method: 'GET',
    headers: {
      "Accept" : "application/json"
    }
    })
    .then ((resp) => resp.json())
    .then ((data) => {
        console.table(data);
    })
    .catch ((error) => {
        console.log(error);
    });
}
getProducts();

//on cherche dans l'Api les produits dont les id sont égaux aux id des objets qu'on veut insérer
//function getCartDetails (getCart) {
//    let arrayProducts = getProducts (); //on récupère l'ensemble des produits de l'api
    //on parcourt le panier récupéré pour aller chercher les id égaux aux id des objets dans l'api
//    for (let i=0; i < getCart.length; i++) {
//        let searchProductsId = arrayProducts.find(elements => elements.id == id);
//    }
//}

//function getCartDetails(getCart) {

for (let i=0, i2 = getCart.length; i < i2; i++) { //on initialise 2 variables pour cette boucle
    let product = getOneProduct(getCart[i].id) //on va chercher le produit
    if (product != undefined) { //trouvé : s'il est différent de undefined, il existe déjà dans l'array
        //on dessine le produit
        //article
        let sectionCartItems = document.getElementById("cart__items"); //Récupération de l'élément du DOM
        sectionCartItems.appendChild(article); //SectionCartItems ajoute l'enfant article dans le DOM
        let article = document.createElement ("article"); //on crée 
        article.className = "cart__item"; //className est utilisé au lieu de class à cause d'éventuels conflits avec le mot-clé class
        article.setAttribute("data-id", getCart[i].id); //nom et valeur attribués

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
        let priceDescription = document.createElement("p");
        //ajout du prix
        divContent.appendChild(priceDescription); //divContent ajoute l'enfant prix à la description dans le DOM
    }
}
//}
const products = getProducts(); //

function getOneProduct(id) {
    let searchProductsId = []; // On déclare la variable une fois, on dit que c'est un tableau.
    for (let i=0; i < getCart.length; i++)
    {
        check = products.find(elements => elements.id == id); // on pourrait ne pas trouver l'id...
        if( check != undefined ) // on teste et si c'est trouvé
        {
            searchProductsId.push( check ) // on pousse dans le tableau.
        }
    }
    return searchProductsId
}


//Form

//on récupère le formulaire saisi par l'utilisateur pour la commande
let userForm = document.querySelector(".cart__order__form");
//userForm.firstName
//userForm.lastName
//userForm.address
//userForm.city
//userForm.email

//on crée les expressions régulières
//pour la validation firstName, lastName et city
let letterRegEx = new RegExp("^[a-zA-Z ,.'-]+$");

//pour la validation adresse
const addressRegEx = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

//pour la validation email
const emailRegEx = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

//on écoute la modification du prénom
userForm.firstName.addEventListener("change", function() { //on écoute le changement et on utilise une fonction de callback pour lui dire quelle action on va devoir utiliser
    validFirstName(this); //on appelle une fonction qui s'appelle validFirstName avec pour paramètre l'élément qui est écouté
});

//on crée la fonction validFirstName
const validFirstName = function (inputFirstName) {
    let testFirstName = letterRegEx.test(inputFirstName.value); //on vérifie s'il y a une correspondance entre ce que l'utilisateur a saisi et une expression régulière
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

    if(testFirstName){
        firstNameErrorMsg.textContent = "";
    }
    else{
        firstNameErrorMsg.textContent = "Veuillez renseigner un prénom";
    }
};

//on écoute la modification du nom
userForm.lasttName.addEventListener("change", function() { //on écoute le changement et on utilise une fonction de callback pour lui dire quelle action on va devoir utiliser
    validLastName(this); //on appelle une fonction qui s'appelle validLastName avec pour paramètre l'élément qui est écouté
});

//on crée la fonction validLastName
const validLastName = function (inputLastName) {
    let testLastName = letterRegEx.test(inputLastName.value); //on vérifie s'il y a une correspondance entre ce que l'utilisateur a saisi et une expression régulière
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

    if (testLastName) {
        lastNameErrorMsg.textContent = "";
    }
    else{
        lastNameErrorMsg.textContent = "Veuillez renseigner un nom";
    }
};

//on écoute la modification de l'adresse
userForm.address.addEventListener("change", function() { //on écoute le changement et on utilise une fonction de callback pour lui dire quelle action on va devoir utiliser
    validAddress(this); //on appelle une fonction qui s'appelle validAddress avec pour paramètre l'élément qui est écouté
});

//on crée la fonction validAddress
const validAddress = function (inputAddress) {
    let testAddress = addressRegEx.test(inputAddress.value); //on vérifie s'il y a une correspondance entre ce que l'utilisateur a saisi et une expression régulière
    let addressErrorMsg = document.getElementById("addressErrorMsg");

    if (testAddress) { //true
        addressErrorMsg.textContent = "";
    }
    else{ //false
        addressErrorMsg.textContent = "Veuillez renseigner une adresse"
    }
};

//on écoute la modification de la ville
userForm.address.addEventListener("change", function() { //on écoute le changement et on utilise une fonction de callback pour lui dire quelle action on va devoir utiliser
    validAddress(this); //on appelle une fonction qui s'appelle validAddress avec pour paramètre l'élément qui est écouté
});

//on crée la fonction validCity
const validCity = function (inputCity) {
    let testCity = letterRegEx.test(inputCity.value); //on vérifie s'il y a une correspondance entre ce que l'utilisateur a saisi et une expression régulière
    let cityErrorMsg = document.getElementById("cityErrorMsg");

    if (testCity) { //true
        cityErrorMsg.textContent= "";
    }
    else { //false
        cityErrorMsg.textContent = "Veuillez renseigner une ville";
    }
};

//on écoute la modification de l'e-mail
userForm.email.addEventListener("change", function() { //on écoute le changement et on utilise une fonction de callback pour lui dire quelle action on va devoir utiliser
    validEmail(this); //on appelle une fonction qui s'appelle validEmail avec pour paramètre l'élément qui est écouté
});

//on crée la fonction validEmail
const validEmail = function (inputEmail) {
    let testEmail = emailRegEx.test(inputEmail.value); //on vérifie s'il y a une correspondance entre ce que l'utilisateur a saisi et une expression régulière
    let emailErrorMsg = document.getElementById("emailErrorMsg");

    if (testEmail) { //true
        emailErrorMsg.textContent = "";
    }
    else { //false
        emailErrorMsg.textContent = "Veuillez renseigner votre email"
    }
}





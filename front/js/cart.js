//Récupération du panier
//la fonction getLocalStorage récupère les données stockées dans le navigateur sous la clé "obj"
function getLocalStorage () {
    let cart = localStorage.getItem("obj");
    if( cart == null)
    {
        return [] 
    }
    else
    { 
        return JSON.parse(cart) 
    }
    
}
let getCart = getLocalStorage (); //on stocke les données récupérées depuis la fonction getLocalStorage
console.log('getCart'); //on affiche la variable getCart
console.table(getCart); //sous forme de tableau

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
        console.log('données API') //on affiche data, les données retournées par l'API
        console.table(data); //sous forme de tableau
        draw(data); //on appelle draw et on passe data en paramètre
    })
    .catch ((error) => {
        console.log(error);
    });
}

//on appelle getProducts
getProducts();

//la fonction draw itère sur chaque élément de getCart 
//et recherche l'élément correspondant dans la liste de produits passée en paramètre (products)
function draw(products) {
    for(let i=0, i2= getCart.length; i<i2; i++)//on boucle les produits du localstorage sans recalculer systématiquement la longueur grâce à i2
    {
        let product = products.find( element => element._id == getCart[i].id ) //on stocke dans product le produit qu'on est allé cherché
        product.color = getCart[i].color;
        product.number = getCart[i].number;
        drawProduct(product); // on appelle la fonction qui dessine le produit
    }
}

//on dessine le produit
function drawProduct (product) {
    console.log('drawProduct');
    console.log(product);
    //article
    let sectionCartItems = document.getElementById("cart__items"); //Récupération de l'élément du DOM
    let article = document.createElement ("article"); //on crée un nouvel élément qui est stocké dans la variable article.
    sectionCartItems.appendChild(article); //SectionCartItems ajoute l'enfant article dans le DOM
    article.className = "cart__item"; //className est utilisé au lieu de class à cause d'éventuels conflits avec le mot-clé class
    article.setAttribute("data-id", product._id); //nom et valeur attribués

    //div pour l'image du produit
    let divImageElement = document.createElement ("div");
    divImageElement.className = "cart__item__img"; //className est utilisé au lieu de class à cause d'éventuels conflits avec le mot-clé class
    article.appendChild(divImageElement); //article ajoute l'enfant divImageElement dans le DOM

    //image du produit
    let imageElement = document.createElement("img");
    imageElement.src = product.imageUrl; // source de l'image
    imageElement.alt = product.altTxt; // texte alternatif de l'image
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
    titleDescription.textContent = product.name;
    description.appendChild(titleDescription); //description ajoute l'enfant titleDescription dans le DOM

    //couleur du produit
    let colorDescription = document.createElement("p");
    colorDescription.textContent = product.color;
    description.appendChild(colorDescription); //on ajoute l'enfant couleur à la description dans le DOM

    //prix du produit
    let priceDescription = document.createElement("p");
    priceDescription.textContent = product.price + " €";
    description.appendChild(priceDescription); //on ajoute l'enfant prix à la description dans le DOM

    //div parent pour les réglages (settings)
    let settings = document.createElement("div");
    settings.className = "cart__item__content__settings"; //className est utilisé au lieu de class à cause d'éventuels conflits avec le mot-clé class
    divContent.appendChild(settings); //divContent ajoute l'enfant settings dans le DOM

    //div pour les réglages de la quantité (settings quantity)
    let settingsQuantity = document.createElement("div");
    settingsQuantity.className = "cart__item__content__settings__quantity"; //className est utilisé au lieu de class à cause d'éventuels conflits avec le mot-clé class
    settings.appendChild(settingsQuantity); //divContent ajoute l'enfant settingsQuantity dans le DOM

    //Quantité du produit
    let quantityInCart = document.createElement("p");
    quantityInCart.textContent = "Qté : ";
    settingsQuantity.appendChild(quantityInCart);

    //Quantité du produit input
    let inputQuantity = document.createElement("input");
    inputQuantity.className = "itemQuantity"; //className est utilisé au lieu de class à cause d'éventuels conflits avec le mot-clé class
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("max", "100");
    inputQuantity.setAttribute("value", product.number);
    settingsQuantity.appendChild(inputQuantity);

    //div pour la suppression de la quantité du produit
    let divDelete = document.createElement("div");
    divDelete.className = "cart__item__content__settings__delete";
    settings.appendChild(divDelete);

    //suppression du produit
    let deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.textContent = "Supprimer";
    divDelete.appendChild(deleteItem);

}


//On crée une fonction qui récupère le formulaire saisi par l'utilisateur pour sa commande
function getForm() {
    //on récupère le formulaire saisi par l'utilisateur pour la commande
    let userForm = document.querySelector(".cart__order__form");
    //userForm.firstName
    //userForm.lastName
    //userForm.address
    //userForm.city
    //userForm.email

    //on crée les expressions régulières
    //pour la validation firstName, lastName et city
    let letterRegEx = new RegExp("^[a-zA-Z ,.'-]+$", "gm");

    //pour la validation adresse
    const addressRegEx = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+", "gm");

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
}

//on constitue un objet contact à partir des données du formulaire
let contactObj = {

}





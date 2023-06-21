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
console.log('LocalStorage ou panier'); //on affiche la variable getCart
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
        products = data;
        draw(data); //on appelle draw et on passe data en paramètre
    })
    .catch ((error) => {
        console.log(error);
    });
}


//let products = {};
let products = [];
//on appelle getProducts
getProducts();

//la fonction draw itère sur chaque élément de getCart 
//et recherche l'élément correspondant dans la liste de produits passée en paramètre (products)
function draw(products) {
    console.log('draw');
    console.log(products);
    let totalQuantity = 0; //on initialise la variable totalQuantity à 0
    let totalPrice = 0; //on initiaise la variable totalPrice à 0
    for(let i=0, i2= getCart.length; i<i2; i++)//on boucle les produits du localstorage sans recalculer systématiquement la longueur grâce à i2
    {
        let product = products.find( element => element._id == getCart[i].id ) //on stocke dans product le produit qu'on est allé cherché
        if(product) {
            product.color = getCart[i].color;
            product.number = getCart[i].number;
            drawProduct(product); // on appelle la fonction qui dessine le produit
            totalQuantity += product.number; // on ajoute la quantité de l'élément actuel à totalQuantity
            totalPrice += product.number * product.price;
        }
    }
    cartQuantity(totalQuantity); // on met à jour le nombre d'articles affichés dans le panier
    cartPrice(totalPrice); // on met à jour le prix total affiché dans le panier

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
    article.setAttribute("data-color", product.color);
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

     //Récupération de la quantité choisie par l'utilisateur
    let valueMax = parseInt(inputQuantity.max); //on convertit la valeur max en un entier
    let valueMin = parseInt(inputQuantity.min); //on convertit la valeur min en un entier 
    
    //Ajout d'un écouteur d'événement au changement de la quantité
    inputQuantity.addEventListener("input", function (event) { // l'écouteur se déclenche lorsqu'il y a un changement de quantité
        let newQuantity = parseInt(event.target.value); // on convertit la nouvelle quantité entrée par l'utilisateur en un entier
        let productId = article.getAttribute("data-id"); //on récupère l'identifiant du produit correspondant à l'élément HTML en utilisant l'attribut data-id de l'article parent
        let productColor = product.color;

        //Pour contrer les rigolos qui auraient passé autre chose, on vérifie si la nouvelle valeur n'est pas un nombre
        if( isNaN( parseInt(newQuantity) )) { 
            newQuantity = valueMin; //on convertit à min
        }
        else
        {
            //on recadre les valeurs si elles sont hors champs
            if( newQuantity < valueMin ) { newQuantity = valueMin }
            if( newQuantity > valueMax ) { newQuantity = valueMax }
        }

        //modification de la quantité du produit correspondant dans le panier
        let cartIndex = getCart.findIndex( (item) => item.id === productId && item.color === productColor ); //on recherche l'élément dont l'id et la color correspondent à ceux modifiés
        if (cartIndex > -1) { //si on trouve cet élément
            getCart[cartIndex].number = newQuantity; //on modifie sa propriété number avec la nouvelle quantité saisie par l'utilisateur
            localStorage.setItem("obj", JSON.stringify(getCart)); //on met à jour le localstorage avec la nouvelle valeur du panier en  utilisant setItem
            // on met à jour le prix total et la quantité totale affichés dans le panier
            let totalQuantity = 0;
            let totalPrice = 0;
            for (let i=0, i2= getCart.length; i<i2; i++) {
              const cartItem = getCart[i];
              const product = products.find((element) => element._id === cartItem.id);
              product.color = cartItem.color;
              product.number = cartItem.number;
              totalQuantity += product.number;
              totalPrice += product.number * product.price;
            }
            cartQuantity(totalQuantity);
            cartPrice(totalPrice);
          }
    });

    //div pour la suppression de la quantité du produit
    let divDelete = document.createElement("div");
    divDelete.className = "cart__item__content__settings__delete";
    settings.appendChild(divDelete);

    //suppression du produit
    let deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.textContent = "Supprimer";
    divDelete.appendChild(deleteItem);

    //on supprime le produit
    deleteItem.addEventListener("click", function(event) {
        console.log("clic sur le bouton de suppression d'un produit");
       
        //on trouve le produit à supprimer dans le DOM
        let parent = event.target.closest(".cart__item");

        //on supprime le produit du DOM
        parent.remove();

        //on trouve l'id et la couleur du produit à supprimer
        let deleteId = parent.dataset.id;
        console.log(deleteId);
        let deleteColor = parent.dataset.color;
        console.log(deleteColor);

        //on trouve l'indice du produit à supprimer dans le panier
        let productIndex = getCart.findIndex(itemToDelete => itemToDelete.id === deleteId && itemToDelete.color === deleteColor);
        console.log(productIndex);
        
        // Si l'article est dans le panier, on le supprime
        if (productIndex !== -1) {
            getCart.splice(productIndex, 1);
    
            //on met à jour le panier localStorage en  utilisant setItem
            localStorage.setItem("obj", JSON.stringify(getCart)); 
    
            //on met à jour le nombre d'articles dans le panier
            //on met à jour le prix total du panier
            let totalQuantity = 0;
            let totalPrice = 0;
            for(let i=0, i2= getCart.length; i<i2; i++) {
                let product = products.find( element => element._id == getCart[i].id )
                if(product) {
                    totalQuantity += getCart[i].number;
                    totalPrice += getCart[i].number * product.price;
                }
            }
            cartQuantity(totalQuantity); 
            cartPrice(totalPrice);   
        }
    });
     
}

//on calcule la quantité totale de produits dans le panier
function cartQuantity(totalQuantity) {
    console.log('Quantité totale au panier');
    console.log(totalQuantity);
    let elementQuantity = document.getElementById("totalQuantity");
    elementQuantity.textContent = totalQuantity;
}

//on calcule le prix total des produits dans le panier
function cartPrice(totalPrice) {
    console.log('Prix total');
    console.log(totalPrice);
    let elementPrice = document.getElementById("totalPrice");
    elementPrice.textContent = totalPrice;
}

//on crée les expressions régulières
//pour la validation firstName, lastName et city
const letterFirstNameRegEx = new RegExp(/^[a-zA-Z ,.'-]+$/, "g");

//pour la validation lastName
const letterLastNameRegEx = new RegExp(/^[a-zA-Z ,.'-]+$/, "g");

//pour la validation city
const letterCityRegEx = new RegExp(/^[a-zA-ZÀ-ÖØ-öø-ſ ,.'-]+$/, "g");

//pour la validation adresse
const addressRegEx = new RegExp(/^(?:\d{1,3}, )?[a-zA-ZÀ-ÖØ-öø-ſ0-9 ,.'-]+$/, "g");

//pour la validation email
const emailRegEx = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "g");

//on récupère le formulaire saisi par l'utilisateur pour la commande
const userForm = document.querySelector(".cart__order__form");

let testFirstName;
let testLastName;
let testAddress;
let testCity;
let testEmail;

//fonction validFirstName
function validFirstName(inputFirstName) {
    testFirstName = letterFirstNameRegEx.test(inputFirstName.value); //on vérifie s'il y a une correspondance entre ce que l'utilisateur a saisi et une expression régulière
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

    if(testFirstName){
        firstNameErrorMsg.textContent = "";
    }
    else{
        firstNameErrorMsg.textContent = "Veuillez renseigner un prénom valide";
    }
    console.log(testFirstName);
    return testFirstName;
}


//fonction validLastName
function validLastName(inputLastName) {
    testLastName = letterLastNameRegEx.test(inputLastName.value); //on vérifie s'il y a une correspondance entre ce que l'utilisateur a saisi et une expression régulière
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

    if (testLastName) {
        lastNameErrorMsg.textContent = "";
    }
    else{
        lastNameErrorMsg.textContent = "Veuillez renseigner un nom valide";
    }
    console.log(testLastName);
    return testLastName;
}


//fonction validAddress
function validAddress(inputAddress) {
    testAddress = addressRegEx.test(inputAddress.value); //on vérifie s'il y a une correspondance entre ce que l'utilisateur a saisi et une expression régulière
    let addressErrorMsg = document.getElementById("addressErrorMsg");

    if (testAddress) { //true
        addressErrorMsg.textContent = "";
    }
    else{ //false
        addressErrorMsg.textContent = "Veuillez renseigner une adresse valide";
    }
    console.log(testAddress);
    return testAddress;
}


//fonction validCity
function validCity(inputCity) {
    testCity = letterCityRegEx.test(inputCity.value); //on vérifie s'il y a une correspondance entre ce que l'utilisateur a saisi et une expression régulière
    let cityErrorMsg = document.getElementById("cityErrorMsg");

    if (testCity) { //true
        cityErrorMsg.textContent= "";
    }
    else { //false
        cityErrorMsg.textContent = "Veuillez renseigner une ville valide";
    }
    console.log(testCity);
    return testCity;
}


//fonction validEmail
function validEmail(inputEmail) {
    testEmail = emailRegEx.test(inputEmail.value); //on vérifie s'il y a une correspondance entre ce que l'utilisateur a saisi et une expression régulière
    let emailErrorMsg = document.getElementById("emailErrorMsg");

    if (testEmail) { //true
        emailErrorMsg.textContent = "";
    }
    else { //false
        emailErrorMsg.textContent = "Veuillez renseigner un email valide"
    }
    console.log(testEmail);
    return testEmail;
}

//fonction getForm
function getForm() {
    // Écouter la modification du prénom
    userForm.firstName.addEventListener("change", function() {
        //let isValidFirstName = validFirstName(userForm.firstName);
        //console.log(isValidFirstName); //on affiche la valeur retournée par validFirstName
        validFirstName(firstName);
    });

    // Écouter la modification du nom
    userForm.lastName.addEventListener("change", function() {
        //let isValidLastName = validLastName(userForm.lastName);
        //console.log(isValidLastName); //on affiche la valeur retournée par validLastName
        validLastName(lastName);
    });

    // Écouter la modification de l'adresse
    userForm.address.addEventListener("change", function() {
        //let isValidAddress = validAddress(userForm.address);
        //console.log(isValidAddress); //on affiche la valeur retournée par validAddress
        validAddress(address);
    });

    // Écouter la modification de la ville
    userForm.city.addEventListener("change", function() {
        //let isValidCity = validCity(userForm.city);
        //console.log(isValidCity);
        validCity(city);
    });

    // Écouter la modification de l'e-mail
    userForm.email.addEventListener("change", function() {
        //let isValidEmail = validEmail(userForm.email); //on affiche la valeur retournée par validEmail
        //console.log(isValidEmail);
        validEmail(email);
    });
}
getForm();

//on constitue un objet contact à partir des données du formulaire
function createContactObject() {
    
    //on récupère les valeurs des champs du formulaire
    let firstName = document.getElementById("firstName").value;
    console.log("prénom:", firstName);
    let lastName = document.getElementById("lastName").value; 
    console.log("nom:", lastName);
    let address = document.getElementById("address").value;
    console.log("adresse:", address);
    let city = document.getElementById("city").value;
    console.log("ville:", city);
    let email = document.getElementById("email").value;
    console.log("email:", email);

    //on crée un objet contact avec ces valeurs
    let contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    }

    console.log("contact:", contact); // ajout d'un console.log pour vérifier la valeur de contact

    //on retourne l'objet contact
    return contact; // cette instruction permet d'utiliser l'objet contact dans d'autres parties

}

function validateForm () {
    //on récupère l'object contact en utilisant la fonction createContactObject
    let contact = createContactObject();
    let html = ``;

    //if (contact == false)
    //{
    //    html += `<li>Pas bien...</li>`
    //}
    if (contact.firstName == false || testFirstName == false )
    {
        html += `Veuillez indiquer un prénom valide\n`
    }
    if (contact.lastName == false || testLastName == false )
    {
        html += `Veuillez indiquer un nom valide\n`
    }
    if (contact.address == false || testAddress == false )
    {
        html += `Veuillez indiquer une adresse valide\n`
    }
    if (contact.city == false || testCity == false )
    {
        html += `Veuillez indiquer une ville valide\n`
    }
    if (contact.email == false || testEmail == false )
    {
        html += `Veuillez indiquer une adresse email valide\n`
    }

    //if( html.length > 0 )
    //{
    //    html = `<ul>` + html + `</ul>`
    //}
    return html
}

//on constitue un tableau de produits
function createArrayProducts() {

    // on initialise le tableau d'identifiants de produits
    let ids = [];

    //on boucle les produits du localstorage sans recalculer systématiquement la longueur grâce à i2
    for(let i=0, i2=getCart.length; i<i2; i++) {
        let getOneProduct = products.find(element => element._id == getCart[i].id); // on stocke le produit trouvé dans getOneProduct
        if(getOneProduct){
            console.log("getOneProduct:", getOneProduct);
            ids.push(getOneProduct._id); //on pousse un tableau avec uniquement les identifiants des produits
        }
    }
    console.log("tableau de produits:", ids);
    return ids;

}

createArrayProducts();

//on crée la fonction postOrder
function postOrder() {
    let formOrder = document.getElementById("order");
    formOrder.addEventListener("click", function(event){
        //on empêche le comportement par défaut du formulaire
        event.preventDefault();
        console.log("clic sur le bouton commander !");

        let htmlErrors = validateForm();
        if( htmlErrors.length > 0 )
        {
            alert(htmlErrors);
            return false;
        }
        else {
            //let checkForm = validateForm();
            let contact = createContactObject();
            let ids = createArrayProducts();
    
            const order = {
                contact: contact,
                products: ids
            };
            console.log("order:", order);
            if(ids.length >= 1) {
                //on envoie une requête JSON contenant un objet de contact et un tableau de produits
                fetch("http://localhost:3000/api/products/order", {
                    method: 'POST',
                    headers: {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(order)
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    const orderId = response.orderId;
                    document.location.href=`./confirmation.html?id=${orderId}`;
                    localStorage.removeItem("obj");
                })
            } 
            else {
                alert("Veuillez sélectionner au moins un produit avant de commander");
            }
        }
    });        
}

postOrder();
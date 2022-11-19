// Récupération de l'id du produit ayant été cliqué sur la page principale

    const parsedUrl = new URL(window.location.href);
    const productId = parsedUrl.searchParams.get("id");
    console.log(productId);

//après avoir récupéré l'id, requêter l'API pour récupérer les détails du produit

async function getProductDetails () {
    const productDetails = await fetch (`http://localhost:3000/api/products/${productId}`, {
    method: 'GET',
    headers: {
      "Accept" : "application/json"
    }
    })
    .then ((resp) => resp.json())
    .then ((data) => {
        console.table(data);
        drawProduct(data);
    })
    .catch ((error) => {
        console.log(error);
    });
}

getProductDetails ();

//après avoir récupéré les détails du produit, insertion des détails du produit dans la page
//on dessine le produit
let drawProduct = function ( product )
{
        console.log(product)

        //image du produit
        const image = document.querySelector(".item__img"); //Récupération des sélecteurs css pour l'image
        const imageElement = document.createElement ("img");
        imageElement.src = product.imageUrl; //adresse URL de l'image
        imageElement.alt = product.altTxt; //texte alternatif de l'image
        image.appendChild(imageElement);

        //titre
        const title = document.getElementById("title"); //Récupération de l'élément titre
        title.textContent = product.name;

        //prix
        const price = document.getElementById("price"); //Récupération de l'élément prix
        price.textContent = product.price;

        //description
        const description = document.getElementById("description"); //Récupération de l'élément description
        description.textContent = product.description;

        //couleurs
        const colors = document.getElementById("colors"); //Récupération de l'élément couleurs qui prend différentes valeurs

        for (let i=0; i < product.colors.length; i++) {
            const colorElement = document.createElement("option");
            colorElement.setAttribute("value", product.colors[i]);
            colorElement.textContent = product.colors[i];
            colors.appendChild(colorElement);
        }
}

//Ajout au panier

//Récupération de l'élément sur lequel on veut détecter le clic
const buttonAddToCart = document.getElementById("addToCart"); 
//Ajout d'un écouteur d'événement au clic sur le boutton d'ajout au panier
buttonAddToCart.addEventListener("click", function(event){ //type d'événement que l'on écoute et fonction appelée lors du déclenchement de l'événement
    console.log(event)
});



//Récupération de l'input colors
const colorSelect = document.getElementById("colors");
//Récupération de la couleur choisie par l'utilisateur dans l'option couleurs
let colorValue = colorSelect.value;

//Récupération de l'input quantity
const quantitySelect = document.getElementById("quantity");
//Récupération de la quantité choisie par l'utilisateur
let quantityValue = quantitySelect.value; // valeur
let quantityValueMax = quantitySelect.max; // valeur max 
let quantityValueMin = quantitySelect.min; //valeur min 
//console.log(quantityValue);

//Création d'un objet qui récupère les paramètres pour l'envoyer dans le localStorage
let obj = {
    id: productId,
    color: colorValue,
    number: quantityValue,
}

//console.log(obj.id);

//transformation de l'objet en json
const valueObject = JSON.stringify(obj);

//stockage des informations dans le localStorage
window.localStorage.setItem("", valueObject);

//récupération des objets éventuellement stockés dans le localStorage
let objectLocalStorage = window.localStorage.getItem("obj")






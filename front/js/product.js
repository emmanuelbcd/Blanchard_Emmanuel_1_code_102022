// Récupération de l'id du produit ayant été cliqué sur la page principale

    const parsedUrl = new URL(window.location.href);
    const productId = parsedUrl.searchParams.get("id");
    console.log(productId);

//après avoir récupéré l'id, requêter l'API pour récupérer les détails du produit

function getProductDetails () {
    const productDetails = fetch (`http://localhost:3000/api/products/${productId}`, {
    method: 'GET',
    headers: {
      "Accept" : "application/json"
    }
    })
    .then ((resp) => resp.json())
    .then ((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log(error);
    });
}

getProductDetails ()


//Récupération des éléments du DOM
const image = document.querySelector(".item_img"); //Récupération des sélecteurs css pour l'image
const title = document.getElementById("#title"); //Récupération de l'élément titre
const price = document.getElementById("#price"); //Récupération de l'élément prix
const description = document.getElementById("#description"); //Récupération de l'élément description
const colors = document.getElementById("#colors"); //Récupération de l'élément couleurs qui prend différentes valeurs

//Création des éléments et remplissage du texte ou de la source de l'image



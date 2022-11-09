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
        title.innerText = product.name;

        //prix
        const price = document.getElementById("price"); //Récupération de l'élément prix
        price.innerText = product.price;

        //description
        const description = document.getElementById("description"); //Récupération de l'élément description
        description.innerText = product.description;

        //couleurs
        const colors = document.getElementById("colors"); //Récupération de l'élément couleurs qui prend différentes valeurs

        for (let i=0; i < product.colors.length; i++) {
            const colorElement = document.createElement("option");
            colorElement.setAttribute("value", product.colors[i]);
            colorElement.innerText = product.colors[i];
            colors.appendChild(colorElement);
        }
}







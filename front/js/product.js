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

//Récupération de l'élément sur lequel on veut détecter le clic
const buttonAddToCart = document.getElementById("addToCart"); 
//Ajout d'un écouteur d'événement au clic sur le boutton d'ajout au panier
buttonAddToCart.addEventListener("click", function(event){ //type d'événement que l'on écoute et fonction appelée lors du déclenchement de l'événement
    console.log(event)

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

    //Création d'un objet qui récupère les paramètres pour l'envoyer dans le localStorage (ObjectLocalStorage)
    let obj = {
        id: productId,
        color: colorValue,
        number: quantityValue,
    }
    console.log(obj);

    //Initialisation du LocalStorage
    //récupération de l'objet du localStorage (ObjectLocalStorage) grâce à getitem pour ajouter un nouvel objet
    let objectLocalStorage = JSON.parse( localStorage.getItem("obj") );

    //importation dans le localStorage (objectLocalStorage)
    if ( objectLocalStorage == null ) { // si le panier est vide
        objectLocalStorage = []; //création d'un array vide 
        objectLocalStorage.push(obj);//on push l'object dans l'array
        localStorage.setItem("obj", JSON.stringify(objectLocalStorage));
    
        console.table(objectLocalStorage);
    }
    else { // sinon le panier comporte déjà 1 objet
        let find = false ; //initialisation d'une variable avec false par défaut

        for (let product of objectLocalStorage) { //le localStorage est parcouru pour trouver
            //si l'id du product est égal à l'object choisi par l'utilisateur 
            //et la couleur du product est égale à l'object choisi par l'uiliisateur
            if (product.id === obj.id && product.color === obj.color) {
                product.totalNumber = obj.number + product.number;
            }
            //si le nombre total contenu dans le localStorage est supérieur au panier max (100)
            if (product.totalNumber > quantityValueMax) {
                product.totalNumber = quantityValueMax; //on recadre les valeurs
                alert ("Le panier comporte déjà 100 produits");
                localStorage.setItem("obj", JSON.stringify(objectLocalStorage));//mise à jour du localStorage
                find = true; //la condition est true
                console.table(objectLocalStorage);
            }
        }
        //
        if (find === false) {
            objectLocalStorage.push(obj); //on push l'object dans le localStorage
            localStorage.setItem("obj", JSON.stringify(objectLocalStorage));
            console.table(objectLocalStorage);
        }
    }
});


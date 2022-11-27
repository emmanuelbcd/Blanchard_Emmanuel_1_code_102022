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

    //Ajout de sécurité avec parseInt, on force la valeur en un entier
    obj.number = parseInt( document.getElementById("quantity").value )
    // Pour contrer les rigolos qui auraient passés autre chose, on vérifie.
    if( isNaN( parseInt(obj.number) ) )
    { 
        obj.number = quantityValueMin 
    }
    else
    {
        // On recadre les valeurs si elles sont hors champs
        if( obj.number > quantityValueMax ){ obj.number = quantityValueMax }
        if( obj.number < quantityValueMin ){ obj.number = quantityValueMin }
    }

    //enregistrement du nouvel objet dans le localStorage.
    function saveObject (cart) {
        //on enregistre dans le localStorage une valeur associée à une clé.
        //sérialisation JSON : on transforme un object complexe en une chaîne de caractères
        localStorage.setItem("obj", JSON.stringify(obj));
    }
    saveObject();

    //récupération de l'objet du localStorage (ObjectLocalStorage) grâce à getitem pour ajouter un nouvel objet
    //on récupère l'item qui porte la clé enregistrée : obj
    function getCart () {
        let cart = localStorage.getItem("obj");
        //importation dans le localStorage (objectLocalStorage) si le panier est vide
        if ( cart == null ) { // si le panier est vide
            cart = []; //création d'un array vide 
            //cart.push(obj);//on push l'object dans l'array
        }
        else { //sinon le panier comporte déjà un objet
            return JSON.parse(cart);
        }
        console.table(getCart);
    }
    
    function addToCart (obj) {
        let cart = getCart(); //on récupère l'object dans le localStorage
        let searchId = cart.find(element => element.id == obj.id);
        console.log(searchId); 
        if (searchId != undefined) {
            searchId.number++;
        }
        else {
            obj.number = 1;
            cart.push(obj); //on push l'oject dans l'array
            saveObject();
        }

        console.table(addToCart);
    }
    
    addToCart();
});


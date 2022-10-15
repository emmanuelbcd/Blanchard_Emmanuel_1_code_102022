//requêter l'Api pour lui demander l'ensemble des produits
//fetch('http://localhost:3000/api/products')
 // .then((response) => response.json())
  //.then((json) => console.log(json));

async function fetchProducts () {
  const r = await fetch('http://localhost:3000/api/products', {
    method: 'GET',
    headers: {
      "Accept": "application/json",
    }
  }
  )
    if (r.ok === true) {
      return r.json();
    }
    throw new Error('Impossible de contacter le serveur')
}

fetchProducts().then(products => console.log(products))

//récupérer la réponse émise

//Parcourir cette réponse pour insérer chaque élément dans la page d'accueil








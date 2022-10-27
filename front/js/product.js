// Récupération de l'id du produit ayant été cliqué sur la page principale
const parsedUrl = new URL(window.location.href);
console.log(parsedUrl.searchParams.get("id"));
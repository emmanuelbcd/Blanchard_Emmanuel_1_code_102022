
const orderId = document.getElementById("orderId"); //Récupération de l'élément du DOM
const parsedUrlOrder = new URL(window.location.href);
const UrlOrderId = parsedUrlOrder.searchParams.get("id");

orderId.textContent = UrlOrderId; //on assigne la valeur du numéro de commande à l'élément orderId

console.log("Order Id"); //on affiche le numéro de commande dans la console
console.log(UrlOrderId);
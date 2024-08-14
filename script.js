import menuArray from "./data.js";

const containerOrder = document.getElementById("container-order");
const paymentDetails = document.getElementById("payment-details");
let selectedItems = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  } else if (e.target.id === "complete-order-button") {
    handleCompleteOrderClick();
  } else if (e.target.id === "pay-button") {
    handlePayment();
  }
});

function handleAddClick(menuId) {
  const targetMenuObj = menuArray.find((menuItem) => menuItem.id == menuId);

  if (targetMenuObj) {
    selectedItems.push(targetMenuObj);
    renderOrder();
  }
}

function handleRemoveClick(menuId) {
  selectedItems = selectedItems.filter((menuItem) => menuItem.id != menuId);
  renderOrder();

  if (selectedItems.length === 0) {
    containerOrder.innerHTML = "";
    render();
  } else {
    renderOrder();
  }
}

function renderOrder() {
  let orderHtml = `
        <div class="order">
            <h2>Your order</h2>`;

  let totalPrice = 0;

  selectedItems.forEach((menuItem) => {
    totalPrice += menuItem.price;

    orderHtml += `
            <div class="order-item">
            <div class="order-item-added">
                <p>${menuItem.name}</p>
                <button data-remove="${menuItem.id}">remove</button>
            </div>
            <div class="order-price"> 
                <p>$${menuItem.price}</p>
            </div>
            </div>`;
  });

  orderHtml += `
            <div class="order-total">
                <p>Total price:</p>
                <p>$${totalPrice}</p>
            </div> 
            <button class="complete-order-button" id="complete-order-button">Complete order</button>    
            </div>`;

  containerOrder.innerHTML = orderHtml;
}

function handleCompleteOrderClick() {
  paymentDetails.classList.remove("hidden");
}

function handlePayment() {
  const customeName = document.getElementById("name").value;
  const cardNumber = document.getElementById("card-number").value;
  const CVV = document.getElementById("CVV").value;

  if (!customeName || !cardNumber || !CVV) {
    alert("Please fill in all payment details.");
    return;
  }

  paymentDetails.classList.add("hidden");

  containerOrder.innerHTML = `<div class="order-confirmation">
  <p class="confirmation-message">Your order is being processed...</p>
  </div>`;

  setTimeout(function () {
    containerOrder.innerHTML = `<div class="order-confirmation">
    <p class="confirmation-message">Order confirmed! Thank, ${customeName}. Your order is on its way!.</p>
    </div>`;
  }, 3000);
}

function getFeedHtml() {
  let feedHtml = "";

  menuArray.forEach(function (menuItem) {
    const { name, ingredients, id, price, emoji } = menuItem;

    feedHtml += `
    <div class="menu">
        <div class="menu-inner">
            <div class="item-emoji">${emoji}</div>
            <div class="menu-items">
                <p class="item-name">${name}</p>
                <p class="item-ingredients">${ingredients.join(", ")}</p>
                <p class="item-price">$${price}</p>
            </div>
        </div>
        <div class="add">
           <button class="item-add" data-add="${id}">+</button> 
        </div>
    </div>
        `;
  });

  return feedHtml;
}

function render() {
  document.getElementById("container").innerHTML = getFeedHtml();
}

render();

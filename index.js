// Utility function to set inner text
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// Update total cost and grand total
const totalCost = (id, playerPrice) => {
  const totalCostValue = parseInt(document.getElementById(id).innerText);
  const playerPriceValue = parseInt(playerPrice.replace(/[^0-9]/g, ''));
  const newTotal = totalCostValue + playerPriceValue;

  setInnerText('total-cost', newTotal);
  setInnerText('grand-total', newTotal);
};

// Update budget after selecting a player
const updateBudget = (playerPrice) => {
  const budgetValue = parseInt(document.getElementById('budget-id').innerText);
  const playerPriceValue = parseInt(playerPrice.replace(/[^0-9]/g, ''));
  const leftBudgetValue = budgetValue - playerPriceValue;

  if (leftBudgetValue < 0) {
    alert('Your budget has been finished');
    return;
  }

  setInnerText('budget-id', leftBudgetValue);
};

// Update cart count
const updateCart = () => {
  const cartValue = parseInt(document.getElementById('cart-id').innerText);
  const totalPlayers = [...document.getElementById('all-players').children].length;
  const updatedCart = cartValue + 1;

  if (updatedCart > totalPlayers) return;

  setInnerText('cart-id', updatedCart);
};

// Update remaining players
const updateLeftPlayer = (selectedCount) => {
  const totalPlayers = [...document.getElementById('all-players').children].length;
  const leftPlayers = totalPlayers - selectedCount;

  if (leftPlayers < 0) {
    alert('All players have been added');
    return;
  }

  setInnerText('left-player', leftPlayers);
};

// Apply coupon logic
const applyCoupon = () => {
  const couponInput = document.getElementById('couponInput').value.trim();
  const discountMessage = document.getElementById('discount-message');

  const coupons = {
    "mahbuba20": 20
  };

  if (coupons[couponInput]) {
    const discount = coupons[couponInput];
    const discountValue = discount / 100;
    const grandTotalValue = parseFloat(document.getElementById('grand-total').innerText);
    const discountedTotal = (grandTotalValue - (grandTotalValue * discountValue)).toFixed(2);

    setInnerText('grand-total', discountedTotal);
    discountMessage.innerText = `Coupon applied! You got ${discount}% off 🎉`;
    document.getElementById('couponInput').value = '';
  } else {
    discountMessage.innerHTML = `<span class="text-red-500 font-bold text-xl">X!</span> Invalid coupon code. Please try again.`;
  }
};

// Handle cart button clicks
const cartBtns = document.getElementsByClassName('cart-btn');
for (const cartBtn of cartBtns) {
  cartBtn.addEventListener('click', (e) => {
    const card = e.target.closest('.players'); // assuming each player is inside .player-card
    const playerName = card.querySelector('.player-name').innerText;
    const playerCategory = card.querySelector('.player-category').innerText;
    const playerPrice = card.querySelector('.player-price').innerText;

    const selectedPlayer = document.getElementById('selected-player');
    const playersSelect = [...selectedPlayer.children];

    // Create new row for selected player
    const selectedPlayerDetails = document.createElement('tbody');
    selectedPlayerDetails.innerHTML = `
      <tr class="border-b">
        <th class="py-2">${playerName}</th>
        <th class="py-2">${playerCategory}</th>
        <th class="py-2">${playerPrice}</th>
      </tr>
    `;
    selectedPlayer.appendChild(selectedPlayerDetails);

    // Update totals and limits
    totalCost('total-cost', playerPrice);
    updateBudget(playerPrice);
    updateCart();
    updateLeftPlayer(playersSelect.length + 1); // +1 because new player is just added
  });
}
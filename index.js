const cartBtns = document.getElementsByClassName('cart-btn')
for(const cartBtn of cartBtns){
 cartBtn.addEventListener('click', (e)=> {
//    console.log(e.target)
   const playerName = e.target.parentNode.childNodes[1].innerText
   const playerCategory = e.target.parentNode.childNodes[3].innerText
   const playerPrice = e.target.parentNode.childNodes[5].innerText
  console.log(playerName,playerPrice,playerCategory )
  const selectedPlayer = document.getElementById('selected-player')
  const selectedPlayerDetails = document.createElement('tbody')
 selectedPlayerDetails.innerHTML = ` <tr class="border-b">
            <th class="py-2">${playerName}</th>
            <th class="py-2">${playerCategory}</th>
            <th class="py-2">${playerPrice}</th>
          </tr>`
          selectedPlayer.appendChild(selectedPlayerDetails)
           totalCost('total-cost', playerPrice)
         
          // totalCost('grand-total', playerPrice)
          
 })   
}


const totalCost = (id, playerPrice) => {
 const totalCostElement = document.getElementById(id).innerText 
          const totalCostValue = parseInt(totalCostElement)
          const totalPrice = parseInt(playerPrice.replace(/[^0-9]/g, ''));

          const totalCost = totalCostValue + totalPrice
           setInnerText('total-cost', totalCost)
           setInnerText('grand-total', totalCost)
}

const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value

}

const applyCoupon = () => {
  const couponInput = document.getElementById('couponInput').value
  const discountMessage = document.getElementById('discount-message')
 
  // sample coupon ideas
  const coupons = {
   "mahbuba20":20
  }
  if(coupons[couponInput]){
    const discount = coupons[couponInput]
    console.log(discount)
    const discountValue = discount/100
    console.log(discountValue)
    const grandTotal = document.getElementById('grand-total').innerText
    const grandTotalValue = parseFloat(grandTotal)
    const grandTotalAfterDiscount = grandTotalValue - (grandTotalValue * discountValue);
   setInnerText('grand-total', grandTotalAfterDiscount)
    discountMessage.innerText = `coupon applied ! you got ${discount} % off`
    document.getElementById('couponInput').value = ''
  }
  else{
    discountMessage.innerHTML = `<span class="text-red-500 font-bold text-xl">X !</span>
     invalid coupon code please try again`
  }
}

// const getSelectedPlayerDetails = (e,index) => {
//  const player = e.target.parentNode.childrenSZS[index].innerText
//  return player
// }
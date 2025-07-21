export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
      //Shipping policy: if order is more than 100 dollars, shipping is free, else it is 10 dollars
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
      //Setting tax rate to 15%
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) + 
        Number(state.shippingPrice) + 
        Number(state.taxPrice)
      )
      localStorage.setItem('cart', JSON.stringify(state))

      return state
}
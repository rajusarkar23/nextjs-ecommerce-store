"use client"

localStorage.setItem("name", "John Doe.")

const name = localStorage.getItem("name")

const Cart = () => {
  return (
    <div>{name}</div>
  )
}

export default Cart
"use client"

import userDataStore from "@/store/userDataStore";

localStorage.setItem("name", "John Doe.")

const name = localStorage.getItem("name")

const Cart = () => {
  const { fullName, email, isLoggedIn, isLoading, isError } = userDataStore();
  return (
    <div>
      <div>{name}</div>
<div>
  <p>dvjhfjk</p>
<p>{fullName}</p>
</div>
    </div>
  )
}

export default Cart
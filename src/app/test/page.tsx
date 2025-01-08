import React from 'react'

const Test = () => {

    const li1 = [
       "apple", "orange", "banana"
    ]
    const price = [
        "121", "122", "123"
    ]

  return (
   <main className='flex'>
    <div>
        {li1.map((ite, index) => (
            <li key={index}>{ite}</li>
        ))}
    </div>
    <div>
        {price.map((item, index) => (
            <li key={index} className='list-none'>{item}</li>
        ))}
    </div>
   </main>
  )
}

export default Test
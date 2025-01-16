"use client"

import { useParams } from 'next/navigation'
import React from 'react'

const ProcessOrder = () => {

    const params = useParams()
    console.log(params);
    
  return (
    <div>ProcessOrder</div>
  )
}

export default ProcessOrder
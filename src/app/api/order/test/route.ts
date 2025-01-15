import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {selectedAddress, quantityValue} = await req.json()
   console.log(selectedAddress);
   
    console.log("q", quantityValue);
    
    
    
    return NextResponse.json({message: "received"})
}
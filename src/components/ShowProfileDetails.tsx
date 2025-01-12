"use client"

import userDataStore from "@/store/userDataStore"
import { Button } from "@nextui-org/button"

export default function ShowProfileDetails() {
    3
    const { email, fullName, userId } = userDataStore()
    return (
        <div className="flex justify-center items-center">
            <div className="bg-gray-100 w-[600px] px-6 mt-4 rounded shadow-lg py-3 hover:scale-105 transition-all">
                <div className="flex justify-between">
                    <div>
                        <label className="text-lg font-bold">Personal details</label>
                        <h1>Name: {fullName}</h1>
                        <h3>Email: {email}</h3>
                        <h3>Id: {userId}</h3>
                    </div>
                    <div>
                        <Button className="font-bold" color="primary">Edit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
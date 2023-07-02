import React, { useState } from 'react'
import axios from "axios"
import io from "socket.io-client";

const socket = io.connect(`http://localhost:3001`)

function AddCustomers() {

    const [customer, setCustomer] = useState({})

    function handleGetInput(e, inputName) {


        setCustomer({ ...customer, [inputName]: e.target.value })
    }

    console.log("customer:", customer)

    function handleSubmit(e) {
        e.preventDefault();

        socket.emit("join room", "allCustomers");

        socket.emit("added new user", { message: "added new user", room:"allCustomers"});
        // socket.emit("added new user", {message:'added new user'})
        axios.post(`http://localhost:3001/customer/create`, customer).then(res => console.log(res)).catch(err => console.log(err))
    }

    return (
        <div>

            <form onSubmit={handleSubmit} >

                <input type="text" placeholder="name" onChange={(e) => handleGetInput(e, "name")} />
                <input type="text" placeholder="age" onChange={(e) => handleGetInput(e, "age")} />
                <input type="text" placeholder="city" onChange={(e) => handleGetInput(e, "city")} />

                <input type="submit" value="add new customer" />

            </form>
        </div>
    )
}

export default AddCustomers
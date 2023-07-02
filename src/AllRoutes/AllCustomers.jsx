import React, { useEffect, useState } from 'react'
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect(`http://localhost:3001`)


function AllCustomers() {

    const [customerData, setCustomerData] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {

        const roomName = "allCustom";

        // Create a new Socket.IO instance for this component
        const newSocket = io.connect("http://localhost:3001");
    
        // Join the specific room
        newSocket.emit("join room", roomName);
    
        // Listen for the "customer database updated" event only in the specific room
        newSocket.on("customer database updated", (data) => {
          console.log("useEffect executed");
          axios.get(`http://localhost:3001/customer/getall`)
            .then(res => {
              setCustomerData(res.data);
              console.log(res);
            })
            .catch(err => console.log(err));
        });
    
        // Fetch the initial customer data
        axios.get(`http://localhost:3001/customer/getall`)
          .then(res => {
            setCustomerData(res.data);
            console.log(res);
          })
          .catch(err => console.log(err));
    
        setSocket(newSocket);

        axios.get(`http://localhost:3001/customer/getall`).then(res => { setCustomerData(res.data); console.log(res) }).catch(err => console.log(err));

        // socket.emit("join room", "allCustomers");
    }, []);

    return (
        <div>
            <table border="1px" >

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                    </tr>
                </thead>

                <tbody>
                    {customerData.map((customer, index) => <tr key={index + 1} >

                        <td>{customer.name}</td>
                        <td>{customer.age}</td>
                        <td>{customer.city}</td>
                    </tr>)}
                </tbody>

            </table>
        </div>
    )
}

export default AllCustomers
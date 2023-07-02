import React from 'react'
import {Link} from "react-router-dom"

function Home() {
  return (
    <div>
        <Link to="/add-customers" >Add Customers</Link>
        <Link to="/all-customers" >All Customers</Link>
    </div>
  )
}

export default Home
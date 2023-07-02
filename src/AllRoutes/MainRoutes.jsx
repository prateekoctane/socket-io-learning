import { Routes, Route} from "react-router-dom";
import AddCustomers from "./AddCustomers";
import Home from "./Home";
import AllCustomers from "./AllCustomers";


export function MainRoutes(){

    return <Routes>

        <Route path="/" element={ <Home /> } /> 
        <Route path="/add-customers" element={ <AddCustomers /> } />
        <Route path="/all-customers" element={ <AllCustomers /> } />
    </Routes>
}
import {Routes, Route} from "react-router-dom"

import { SingIn } from "../pages/SignIn"
import { SingUp } from "../pages/SignUp"


export function AuthRoutes(){
    return(
        <Routes>
            <Route path="/" element={<SingIn />}/>
            <Route path="/singup" element={<SingUp />}/>
            
        </Routes>
    )
}
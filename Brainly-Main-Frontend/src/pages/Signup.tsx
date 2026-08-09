import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp(){
    const usernameRef = useRef<any>(0);
    const passwordRef = useRef<any>(0);
    const navigate = useNavigate();

   async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        
       await axios.post(BACKEND_URL+"/api/v1/signup",{
           
                username,
                password
            
        })
        navigate("/signin");
        alert("You are Signed up!!")
    }
    return <div className="h-screen w-screen bg-gray-200 flex 
    justify-center items-center ">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input  refrences={usernameRef} placeholder="User Name"></Input>
            <Input refrences={passwordRef}placeholder="Password"></Input>
            <div className="flex justify-center">
            <Button onClick={signup} loading={false} variant="primary" text="Sign Up"></Button>
            </div>
        </div>

    </div>
}
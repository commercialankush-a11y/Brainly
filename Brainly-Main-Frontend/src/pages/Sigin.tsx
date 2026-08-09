import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export function SignIn(){
    const usernameRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);
      const navigate = useNavigate();
    
       async function signin(){
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
          
        const response =   await axios.post(BACKEND_URL+"/api/v1/signin",{
               
                    username,
                    password
                
            })
          const jwt =  response.data.token;
          localStorage.setItem("token",jwt);
          navigate("/dashboard")
            //redirect user
        }

    return <div className="h-screen w-screen bg-gray-200 flex 
    justify-center items-center ">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input refrences={usernameRef} placeholder="User Name"></Input>
            <Input refrences={passwordRef} placeholder="Password"></Input>
            <div className="flex justify-center">
            <Button onClick={signin} loading={false} variant="primary" text="Sign In"></Button>
            </div>
        </div>

    </div>
}
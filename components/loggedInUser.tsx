import { FC, useEffect, useState } from "react";
import UserDTO from "../models/dtos/UserDTO";
import Login from "../pages/login";
import SignInManager from "../services/signInManager";

export const LoggedInUser: FC<JSX.Element> = () => {
    const [username, setUsername] = useState<string | null>("");
    
    useEffect(() =>{
        async function UpdateUsername(){
           var user = await SignInManager.getInstance().getUser();

           let username = user?.username ?? null;

           setUsername(username);
        }

        UpdateUsername();
    });

    console.log(username);

    if(username != null && username != "")
    {
        return <div>Welcome {username}!</div>
    }
    return(
        <Login/>
    )
}
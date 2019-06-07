import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {getSimple} from "../../api/api.js";


export default function UserBox(() => {

    const [user, setUser] = useState(0);
    
    useEffect(() => {
        getSimple('/auth/status', function(err, data) {
            if(err){
                console.log("Error getting user status");
            }
            if(data.username){
                setUser({loggedin: true,
                         name: data.username});
            }
        })
    });
    
       
        const greeting = <span>Hello, {user.name}!</span>;
        
        return(
           <div id="userbox">
           {user.loggedin ? greeting : ''}
           {user.loggedin ? <a id="logout" href="/auth/logout">Logout</a> : <a href="/auth/login">Login</a>}
           </div>
        )
    }
});


                

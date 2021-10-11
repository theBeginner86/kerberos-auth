import React, {useState, useEffect} from 'react';
import {useHistory, Redirect} from 'react-router-dom';

import decryptMessages from "../../utils/decryptMessages";

import './profile-page.css';


function ProfilePage(props){

    const {isLogout, setIsLogout} = props;

    const history = useHistory();

    const [username, setUsername] = useState("");

    useState(() => {
        if(isLogout){
            const token = localStorage.getItem("token");
            const username = decryptMessages(token, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
            console.log(username);
    
            setUsername(username);
        } else {
            return <Redirect to ='/'/>
        }
    }, [username, isLogout]);

    return (
        <div className="content">
            <h1 className="heading-per-page">User Profile</h1>
            <div className="profile-content">
                <div className="main main-raised">
                    <div className="container profile" Style={"text-align: center; width: 40rem; margin: auto;"}>
                        <div className="name">
                            <h3 className="title">{username}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

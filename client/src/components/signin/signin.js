import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {signinExistingUser} from "../../api/userApi";
import './signin.css'

function SignIn(props) {

    console.log(props);
    const {setIsLogout, isLogout} = props;
    console.log(isLogout);
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signinResponse, setSigninResponse] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const userData = {
            email,
            password
        };

        try {
            const {data} = await signinExistingUser(userData);
            console.log("data: ", data)
            setSigninResponse(data);
            console.log("signinResponse: ", signinResponse);
            if(data.success){
                setIsLogout(false);
                localStorage.setItem("token", data.accessToken);
                console.log(history);
                history.push("/");
            }
        } catch(err) {
            setSigninResponse({message: err});
        }
    }

    return (
        
        <div className="content">
            <div className="signin-content">
                <div className="main main-raised">
                    <div className="container signin">
                    <div  className="signin-heading">
                        <h1 className="heading-per-page">Login</h1>
                    </div>
                        <form onSubmit={handleSubmit} className="signin-form">
                            <div className="input-values">
                                {
                                    (!signinResponse.success) ?  <div className="err-msg"><div className="msg">{signinResponse.message}</div></div> : <div className="err-msg"></div>
                                }
                                <div className="input">
                                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/> 
                                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                                </div>
                            </div>
                            <div className="submit-btn" Style={"margin-top: 1rem"}>
                                <button type="submit" className="submit-btn">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SignIn;

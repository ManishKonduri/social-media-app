import React, {useState} from 'react';
import {userLogin} from './../API/mongo';


function UserLogin(props) {

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const changeEmail = (e) => {
        var emailVal = e.target.value;
        setEmail(emailVal) 
    }

    const changePwd = (e) => {
        var pwdVal = e.target.value;
        setPwd(pwdVal)
    }

    const Login = async () => {

        let loginDetails = {
            email: email,
            pwd: pwd
        }

        let data = await userLogin(loginDetails);
        if(data.status == 201) {
            props.history.push({pathname: '/home', state: {userId: data.data.userId, name: data.data.name}});
            console.log(data.data.userId)
        }
        else {
            console.log("Failure")
        }

    } 

    return (
        <div>
            <form>
                <p>Enter Email:</p>
                <input 
                    type="text"
                    value={email}
                    onChange={changeEmail}
                />
                <p>Enter Password:</p>
                <input 
                    type="password"
                    value={pwd}
                    onChange={changePwd}
                />
                <br />
                <br />
                <input type="button" value="Login" onClick={Login}/>
            </form>
        </div>
    );

}

export default UserLogin
import React, {useState} from 'react';
// import UserLogin from './UserLogin';
import history from './../history';
import {userRegistration} from './../API/mongo';

function UserRegistration(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const changeName = (e) => {
        var nameVal = e.target.value;
        setName(nameVal)
    }

    const changeEmail = (e) => {
        var emailVal = e.target.value;
        setEmail(emailVal)
    }

    const changePwd = (e) => {
        var pwdVal = e.target.value;
        setPwd(pwdVal)
    }

    const Login = () => {
        props.history.push("/login")
    }

    const Register = async () => {
        const userDetails = {
            name: name,
            email: email,
            pwd: pwd
        }
        let data = await userRegistration(userDetails);
        if(data.status == 201) {
            console.log("Success");
        }
        else {
            console.log("Failure")
        }
    }

    return (
        <div>
            <form>
                <p>Enter your Name:</p>
                <input 
                    type='text'
                    value= {name}
                    onChange= {changeName}
                />

                <p>Enter your Email:</p>
                <input
                    type='text'
                    value={email}
                    onChange={changeEmail}
                />
                <p>Enter your Password:</p>
                <input 
                    type="password"
                    value={pwd} 
                    onChange={changePwd}
                /><br />
                <input 
                    type="button"
                    value="Register"
                    onClick={Register}
                />
            </form>
            <label>Already have an account? </label>
            <input type="button" value="Login" onClick={Login}></input>
        </div>
    );

}

export default UserRegistration;
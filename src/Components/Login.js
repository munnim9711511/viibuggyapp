
import { Button, LinearProgress, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { link } from "./ApiLink";
import logo from './img/logo.png';

export const Login = () => {
    const [loading, setloading] = useState(false);
    const[user,setuser] = useState('');
    const[password,setpassword] = useState('');
    var navigate = useNavigate();
    const login = (event) => {
        event.preventDefault();
        setloading(true);

        var data = {
            user:user,
            password:password
        }
        axios.post(`${link}v1/auth`,data).then((data)=>{

            sessionStorage.setItem("token", data.data.token);
            sessionStorage.setItem("roles", data.data.roles);
            sessionStorage.setItem("name", data.data.user);
     
        if (sessionStorage.getItem('roles') === "driver") {
            navigate("/driver-dash");
        }
        else{
           // console.log(data);
            navigate("/main/buggy-request");
        }
           

        },(err)=>{
            setloading(false);
            alert("Invalid user")
        })
 
    }
    return (
        <>
            <div className="container">
                <div className="row" style={{ marginTop: 150 }}>
                    <div className="col-md-4 container">
                        <form onSubmit={login}>

                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-md-12">
                                    <img src={logo} className="mx-auto d-block" style={{ width: 80 }}></img>
                                </div>
                            </div>
                            {
                                loading &&
                                <div className="row" style={{ marginTop: 10 }}>
                                    <div className="col-md-12">
                                        <LinearProgress color="secondary" />
                                    </div>
                                </div>
                            }

                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-md-12">
                                    <TextField fullWidth variant="outlined" value={user} onChange={e=>setuser(e.target.value)} required label='user'></TextField>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-md-12">
                                    <TextField fullWidth type={"password"} variant="outlined" value={password} onChange={e=>setpassword(e.target.value)} required label='password'></TextField>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-md-12">
                                    <Button type="submit" fullWidth variant="contained">login</Button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


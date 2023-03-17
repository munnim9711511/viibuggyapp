import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { link } from "./ApiLink";
import MapIcon from '@mui/icons-material/Map';
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment/moment";

export const DriverPage = () => {
    var token = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nav = useNavigate();
    const [request, setrequest] = useState([]);
    useEffect(() => {
        axios.get(`${link}v1/drver/${sessionStorage.getItem('name')}`,config).then((data) => {
           // console.log(data);
            setrequest(data.data);
        })
        
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h6>Request List</h6>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{textAlign:"left"}}>
                                        Date
                                    </th>
                                    <th style={{textAlign:"left"}}> 
                                        From
                                    </th>
                                    <th style={{textAlign:"left"}}>
                                        To
                                    </th>
                                    <th style={{textAlign:"left"}}>
                                        number
                                    </th>
                                    <th style={{textAlign:"left"}}>
                                        Payment
                                    </th>
                                    <th>
                                        Map
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    request &&
                                    request.map((data) => {
                                        return(
                                            <tr key={data.id}>
                                            <td style={{textAlign:"left"}}>
                                                {moment(data.dateTinDateTimeRequest).format('MMMM Do YYYY, h:mm:ss a') }
                                            </td>
                                            <td style={{textAlign:"left"}}>
                                                {data.from }
                                            </td>
                                            <td style={{textAlign:"left"}}>
                                                {data.to }
                                            </td>
                                            <td style={{textAlign:"left"}}>
                                                {data.number}
                                            </td>
                                            <td style={{textAlign:"left"}}>
                                                {data.paymentType}
                                            </td>
                                            <td style={{textAlign:"left"}}>
                                                <NavLink to={`/driver/${data.id}`}><MapIcon></MapIcon></NavLink>
                                            </td>
                                        </tr>
                                        )
                                   
                                    })
                                }


                            </tbody>
                        </table>

                    </Box>
                </div>
            </div>

        </>
    );
}


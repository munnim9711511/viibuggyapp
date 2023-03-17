import { Box, Button, Card, CardActions, CardContent, Modal, Typography } from "@mui/material";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { link } from "./ApiLink";
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import FlagIcon from '@mui/icons-material/Flag';
import AddLocationIcon from '@mui/icons-material/AddLocation';
export const Driver = () => {
    var token = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nav = useNavigate();
    let param = useParams();
    const AnyReactComponent = ({ text }) => <div style={{color:"maroon",fontWeight:"bolder"}}>{text}</div>;
    const [latF, setlatF] = useState(0);
    const [from,setfrom] = useState('');
    const [to,setto] = useState('');
    const [longF, setlongF] = useState(0);
    const [latE, setlatE] = useState(0);
    const [longE, setlongE] = useState(0);
    const [driverlat, setdriverlat] = useState(0);
    const [driverlong, setdriverlong] = useState(0);
    useEffect(() => {
       // console.log(param)
        axios.get(`${link}v1/booking/${param['id']}`,config).then((data) => {
          //  console.log(data);
            setlatE(Number.parseFloat(data.data.latitudeE))
            setlatF(Number.parseFloat(data.data.latitudeF))
            setlongF(Number.parseFloat(data.data.longitudeF))
            setlongE(Number.parseFloat(data.data.longitudeE))
            setfrom(data.data.from);
            setto(data.data.to);
        })
        navigator.geolocation.getCurrentPosition(function (position) {
           // console.log("Latitude is :", position.coords.latitude);

            setdriverlat(position.coords.latitude);



            setdriverlong(position.coords.longitude)


           // console.log("Longitude is :", position.coords.longitude);
        });
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(function (position) {
    
                setdriverlat(position.coords.latitude);
    
    
    
                setdriverlong(position.coords.longitude)
    
    
            }); 
        }, 2000);
    }, [])
    
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    const defaultProps = {

        center: {
            lat: 0,
            lng: 0
        },
        zoom: 17
    };
    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };
    return (
        <>
            <Card >
                <CardContent style={{ height: '100vh' }}>
                    <GoogleMapReact

                        bootstrapURLKeys={{ key: "AIzaSyBuEoAEoYevrgE0gs371dIuFS8AfHncRKY" }}
                        defaultCenter={defaultProps.center}
                        center={
                            {
                                lat: driverlat,
                                lng: driverlong
                            }
                        }
                        defaultZoom={defaultProps.zoom}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                        coordinates={true}
                    >
                        {
                            driverlat > 0 &&
                            <DirectionsBusFilledIcon lat={driverlat}
                                lng={driverlong} style={{ color: "maroon" }}>

                            </DirectionsBusFilledIcon>
                        }
                        {
                            latF > 0 &&
                          
                                <FlagIcon lat={latF} lng={longF} style={{ color: "maroon" }}>

                                </FlagIcon>
                             
                           


                        }
                        {latF > 0 &&
                               <AnyReactComponent
                               lat={latF + 0.00005}
                               lng={longF}
                               text={from}


                           />
                        }
  {
                            latE > 0 &&
                          
                                <AddLocationIcon lat={latE} lng={longE} style={{ color: "maroon" }}>

                                </AddLocationIcon>
                             
                           


                        }
                        {latE > 0 &&
                               <AnyReactComponent
                               lat={latE + 0.00005}
                               lng={longE}
                               text={to}


                           />
                        }
                    </GoogleMapReact>
                  
                </CardContent>

            </Card>
        </>
    );
}


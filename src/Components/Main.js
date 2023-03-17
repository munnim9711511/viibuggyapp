import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet, useNavigate } from "react-router-dom";
import CardTravelIcon from '@mui/icons-material/CardTravel';
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import DepartureBoardTwoToneIcon from '@mui/icons-material/DepartureBoardTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import HouseTwoToneIcon from '@mui/icons-material/HouseTwoTone';
import { useEffect, useState } from "react";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
export const MainDash = () => {
    let navigate = useNavigate();
    const [admin, setadmin] = useState(false);
    const [value, setValue] = useState(4);
    const nav = (v) => {
        console.log(value);
        switch (value) {
            case 4:
                navigate(`/main/buggy-request`)
                break;
            case 3:
                navigate(`/main/report`)
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem('roles') === "Admin") {
            setadmin(true);
        }
    }, [])
    return (
        <>
            <BottomNavigation style={{ backgroundColor: "#adb5bd" }}
                showLabels
                value={value}
            // onChange={(event, newValue) => {
            //     console.log(newValue)
            //     switch (newValue) {
            //         case 5:
            //             navigate(`/main/buggy-request`)
            //             break;
            //         case 4:
            //             navigate(`/main/report`)
            //             break;
            //         case 2:
            //             navigate(`/main/Vehicle`)
            //             break;
            //         case 1:
            //             navigate(`/main/setting`)
            //             break;
            //         case 3:
            //             navigate(`/main/address`)
            //             break;
            //         default:
            //             break;
            //     }
            //     setValue(newValue);
            // }}
            >
                <BottomNavigationAction style={{ color: "black" }} onClick={() => { sessionStorage.clear(); navigate(`/login`) }} label="Logout" icon={<ExitToAppTwoToneIcon />} />
                {
                    admin &&
                    <BottomNavigationAction style={{ color: "black" }} onClick={() => { navigate(`/main/setting`) }} label="Settings" icon={<SettingsTwoToneIcon />} />

                }
                <BottomNavigationAction style={{ color: "black" }} onClick={() => { navigate(`/main/Vehicle`) }} label="Vehicles" icon={<DirectionsCarTwoToneIcon />} />
                <BottomNavigationAction style={{ color: "black" }} onClick={() => { navigate(`/main/cash`) }} label="Cash" icon={<LocalAtmIcon />} />
                {/* <BottomNavigationAction style={{ color: "black" }} onClick={() => { navigate(`/main/card`) }} label="Card" icon={<CardTravelIcon />} /> */}
                <BottomNavigationAction style={{ color: "black" }} onClick={() => { navigate(`/main/address`) }} label="House" icon={<HouseTwoToneIcon />} />
                {/* <BottomNavigationAction style={{ color: "black" }} onClick={() => { navigate(`/main/report`) }}  label="Report" icon={<AssessmentTwoToneIcon />} /> */}
                <BottomNavigationAction style={{ color: "black" }} onClick={() => { navigate(`/main/buggy-request`) }} label="Booking" icon={<DepartureBoardTwoToneIcon />} />

            </BottomNavigation>
            <div className=" container-fluid">

                <div className="row">
                    <div className="col-md-12">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    );
}


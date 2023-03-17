import { Button, LinearProgress, MenuItem, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ElectricRickshawIcon from '@mui/icons-material/ElectricRickshaw';
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";
import { link } from "./ApiLink";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import ChaletTwoToneIcon from '@mui/icons-material/ChaletTwoTone';
import { useNavigate } from "react-router-dom";
export const AddressModal = (props) => {
    const[name,setname] = useState('');
    var token = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nav = useNavigate();
    const[latitude,setlatitude] = useState(0);
    const[longitude,setlongitude] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen1(false);
      };
    const [open1, setOpen1] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setloading] = useState(false);
    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
      const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const save = ()=>{
        setloading(true);
        var data = {
            name:name ,
            latitude:latitude,
            longitude:longitude

        }
        axios.post(`${link}v1/address`,data,config).then((data)=>{
            setloading(false);
            props.updateData();
            setOpen1(true);
            setname('');
            setlatitude(0);
            setlongitude(0)
        })
    }
    return (
        <>
 <Button style={{ float: "right", marginTop: 10 }} variant="outlined" onClick={handleOpen} endIcon={<ChaletTwoToneIcon></ChaletTwoToneIcon>}>New  </Button>
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ backgroundColor: "whitesmoke" }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new Place
                    </Typography>
                    {loading &&
                        <LinearProgress color="primary" />

                    }
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12">
                            <TextField fullWidth value={name} onChange={e=>setname(e.target.value)}  label="Name" variant="outlined" />

                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-6 col-sm-12">
                            <TextField type={"number"} value={latitude} onChange={e=>setlatitude(e.target.value)} label="latitude" variant="outlined" />

                        </div>
                        <div className="col-md-6 col-sm-12">
                            <TextField type={"number"} value = {longitude} onChange={e=>setlongitude(e.target.value)} label="longitude" variant="outlined" />

                        </div>
                
                    </div>
                    
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12">
                            <Button  onClick={save} fullWidth variant="contained" endIcon={<SaveIcon></SaveIcon>} >Save</Button>


                        </div>
                    </div>
                </Box>
            </Modal>
            <Snackbar
                open={open1}
                autoHideDuration={6000}
                onClose={handleClose1}
                message="Saved succesfully"
              
            />
        </>
      );
}
 

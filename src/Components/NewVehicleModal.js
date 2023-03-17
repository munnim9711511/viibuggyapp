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
import { useNavigate } from "react-router-dom";
export const NewVehi = () => {
    var token = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nav = useNavigate();
    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    let file = null;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setloading] = useState(false);
    const [reg, setreg] = useState('');
    const [capacity, setcapacity] = useState(0);
    const [consdition, setconsdition] = useState('');
    const [rate, setrate] = useState(0);
    const upload = () => {
        setloading(true);
        var formdata = new FormData();
        formdata.append("RegNumber", reg);
        formdata.append("Capacity", capacity);
        formdata.append("Status", consdition);
        formdata.append("Price", rate);
        formdata.append("Photo", file);
        axios.post(`${link}v1/buggy`, formdata,config).then((data) => {
            setloading(false);
            setOpen1(true);
        })
    }
    const [open1, setOpen1] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

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
    return (
        <>
            <Button style={{ float: "right", marginTop: 10 }} variant="outlined" onClick={handleOpen} endIcon={<ElectricRickshawIcon></ElectricRickshawIcon>}>Add  </Button>
            <Button style={{ float: "right", marginTop: 10 ,marginRight:5}} variant="outlined" onClick={handleOpen} endIcon={<ElectricRickshawIcon></ElectricRickshawIcon>}>Rate  </Button>
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ backgroundColor: "whitesmoke" }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new buggy
                    </Typography>
                    {loading &&
                        <LinearProgress color="primary" />

                    }
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-6">
                            <TextField fullWidth value={reg} onChange={e => setreg(e.target.value)} id="outlined-basic" label="Registration number" variant="outlined" />

                        </div>
                        <div className="col-md-6">
                            <TextField type={"number"}  fullWidth value={rate} onChange={e => setrate(e.target.value)} id="outlined-basic" label="Rate" variant="outlined" />

                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-6 col-sm-12">
                            <TextField value={capacity} onChange={e => setcapacity(e.target.value)} fullWidth type={"number"} id="outlined-basic" label="capacity" variant="outlined" />

                        </div>
                        <div className="col-md-6">
                            <TextField value={consdition} onChange={e => setconsdition(e.target.value)} fullWidth select id="outlined-basic" label="condition" variant="outlined" >
                                <MenuItem value={"Running"} >Running</MenuItem>
                                <MenuItem value={"Grounded"}>Grounded</MenuItem>
                                <MenuItem value={"Grounded for service"}>Grounded for service</MenuItem>
                            </TextField>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12">
                            <TextField onChange={e => file = e.target.files[0]} type={"file"} id="outlined-basic" label="photo" variant="outlined" />

                        </div>

                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12">
                            <Button onClick={upload} fullWidth variant="contained" endIcon={<SaveIcon></SaveIcon>} >Save</Button>


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


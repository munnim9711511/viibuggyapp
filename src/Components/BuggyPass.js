import { Box, Button, LinearProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import { link } from "./ApiLink";
import RouteIcon from '@mui/icons-material/Route';
import pdf from './img/route.pdf'
export const BuggyPass = () => {
let nav = useNavigate();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [loading, setloading] = useState(false);
    const [type, settype] = useState('');
    const [newpass, setnewpass] = useState(false);
    const [updatepass, setupdatepass] = useState(false);
    const [passtype, setpasstype] = useState('');
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [contact, setcontact] = useState('');
    const [serialnum, setserialnum] = useState('');
    const [idcard, setidcard] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setpasstype('');
        setname('');
        setidcard('');
        setaddress('');
        setcontact('');
        setOpen(false);
    }
    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => {
        setpasstype('');
        setname('');
        setidcard('');
        setaddress('');
        setcontact('');
        setOpen1(false)

    };
    const [submit, setsubmit] = useState(false);
    const [renew, setrenew] = useState(false);
    const [id, setid] = useState();
    const saveNewPass1 = () => {

        setloading(true)
        var data = {
            Type: passtype,
            Name: name,
            Idcard: idcard,
            Address: address,
            ContactNum: contact
        }
        axios.post(`${link}v1/card`, data).then((data) => {
            setOpen(false);
            setOpen1(true);
        });

    }
    const getinfo = () => {
        setloading(true);
        axios.get(`${link}v1/card/${serialnum}`).then((data) => {
          //  console.log(data);
            setpasstype(data.data.type)
            setname(data.data.name);
            setidcard(data.data.idcard);
            setaddress(data.data.address);
            setcontact(data.data.contactNum);
            setloading(false);
            setupdatepass(false);
            setnewpass(true);
            setid(data.data.id)
            setrenew(true)
        })
    }

    const update = () => {
        var data = {
            Type: passtype,
            Name: name,
            Idcard: idcard,
            Address: address,
            ContactNum: contact
        }

        axios.put(`${link}v1/card/renew/${id}`, data).then(() => {
            setOpen1(true);
        })
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                <Button size="small" variant="contained" style={{float:"right"}} target = "_blank" href={pdf}>Route</Button>

                    <Button size="small" variant="contained" style={{marginRight:5,float:"right"}} onClick={()=>nav(`/schedule`)}>Schedule</Button>
                    {/* <Button onClick={handleOpen} size="small" style={{ float:"right",  marginLeft: 5 }} variant='contained'> Pass</Button> */}
                </div>
            </div>



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>


                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Buggy Pass
                    </Typography>
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
                            <TextField select fullWidth variant="outlined" value={type} onChange={e => {
                                if (e.target.value === 'New buggy pass') {
                                    setnewpass(true);
                                    setupdatepass(false)
                                    setsubmit(true)
                                    setrenew(false)
                                }
                                else if (e.target.value === 'Renew buggy pass') {
                                    setnewpass(false);

                                    setupdatepass(true)
                                    setsubmit(false)
                                }
                                settype(e.target.value)
                            }} label="service type">
                                <MenuItem value={'New buggy pass'}>New buggy pass</MenuItem>
                                <MenuItem value={'Renew buggy pass'}>Renew buggy pass</MenuItem>
                            </TextField>
                        </div>
                    </div>
                    {newpass &&
                        <>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-md-12">
                                    <TextField select fullWidth variant="outlined" label="Pass types" value={passtype} onChange={e => setpasstype(e.target.value)}>
                                        <MenuItem value={'Daily Pass'}>Day Pass  10.00 MVR </MenuItem>
                                        <MenuItem value={'Weekly Pass'}>Weekly pass  40.00 MVR </MenuItem>
                                        <MenuItem value={'Weekend pass '}>Weekend pass  15.00 MVR</MenuItem>

                                        <MenuItem value={'Monthly pass '}>Monthly pass  150.00 MVR </MenuItem>

                                    </TextField>

                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-md-12">
                                    <TextField fullWidth variant="outlined" value={name} onChange={e => setname(e.target.value)} label="name">

                                    </TextField>

                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-md-12">
                                    <TextField fullWidth variant="outlined" value={idcard} onChange={e => setidcard(e.target.value)} label="idcard">

                                    </TextField>

                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-md-12">
                                    <TextField fullWidth variant="outlined" value={address} onChange={e => setaddress(e.target.value)} label="Address">

                                    </TextField>

                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-md-12">
                                    <TextField fullWidth variant="outlined" value={contact} onChange={e => setcontact(e.target.value)} label="contact number">

                                    </TextField>

                                </div>
                            </div>

                        </>

                    }
                    {
                        updatepass &&
                        <div className="row" style={{ marginTop: 10 }}>
                            <div className="col-md-6">
                                <TextField fullWidth variant="outlined" value={serialnum} onChange={e => setserialnum(e.target.value)} label="Serial number">

                                </TextField>

                            </div>
                            <div className="col-md-6">
                                <Button variant="contained" onClick={getinfo} fullWidth size="large" style={{ marginTop: 10 }}>Find</Button>

                            </div>
                        </div>
                    }


                    <div className="row" style={{ marginTop: 10 }}>
                        {
                            submit &&
                            <div className="col-md-12">
                                <Button onClick={saveNewPass1} variant="contained">Submit</Button>

                            </div>
                        }
                        {
                            renew &&
                            <div className="col-md-12">
                                <Button onClick={update} variant="contained">Renew</Button>

                            </div>
                        }

                    </div>


                </Box>
            </Modal>

            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>


                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        We have received your buggy pass request.A Notification sms will be send to you shortly .Thank you
                    </Typography>


                </Box>
            </Modal>
        </>
    );
}


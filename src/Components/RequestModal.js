import axios from "axios";
import { link } from "./ApiLink";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { LinearProgress, MenuItem, TextField } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const Request = (props) => {
    var token = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nav = useNavigate();
    const [address, setaddress] = useState([]);
    const [date, setdate] = useState('');
    const [cargopay, setcargopay] = useState(15);
    const [number, setnumber] = useState('');
    const [req, setreq] = useState('');
    const [paymenttype, setpaymenttype] = useState('');
    const [fromClientId, setfromClientId] = useState('');
    const [toClientId, settoClientId] = useState('');
    const [loading, setloading] = useState(false);
    useEffect(() => {
        axios.get(`${link}v1/address`, config).then((data) => {
           // console.log(data);
            setaddress(data.data);
        })
    }, [])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const book = () => {
        setloading(true);
        var data = {
            number: number,
            paymentType: paymenttype,
            slocation: Number.parseInt(fromClientId),
            elocation: Number.parseInt(toClientId),

            DateTinDateTimeRequest: date,
            Request: req
        }
        axios.post(`${link}v1/booking`, data, config).then((data) => {
            setloading(false);
            setnumber('');
            setfromClientId('');
            settoClientId('');
            setreq('');
            setdate('')
            setpaymenttype('');
            props.updateRequ();
            handleClose();

        })
    }
    const cagoDate = (dayChek) => {
        if (moment(dayChek).format("H") >= 0 && moment(dayChek).format("H") < 6) {

            setcargopay(20);
        }
        else {
            setcargopay(15);

        }
    }
    return (
        <>
            <div className='row' style={{ marginTop: 10 }}>
                <div className="col-md-12">
                    <Button onClick={handleOpen} variant="contained" style={{ float: "right" }}>Add Booking</Button>
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
                        Create a booking
                    </Typography>
                    {
                        loading &&
                        <div className="row" style={{ marginTop: 10, marginBottom: 20 }}>
                            <div className="col-md-12">
                                <LinearProgress color="secondary" />
                            </div>
                        </div>
                    }

                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12">
                            <TextField fullWidth select label="Pick up from" value={fromClientId} onChange={e => setfromClientId(e.target.value)}>
                                {
                                    address &&
                                    address.map((data) => {
                                        return (
                                            <MenuItem value={data.id} key={data.id}>{data.name}</MenuItem>
                                        )
                                    })
                                }
                            </TextField>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12">
                            <TextField fullWidth select label="Drop off" value={toClientId} onChange={e => settoClientId(e.target.value)}>
                                {
                                    address &&
                                    address.map((data) => {
                                        return (
                                            <MenuItem value={data.id} key={data.id}>{data.name}</MenuItem>
                                        )
                                    })
                                }
                            </TextField>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12">
                            <TextField fullWidth value={number} onChange={e => setnumber(e.target.value)} label="Number">

                            </TextField>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12">
                            <TextField fullWidth value={date} type={"datetime-local"} onChange={e => {
                                setdate(e.target.value)
                                cagoDate(e.target.value);

                            }} label="Date">

                            </TextField>
                        </div>
                    </div>
                    <div className='row' style={{ marginTop: 20 }} >
                        <div className='col'>
                            <TextField required style={{ textAlign: 'left' }} value={paymenttype} onChange={e => setpaymenttype(e.target.value)} label={"Payment type"} select fullWidth>
                                <MenuItem value={'Cash'}>
                                    Cash
                                </MenuItem>
                                <MenuItem value={'Transfer slip'}>
                                    Transfer slip
                                </MenuItem>
                                <MenuItem value={'Online payment'}>
                                    Online payment
                                </MenuItem>
                            </TextField>
                        </div>
                    </div>
                    <div className='row' style={{ marginTop: 20 }} >
                        <div className='col'>
                            <TextField required style={{ textAlign: 'left' }} value={req} onChange={e => setreq(e.target.value)} label={"Request buggy"} select fullWidth>
                                <MenuItem value={'4 seat buggy '}>
                                    4 seat buggy 6MVR
                                </MenuItem>
                                <MenuItem value={'6 seat buggy '}>
                                    6 seat buggy 10MVR
                                </MenuItem>
                                <MenuItem value={'12 seat buggy '}>
                                    12 seat buggy 15MVR
                                </MenuItem>
                                <MenuItem value={`Cargo Buggy ${cargopay}MVR`}>
                                    {`Cargo Buggy ${cargopay}MVR`}
                                </MenuItem>
                                <MenuItem value={'Ambulance'}>
                                    Ambulance
                                </MenuItem>
                            </TextField>
                        </div>
                    </div>
                    <div className='row' style={{ marginTop: 20 }} >
                        <div className='col'>
                            <Button variant="contained" onClick={book} fullWidth>Save</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
}


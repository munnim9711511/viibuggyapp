import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import { Badge, Box, Button, Card, CardContent, Checkbox, Divider, FormControlLabel, FormGroup, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Modal, Switch, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import BookIcon from '@mui/icons-material/Book';
import axios from 'axios';
import { link } from './ApiLink';
import logo from './img/logo.png'
import moment from 'moment/moment';
import { BuggyPass } from './BuggyPass';
import pdf from './img/route.pdf'
import { useNavigate } from 'react-router-dom';

export const Booking = () => {
    let nav = useNavigate();

    const [addressC, setaddressC] = useState([]);
    const [fromClient, setfromClient] = useState('');
    const [fromClientId, setfromClientId] = useState('');
    const [toClient, settoClient] = useState('');
    const [toClientId, settoClientId] = useState('');
    const [Address, setAddress] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => { };
    const handleClose = () => { setOpen(false); };
    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => { setOpen1(true) };
    const handleClose1 = () => { window.location.reload(); setOpen1(false); };
    const [oper, setoper] = useState('');
    const [cargopay, setcargopay] = useState('15.00')
    const [number, setnumber] = useState('');
    const [date, setdate] = useState(new Date().getFullYear());
    const [addressSerch, setaddressSerch] = useState('');
    const [addresslist, setaddresslist] = useState([]);
    const [loading, setloading] = useState(false);
    const [paymenttype, setpaymenttype] = useState('');
    const [buggyDetail, setbuggyDetail] = useState([]);
    const [buggyselected, setbuggyselected] = useState(0);
    const [sebuggy, setsebuggy] = useState(null);
    const [loadingb, setloadingb] = useState(false);
    const [request, setrequest] = useState([]);
    const [fsearch, setfsearch] = useState(false);
    const [tsearch, settsearch] = useState(false);
    const [validfrom, setvalidfrom] = useState(false);
    const [validto, setvalidto] = useState(false);
    useEffect(() => {

        axios.get(`${link}v1/address`).then((data) => {
            //  console.log(data);
            setaddressC(data.data);
        })

        // axios.get(`${link}v1/buggy`).then((data) => {

        //     console.log(data);
        //     setbuggyDetail(data.data);
        // })

    }, [])
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
    // const validate = (e) => {

    //     setloadingb(true);

    //     if (fromClientId.length <= 0) {
    //         setvalidfrom(true)
    //         setfromClient('');

    //     }
    //     else if (fromClientId.length > 0) {
    //         console.log(fromClientId.length)
    //         setvalidfrom(false)
    //     }
    //     if (toClientId.length <= 0) {
    //         setvalidto(true)

    //     }
    //     else if (toClientId.length > 0) {
    //         setvalidto(false)
    //     }
    //     setloadingb(false);
    //     e.preventDefault();
    // }
    const getAddress = (id, op) => {

        axios.get(`${link}v1/address/${id}`).then((data) => {
            //console.log(data)
            setaddressC(data.data);
            if (op == 'f') {
                setfsearch(true);

            }
            if (op === 't') {
                settsearch(true);
            }
            setloading(false)
        })


    }

    const valuetext = (value) => {
        return `${value}°C`;
    }


    const book = () => {
        handleClose();
        setloadingb(true);
        //console.log(request)
        let requ = '';
        for (const iterator of request) {
            requ += `${iterator},`;
        }


        var data = {
            number: number,
            paymentType: paymenttype,
            slocation: Number.parseInt(fromClientId),
            elocation: Number.parseInt(toClientId),
            BuggyDetailId: buggyselected,
            DateTinDateTimeRequest: date,
            Request: requ
        }
        axios.post(`${link}v1/booking`, data).then((data) => {

            setloadingb(false);
            handleOpen1();
        })

    }
    const update = (e) => {
        e.preventDefault(); setOpen(true)
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


            <div className="container" style={{ paddingRight: 20, paddingLeft: 20 }}>
                <form onSubmit={update}>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-6 col-sm-12 container">
                            <div className='row' >

                                <div className='col'>
                                    <img src={logo} className='mx-auto d-block' style={{ width: 207 }}></img>
                                </div>
                            </div>
                            <div className='row' style={{ marginTop: 20 }} >
                                <div className='col sm-4 col d-none  d-sm-block'>

                                    <h5 style={{ textAlign: "left" }}>For Booking / 7240505</h5>



                                </div>
                                <div className='col d-none  d-sm-block'>

                                    <Button size="small" variant="contained" style={{ float: "right" }} target="_blank" href={pdf}>Route</Button>

                                    <Button size="small" variant="contained" style={{ marginRight: 5, float: "right" }} onClick={() => nav(`/schedule`)}>Schedule</Button>
                                </div>
                            </div>
                            <div className='row  d-sm-block d-md-none'>
                                <div className='col-sm-12 '>
                                <h6 style={{ textAlign: "left" ,position:'relative',top:31}}>For Booking / 7240505</h6>
                                    <Button size="small" variant="contained" style={{ float: "right" }} target="_blank" href={pdf}>Route</Button>

                                    <Button size="small" variant="contained" style={{ marginRight: 5, float: "right" }} onClick={() => nav(`/schedule`)}>Schedule</Button>
                                </div>
                            </div>

                            {
                                loadingb &&
                                <div className='row' style={{ marginTop: 22 }}>
                                    <div className='col-sm-12'>
                                        <LinearProgress color="secondary" />
                                    </div>
                                </div>
                            }

                            <div className='row' style={{ marginTop: 10 }}>
                                <div className='col-md-12'>
                                    <Card style={{ borderRadius: 18 }}>
                                        <CardContent>
                                            <div className='row' style={{ marginBottom: 15 }}>
                                                <div className='col-md-12'>
                                                    {
                                                        validfrom &&
                                                        <Typography style={{ color: "maroon" }}>Please choose an address that is show below the input filed</Typography>

                                                    }
                                                    <TextField value={fromClient} onChange={e => {

                                                        setfromClient(e.target.value)
                                                        if (e.target.value.length >= 4) {
                                                            getAddress(e.target.value, 'f');
                                                        }
                                                        else {
                                                            setfsearch(false)
                                                        }


                                                    }

                                                    } label="Pickup From" required style={{ textAlign: 'left' }} fullWidth>

                                                    </TextField>

                                                </div>
                                                <div className='col-md-12' >
                                                    {
                                                        fsearch && addressC && addressC.map((data) => {
                                                            return (
                                                                <li style={{ listStyle: 'none', textAlign: 'left', backgroundColor: '#d3d3d394', margin: 10, padding: 6, borderRadius: 18 }} onClick={() => {

                                                                    setfromClientId(data.id);
                                                                    setfromClient(data.name);
                                                                    setfsearch(false);
                                                                }} key={data.id}>{data.name}</li>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className='row' style={{ marginBottom: 15 }}>
                                                <div className='col-md-12'>
                                                    {
                                                        validto &&
                                                        <Typography style={{ color: "maroon" }}>Please choose an address that is show below the input filed</Typography>

                                                    }
                                                    <TextField value={toClient} required onChange={e => {

                                                        settoClient(e.target.value)
                                                        if (e.target.value.length >= 4) {
                                                            getAddress(e.target.value, 't');
                                                        }
                                                        else {
                                                            settsearch(false)
                                                        }

                                                    }

                                                    } label="Drop Off" placeholder='select  from the dropdown ' style={{ textAlign: 'left' }} fullWidth>

                                                    </TextField>

                                                </div>
                                                <div className='col-md-12' >

                                                    {
                                                        tsearch && addressC && addressC.map((data) => {
                                                            return (
                                                                <li style={{ listStyle: 'none', textAlign: 'left', backgroundColor: '#d3d3d394', margin: 10, padding: 6, borderRadius: 18 }} onClick={() => {

                                                                    settoClientId(data.id);
                                                                    settoClient(data.name);
                                                                    settsearch(false);
                                                                }} key={data.id}>{data.name}</li>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className='row' style={{ marginBottom: 15 }}>
                                                <div className='col-md-12'>
                                                    <TextField label="Phone" required fullWidth value={number} onChange={e => setnumber(e.target.value)}>

                                                    </TextField>
                                                </div>

                                            </div>
                                            <div className='row' >
                                                <div className='col'>
                                                    <TextField label={"Time"} required value={date} onChange={e => {
                                                        // console.log(moment(date).format("H"))

                                                        setdate(e.target.value)
                                                        cagoDate(e.target.value)
                                                    }} type={"datetime-local"} fullWidth></TextField>
                                                </div>
                                            </div>
                                            <div className='row' style={{ marginTop: 20 }} >
                                                <div className='col'>
                                                    <TextField required style={{ textAlign: 'left' }} value={paymenttype} onChange={e => setpaymenttype(e.target.value)} label={"Payment Type"} select fullWidth>
                                                        <MenuItem value={'Cash '}>
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
                                                <div className='col-sm-12'>
                                                    <Typography style={{ float: 'left' }}>Requested for  </Typography>


                                                </div>
                                                {/* <div className='col-sm-12'>

                                                {
                                                    sebuggy &&
                                                    <img style={{ width: "25%", float: 'left' }}
                                                        src={sebuggy}
                                                    />
                                                }
                                            </div> */}
                                            </div>


                                            <FormGroup>
                                                <FormControlLabel value={'4 seat'} onChange={e => {

                                                    var array = [...request]; // make a separate copy of the array
                                                    var index = array.indexOf(e.target.value)
                                                    if (index < 0) {
                                                        setrequest(request => [...request, e.target.value]);
                                                    }
                                                    else {
                                                        if (index !== -1) {
                                                            array.splice(index, 1);
                                                            setrequest(array);
                                                        }
                                                    }
                                                    //  console.log(index)

                                                }} control={<Checkbox />} label="4 seat buggy 6.00 MVR" />
                                                <FormControlLabel value={'6 seat'} onChange={e => {

                                                    var array = [...request]; // make a separate copy of the array
                                                    var index = array.indexOf(e.target.value)
                                                    if (index < 0) {
                                                        setrequest(request => [...request, e.target.value]);
                                                    }
                                                    else {
                                                        if (index !== -1) {
                                                            array.splice(index, 1);
                                                            setrequest(array);
                                                        }
                                                    }
                                                }} control={<Checkbox />} label="6 seat buggy 10.00 MVR" />
                                                <FormControlLabel value={'12 seat'} onChange={e => {

                                                    var array = [...request]; // make a separate copy of the array
                                                    var index = array.indexOf(e.target.value)
                                                    if (index < 0) {
                                                        setrequest(request => [...request, e.target.value]);
                                                    }
                                                    else {
                                                        if (index !== -1) {
                                                            array.splice(index, 1);
                                                            setrequest(array);
                                                        }
                                                    }
                                                }} control={<Checkbox />} label="12 seat buggy 15.00 MVR" />
                                                <FormControlLabel value={`Cargo ${cargopay} MVR`} onChange={e => {


                                                    var array = [...request]; // make a separate copy of the array
                                                    var index = array.indexOf(e.target.value)
                                                    if (index < 0) {
                                                        setrequest(request => [...request, e.target.value]);
                                                    }
                                                    else {
                                                        if (index !== -1) {
                                                            array.splice(index, 1);
                                                            setrequest(array);
                                                        }
                                                    }
                                                }} control={<Checkbox />} label={`Cargo ${cargopay} MVR`} />

                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel label="Ambulance" value={`Ambulance`} onChange={e => {


                                                    var array = [...request]; // make a separate copy of the array
                                                    var index = array.indexOf(e.target.value)
                                                    if (index < 0) {
                                                        setrequest(request => [...request, e.target.value]);
                                                    }
                                                    else {
                                                        if (index !== -1) {
                                                            array.splice(index, 1);
                                                            setrequest(array);
                                                        }
                                                    }
                                                }} control={<Checkbox />} />

                                            </FormGroup>
                                            <div className='col-md-12' style={{ marginTop: 10 }}>
                                                <Button variant={'contained'} type={'submit'} endIcon={<BookIcon></BookIcon>} fullWidth>Book</Button>
                                            </div>
                                        </CardContent>

                                    </Card>
                                    <br></br>
                                </div>
                            </div>



                        </div>

                    </div>
                </form>


            </div >

            <Modal open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    {
                        loading &&
                        <div className='row' style={{ marginBottom: 20 }}>
                            <div className='col-md-12'>
                                <LinearProgress color="secondary" />
                            </div>
                        </div>
                    }

                    <div className='row'>
                        <div className='col-md-12'>
                            <table className='table table-striped'>
                                <tbody >
                                    <tr>
                                        <td>
                                            Pickup from
                                        </td>
                                        <td>
                                            {fromClientId != '' ? fromClient : <span style={{ color: "maroon" }}>
                                                Please choose an address that is show below the 'pickup from' input filed</span>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Drop off
                                        </td>
                                        <td>
                                            {toClientId != '' ? toClient : <span style={{ color: "maroon" }}>
                                                Please choose an address that is show below the 'Drop off' input filed</span>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Date
                                        </td>
                                        <td>
                                            {moment(date).format("MMM Do YYYY, h:mm a")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Contact number
                                        </td>
                                        <td>
                                            {number}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Payment Type
                                        </td>
                                        <td>
                                            {paymenttype}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Requested Buggy
                                        </td>
                                        <td>
                                            {
                                                request.length > 0 ?
                                                    request.map((data, id) => {
                                                        return (
                                                            <li key={id} >{data}</li>
                                                        )
                                                    }) : <span style={{ color: "maroon" }}>
                                                        Please choose required buggy type</span>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {
                        fromClientId != '' && toClientId != '' && request.length > 0 &&
                        <div className='row'>
                            <div className='col-md-12'>
                                <Button fullWidth variant='contained' onClick={book}>request</Button>
                            </div>
                        </div>
                    }


                </Box>
            </Modal>

            <Modal open={open1}
                onClose={handleClose1}
            >
                <Box sx={style}>


                    <div className='row'>
                        <h6>Your Request has been submitted. You will be receiving a confirmation message in a while. Thank You!</h6>

                    </div>


                </Box>
            </Modal>
        </>
    );
}


import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddressModal } from "./AddressModal";
import { link } from "./ApiLink";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import UpdateSharpIcon from '@mui/icons-material/UpdateSharp';
import { useNavigate } from "react-router-dom";
export const Address = () => {
    var token = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nav = useNavigate();
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const [lat, setlat] = useState(0);
    const [log, setlog] = useState(0);
    const [name, setname] = useState('');

    const [idnum, setidnum] = useState();

    const defaultProps = {

        center: {
            lat: 0,
            lng: 0
        },
        zoom: 17
    };
    useEffect(() => {

        axios.get(`${link}v1/Address`,config).then((data) => {
          //  console.log(data);
            setaddress(data.data);
        })
    }, []);
    const updateAddress = () => {
        axios.get(`${link}v1/Address`,config).then((data) => {
           // console.log(data);
            setaddress(data.data);
        })
    }
    const [address, setaddress] = useState([]);
    const delRecord = (id) => {
        var varify = window.confirm("delete record")
        if (varify === true) {
            axios.delete(`${link}v1/address/${id}`,config).then((data) => {
                axios.get(`${link}v1/Address`,config).then((data) => {
                  //  console.log(data);
                    setaddress(data.data);
                })
            })
        }
    }

    const update = () => {
        var data = {
            name: name,
            latitude: lat,
            longitude: log
        }
        axios.put(`${link}v1/address/${idnum}`, data,config).then((data) => {
            axios.get(`${link}v1/Address`).then((data) => {
              //  console.log(data);
                setaddress(data.data);
            })
        })
    }
    // const getAddress = (id) => {
    //     axios.get(`${link}v1/address/get-single-id/${id}`).then((data) => {
    //         console.log(data);
    //         setlat(Number.parseFloat(data.data.latitude));
    //         console.log(lat)
    //         setlog(Number.parseFloat(data.data.longitude));
    //         if (lat > 0) {
    //         handleOpen()

    //         }
    //     })
    // }
    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };
    const columns = [

        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            editable: false,


        },
        {
            field: 'name',
            headerName: 'Address',
            width: 150,
            editable: false,



        },
        {
            field: 'latitude',
            headerName: 'Latitude',
            width: 150,
            editable: false,

        },
        {
            field: 'longitude',
            headerName: 'Longitude',
            width: 150,
            editable: false,

        },
        {
            field: 'remove',
            headerName: 'More',
            width: 250,
            editable: false,
            renderCell: (params) =>
                <>
                    <Button variant="contained" style={{ marginRight: 5 }} onClick={() => delRecord(params.row.id)} color="primary" >
                        <DeleteForeverIcon></DeleteForeverIcon></Button>
                    <Button style={{ marginRight: 5 }} variant="contained" onClick={() => {
                        setlat(Number.parseFloat(params.row.latitude));
                        setlog(Number.parseFloat(params.row.longitude));
                        setname(params.row.name)
                        handleOpen();

                    }} color="info" ><InfoIcon></InfoIcon></Button>
                    <Button variant="contained" style={{ marginRight: 5 }} onClick={() => {
                        setname(params.row.name)
                        setlat(Number.parseFloat(params.row.latitude));
                        setlog(Number.parseFloat(params.row.longitude));
                        setidnum(Number.parseInt(params.row.id))
                        handleOpen1()
                    }} ><EditIcon></EditIcon></Button>

                </>

        },



    ]
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 550,

        bgcolor: 'whitesmoke',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <AddressModal updateData={updateAddress}></AddressModal>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                    <div style={{ marginTop: 20 }}>
                        {address &&
                            (address != null) ? <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid rowHeight={25} style={{ height: 700 }}
                                rows={address}
                                columns={columns}
                                pageSize={20}
                                rowsPerPageOptions={[15]}
                                checkboxSelection
                                disableSelectionOnClick
                                experimentalFeatures={{ newEditingApi: true }}

                            />

                        </Box> : ""


                        }
                    </div>



                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    {
                        lat > 0 && log > 0 &&
                        <>

                            <GoogleMapReact

                                bootstrapURLKeys={{ key: "AIzaSyBuEoAEoYevrgE0gs371dIuFS8AfHncRKY" }}
                                defaultCenter={defaultProps.center}
                                center={
                                    {
                                        lat: lat,
                                        lng: log
                                    }
                                }

                                defaultZoom={defaultProps.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                                coordinates={true}
                            >


                                <LocationOnIcon style={{ color: "maroon" }} lat={lat}
                                    lng={log} />

                                <AnyReactComponent
                                    lat={lat + 0.00002}
                                    lng={log}
                                    text={name}


                                />


                            </GoogleMapReact>



                        </>


                    }


                </Box>
            </Modal>

            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography gutterBottom={true} variant="h5">House</Typography>

                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12">
                            <TextField fullWidth label="address" value={name} onChange={e => setname(e.target.value)} ></TextField>

                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-6">
                            <TextField type={"number"} value={lat} onChange={e => setlat(e.target.value)} label="latitude"></TextField>

                        </div>
                        <div className="col-md-6">
                            <TextField type={"number"} value={log} onChange={e => setlog(e.target.value)} label="longitude"></TextField>

                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12">
                            <Button variant="outlined" onClick={update} endIcon={<UpdateSharpIcon></UpdateSharpIcon>}>update</Button>

                        </div>
                    </div>




                </Box>
            </Modal>
        </>
    );
}


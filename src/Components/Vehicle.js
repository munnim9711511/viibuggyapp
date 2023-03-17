import axios from "axios";
import { useEffect, useState } from "react";
import { link } from "./ApiLink";
import { NewVehi } from "./NewVehicleModal";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import { useNavigate } from "react-router-dom";
export const Vehicle = () => {
    var token = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nav = useNavigate();
    const [vehicle, setvehicle] = useState([]);
    useEffect(() => {
        axios.get(`${link}v1/buggy`,config).then((data) => {
          //  console.log(data);
            setvehicle(data.data);
        })
    }, []);
    const delRecord = (id)=>{
        var varify = window.confirm("Are you sure you want to delete");
        if (varify === true) {
            axios.delete(`${link}v1/buggy/${id}`,config).then((data)=>{
                axios.get(`${link}v1/buggy`).then((data) => {
                  //  console.log(data);
                    setvehicle(data.data);
                })
            })
        }
    }
    const columns = [

        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            editable: false,


        },
        {
            field: 'regNumber',
            headerName: 'Registry number',
            width: 150,
            editable: false,
         


        },
        {
            field: 'capacity',
            headerName: 'CVapacity',
            width: 150,
            editable: false,

        },
        {
            field: 'price',
            headerName: 'Rate',
            width: 150,
            editable: false,

        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            editable: false,

        },
      
        {
            field: 'regId',
            headerName: 'Delete',
            width: 150,
            editable: false,
            renderCell: (params) =>
            <>
            <Button variant="contained" onClick={()=>delRecord(params.row.regId)} color="primary" style={{marginRight:5}} ><DeleteForeverIcon></DeleteForeverIcon></Button>
            <Button variant="contained"  color="primary" ><ModeEditOutlineSharpIcon></ModeEditOutlineSharpIcon></Button>
             
            </>

        },
       

    ]

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <NewVehi></NewVehi>
                </div>
            </div>

            <div className="row">

                <div className="col-md-12">

                    <div style={{ marginTop: 20 }}>
                        {vehicle &&
                            (vehicle != null) ? <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid rowHeight={25} style={{ height: 700 }}
                                rows={vehicle}
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

        </>
    );
}


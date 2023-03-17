import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { link } from "./ApiLink";
import cardw from './img/card.jpeg'

export const DigitalCard = () => {
    let param = useParams();
    const [card, setcard] = useState();
    useEffect(() => {
        axios.get(`${link}v1/card/${param['id']}`).then((data) => {
           // console.log(data);
            setcard(data.data);
        })
    }, [])
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <img className="mx-auto d-block img-fluid" src={cardw}></img>
                    </div>
                </div>
                {
                    card &&
                    <>
                        <div className="row">
                            <div className="col-md-7 container">
                                <div className="row">
                                    <div className="col-md-4 col-sm-3">
                                       <h6 className="d-md-none d-lg-block" style={{position:"relative",top:-115,left:-107,color:"whitesmoke"}}>{card.name}</h6>
                                        <h6 className="d-sm-none d-md-block d-none d-sm-block " style={{position:"relative",top:-220,left:-94,color:"whitesmoke"}}>{card.name}</h6>

                                    </div>
                                    <div className="col-md-8 col-sm-8">
                                    <p style={{position:"relative",top:-235,right:-116,fontSize:10}}>SN:{card.serialNumber}</p>
                                        <p style={{position:"relative",top:-83,right:-116,fontSize:10}}>Valid till:{moment(card.edate).format("MMM Do YY") }</p>
                                        <h6 style={{position:"relative",top:-154,right:42,fontSize:10,color:"#7a226c",textAlign:"right"}}>{card.type}</h6>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }

            </div>
        </>
    );
}


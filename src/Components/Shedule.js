import logo from './img/logo.png'
export const Shedule = () => {
    return (
        <>
            <div className='container'>
                <div children="row" style={{marginTop:215}}>
                    <div className='col-sm-12'>
                        <img src={logo} className='img-fluid' style={{ width: 184 }}></img>
                        <h4>Schedule will be updated shortly</h4>
                    </div>
                </div>
            </div>
        </>
    );
}


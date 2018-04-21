import React from "react";

const Header = (props) => {
    return (
    <div className="container-fluid">
        <div className={['row', props.isLoggedIn ? 'tch-header' : 'tch-header-blue'].join(' ')}>
            <div className="col-sm-6">
                    <a className="tch-link" style={{fontSize: '2em' , color: 'white'}}><color className="tch-text-light">Course Scheduling</color></a>
            </div>
            <div className="col-sm-6">
                <p className="text-right">
                    {
                        props.isLoggedIn ? (
                        <span>สวัสดี! คุณ { props.name } &nbsp;&nbsp;&nbsp;<a href="/logout" style={{ padding: "1em" }} className="tch-link tch-link-light"><i className="fas fa-power-off"></i></a></span>
                        ) : '' 
                    }
                </p>
            </div>
        </div>
    </div>
    );
}

export default Header;
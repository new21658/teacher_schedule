import React from "react";

const Header = (props) => {
    return (
        <div className="container-fluid">
        <div className="row tch-header">
            <div className="col-sm-6">
                    <a className="tch-link" style={{fontSize: '2em' ,color: 'rgba(0, 0, 0, 0.5)'}}><color className="tch-text-light">Teacher</color> Schedules</a>
            </div>
            <div className="col-sm-6">
                <p className="text-right">
                    <span>สวัสดี! คุณ { props.name } &nbsp;&nbsp;&nbsp;<a href="/logout" style={{ padding: "1em" }} className="tch-link tch-link-light"><i className="fas fa-power-off"></i></a></span>
                </p>
            </div>
        </div>
    </div>
    );
}

export default Header;
import React, { component } from "react"

export default (props) => {

    
    return (
        <div className="row" style={{ marginBottom: "30px" }}>
            <h2 className="col-sm-12">ค้นหา</h2>
            <div className="col-sm-6">
                <select className="form-control">
                    <option value={-1}>กรุณาเลือกเทอม</option>
                </select>
            </div>
        </div>
    )

}
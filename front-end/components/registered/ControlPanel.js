import React, { component } from "react"

export default (props) => {

    const onChangeTerm = (evt) => {
        props.selectTerm(evt.target.value)
    }

    const mapTerms = props.terms.map((t, i) => (<option key={i} value={t.term_id}>{"ปี " + (parseInt(t.term_year)+543) + " เทอม " + t.term  }</option>))
    
    return (
        <div className="flex-box" style={{ marginTop: "50px", marginBottom: "30px", }}>
            <h2 className="col-sm-1">ค้นหา</h2>
            <div className="col-sm-4">
                <select onChange={onChangeTerm} className="input-lg form-control">
                        <option value={-1}>กรุณาเลือกเทอม</option>
                        { mapTerms }
                </select>
            </div>
            <style jsx>
                {
                    `
                    .flex-box {
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: center;
                    }

                    `
                }
            </style>
        </div>
    )

}
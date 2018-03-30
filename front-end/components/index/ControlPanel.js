
import { Grid, Row, Col, ControlLabel, FormGroup, FormControl } from "react-bootstrap";


const ControlPanel = (props) => {


    const terms = props.terms.map((term, i) => {
        return (
            <option key={i} value={term.term_id}>{"ปี " + term.term_year + " เทอม " + term.term}</option>
        );
    });

    // define functions
const selectTerm = (evt) => {
    console.log(evt.currentTarget.value);
    props.selectTerm(evt.currentTarget.value)
}
    
    return (
        <div className="tch-panel-control row">
                    {/* <div className="col-sm-1"><strong>ค้นหา</strong></div> */}
                    <div className="col-sm-6">
                        <select onChange={selectTerm} className="form-control">
                            <option value={-1}>กรุณาเลือกเทอม</option>
                            { terms }
                        </select>
                    </div>
                    {/* <div className="col-sm-1"><button className="btn btn-primary">ค้นหา</button></div> */}
                    <div className="col-sm-6 text-right">
                        <button onClick={props.toggleModal} className="btn btn-success">จองตาราง</button>
                    </div>
        </div>
    );

}

export default ControlPanel;
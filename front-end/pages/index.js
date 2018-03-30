import wrapper from "../components/Page";
import { Alert } from "react-bootstrap";
import axios from "axios";
import store from "../redux/store";
import { connect } from "react-redux";
import { receiveUser } from "../redux/actions/userAction";
import Schedule from "../containers/ScheduleContainer";

const Index = (props) => {
    console.log("Index' props", props)
    return (
                <div className="container">
                    <div className="row">
                        <Schedule />
                    </div>
                </div>
    );
}

export default wrapper(Index);
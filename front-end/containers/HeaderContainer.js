import { connect } from "react-redux";
import Header from "../components/Header";

const mapStateToProps = (state) => {
    return {
        name: state.user.full_name
    }
}

export default connect(mapStateToProps, null)(Header);
import ProfileContainer from "./ProfileContainer"
import { connect } from "react-redux";
import { getMe } from "../../../redux/usersSlice";

function mapDispatchToProps(dispatch) {
    return {
        getMe: () => dispatch(getMe()),
    };
}

function mapStateToProps(state) {
    return state.usersReducer.me;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

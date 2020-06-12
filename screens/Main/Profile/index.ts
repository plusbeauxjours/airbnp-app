import ProfileContainer from "./ProfileContainer"
import { connect } from "react-redux";

function mapStateToProps(state) {
    console.log(state.usersReducer.me)
    return state.usersReducer.me;
}

export default connect(mapStateToProps)(ProfileContainer);

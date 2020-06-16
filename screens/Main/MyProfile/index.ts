import MyProfileContainer from "./MyProfileContainer"
import { connect } from "react-redux";

function mapStateToProps(state) {
    return { uuid: state.usersReducer.uuid, me: state.usersReducer.me, };
}

export default connect(mapStateToProps)(MyProfileContainer);

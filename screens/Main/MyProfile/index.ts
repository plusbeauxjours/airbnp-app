import MyProfileContainer from "./MyProfileContainer"
import { connect } from "react-redux";
import { userLogout } from '../../../redux/usersSlice';

function mapDispatchToProps(dispatch) {
    return { userLogout: () => dispatch(userLogout()) }
}

function mapStateToProps(state) {
    return {
        uuid: state.usersReducer.uuid,
        me: state.usersReducer.me,
        token: state.usersReducer.token
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileContainer);

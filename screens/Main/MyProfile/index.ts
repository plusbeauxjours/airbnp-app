import MyProfileContainer from "./MyProfileContainer"
import { connect } from "react-redux";
import { getUser } from '../../../redux/usersSlice';

function mapDispatchToProps(dispatch) {
    return {
        getUser: (uuid) => dispatch(getUser(uuid))
    }
}
function mapStateToProps(state) {
    return { uuid: state.usersReducer.uuid, me: state.usersReducer.me, users: state.usersReducer.users };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileContainer);

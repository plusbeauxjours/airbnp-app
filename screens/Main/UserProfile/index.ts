import UserProfileContainer from "./UserProfileContainer"
import { connect } from "react-redux";
import { getUser } from '../../../redux/usersSlice';

function mapDispatchToProps(dispatch) {
    return {
        getUser: (uuid) => dispatch(getUser(uuid))
    }
}
function mapStateToProps(state) {
    return { users: state.usersReducer.users };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);

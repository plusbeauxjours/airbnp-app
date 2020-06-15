import RoomDetailContainer from "./RoomDetailContainer";
import { connect } from "react-redux";
import { toggleFavs } from '../../../redux/usersSlice';

function mapDispatchToProps(dispatch) {
    return {
        toggleFavs: (roomUuid, roomObj) => dispatch(toggleFavs(roomUuid, roomObj))
    }
}

function mapStateToProps(state) {
    return { favs: state.roomsReducer.favs };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailContainer);
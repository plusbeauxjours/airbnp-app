import ExploreContainer from "./ExploreContainer";
import { connect } from "react-redux";
import { getRooms, increasePage } from "../../../redux/roomsSlice";
import { getUser } from '../../../redux/usersSlice';

function mapDispatchToProps(dispatch) {
    return {
        getRooms: (page: number) => dispatch(getRooms(page)),
        getUser: (uuid: string) => dispatch(getUser(uuid)),
        increasePage: () => dispatch(increasePage())
    };
}

function mapStateToProps(state) {
    return state.roomsReducer.explore;
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);

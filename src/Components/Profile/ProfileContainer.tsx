import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUsersStatus, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {PhotosType} from "../../types/types";


type MapStateToProps = ReturnType<typeof mapStateToProps>
type MapDispatchToProps = {
    getUserProfile: (userId: number) => void,
    getUsersStatus: (userId: number) => void,
    updateStatus: () => void,
    savePhoto: () => void,
    saveProfile: () => void,
    photos: PhotosType,
    onPostChange: () => void
}
type PathParamsType = {
    router: any
}
type PropsType = MapDispatchToProps & MapStateToProps & PathParamsType

class ProfileContainer extends React.Component<PropsType> {

    constructor(props: PropsType) {
        super(props)
    }

    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
          userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId);
        this.props.getUsersStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }

    render() {

        return (
            <Profile {...this.props}
                     onPostChange={this.props.onPostChange}
                     saveProfile={this.props.saveProfile}
                     photos={this.props.photos}
                     isOwner={!this.props.router.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}/>
        )
    };
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp
}

export default compose(withRouter, connect(mapStateToProps, {
    getUserProfile,
    getUsersStatus,
    updateStatus,
    savePhoto
}))(ProfileContainer);

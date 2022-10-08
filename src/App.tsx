import './App.css';
import React, {Component, Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HeaderContainer from "./Components/Header/HeaderContainer";
import Navbar from "./Components/Navbar/Navbar";
import {UsersPage} from "./Components/Users/UsersContainer";
import Login from "./Components/Login/Login";
import {getAuthUserData} from "./redux/auth-reducer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./common/Preloader/Preloader";
import store from "./redux/redux-store";
import 'antd/dist/antd.css';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Layout,} from 'antd';

const {Footer} = Layout;
const DialogContainer = React.lazy(() => import ("./Components/Dialogs/DialogContainer"));
const ProfileContainer = React.lazy(() => import("./Components/Profile/ProfileContainer"));
const ChatPages = React.lazy(() => import("./pages/Chat/ChatPages"));

type MapPropsType = ReturnType<typeof mapToStateProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends Component<DispatchPropsType & MapPropsType> {
    render() {
        if (this.props.initialized) {
            return <Preloader/>;
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <Layout>
                    <Layout>
                        <Suspense fallback={<div><Preloader/></div>}>
                            <Routes>
                                <Route path='/profile/:userId'
                                       element={<ProfileContainer/>}/>
                                <Route path='/profile'
                                       element={<ProfileContainer/>}/>
                                <Route path='/dialogs'// @ts-ignore
                                       element={<DialogContainer
                                       />}/>
                                <Route path='/users'// @ts-ignore
                                       element={<UsersPage/>}/>
                                <Route path='/login'
                                       element={<Login/>}/>
                                <Route path='/chat'
                                       element={<ChatPages/>}/>
                            </Routes>
                        </Suspense>
                        <Footer/>
                    </Layout>
                </Layout>
            </div>
        );
    }

}

const mapToStateProps = (state) => ({
    initialized: state.app.initialized

});
let AppContainer = compose(connect(mapToStateProps, {getAuthUserData, initializeApp})(App));

export const MainApp: React.FC = () => {
    // @ts-ignore
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
};


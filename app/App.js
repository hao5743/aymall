import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import {Actions, Scene, Router} from 'react-native-router-flux';

import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import MovieMain from './movie/MovieMain'
import MovieDetail from './movie/MovieDetail';
import Actor from './movie/Actor';

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="Main" component={Main} title="菜单" hideNavBar={false} />
        <Scene key="MovieMain" component={MovieMain} title="电影" hideNavBar={false} />
        <Scene key="MovieDetail" component={MovieDetail} title="电影详情" hideNavBar={false} />
        <Scene key="Actor" component={Actor} title="影人" hideNavBar={false} />
        <Scene key="Login" component={Login} title="登录" hideNavBar={true}/>
        <Scene key="Signup" component={Signup} title="注册"  hideNavBar={false}/>
    </Scene>
);

export default class App extends Component {
    render() {
        return <Router scenes={scenes}/>
    }

}


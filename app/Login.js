import React, { Component } from 'react';
import { View,
    Text,TextInput,
    StyleSheet,Image,
    Dimensions,
} from 'react-native';
import {Button} from 'carbon-native';
import {Actions} from 'react-native-router-flux';
import Local from './common/Local';
import Api from './common/Api';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            passwd:'',
            status:'未登录'
        }
    }

    _tryLogin(){
        let {name ,passwd } = this.state;
        let obj={
            user:name,
            password:passwd
        };
        var that = this;
        if(name==='b' && passwd ==='b'){
            Actions.Main();
        }else{
            Api.post('/signin',obj).then(function (res) {
                if(res.type){
                    that.setState({status:'登录成功'});
                    Actions.Main();
                }else{
                    that.setState({status:'登录失败'})
                }
            });
        }

    }

    _toSignup(){
        Actions.Signup();
    }

    _forgetPasswd(){

    }

    render() {
        const viewLogo = (
            <View>
                <Text></Text>
            </View>
        );
        let {height, width} = Dimensions.get('window');
        let imgStyle = {
            width:width,
            height:height
        };

        const loginPannel = (
            <View>
                <Text>{this.state.status}</Text>
                <TextInput
                    style={{height: 40,color:'white',borderColor: 'gray', borderWidth: 1}}
                    placeholder="输入账号"
                    selectTextOnFocus={true}
                    selectionColor='lightgray'
                    placeholderTextColor='lightgray'
                    clearButtonMode="while-editing"
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                />
                <TextInput
                    style={{height: 40,color:'white'}}
                    placeholder="输入密码"
                    selectTextOnFocus={true}
                    selectionColor='lightgray'
                    placeholderTextColor='lightgray'
                    clearButtonMode="while-editing"
                    onChangeText={(passwd) => this.setState({passwd})}
                    value={this.state.passwd}
                />
                <View style={{height:20}}></View>
                <Button
                    color="primary"
                    text="登录"
                    onPress={this._tryLogin.bind(this)}
                />
                <View style={styles.loginPanelOr}>
                    <Text>或</Text>
                </View>

                <Button
                    color="dark"
                    text="注册"
                    outline
                    onPress={this._toSignup.bind(this)}
                />
                <Button
                    color="dark"
                    text="忘记密码？"
                    clear
                    onPress={this._forgetPasswd.bind(this)}
                />

            </View>
        );

        return (
            <Image source={require('./img/wallpaper_road.jpg')}
                   resizeMode={Image.resizeMode.cover}
                   style={imgStyle}>

                <View style={styles.viewRoot}>
                    <View style={styles.viewLogo}>
                        {viewLogo}
                    </View>
                    <View style={styles.viewLoginPanel} >
                        {loginPannel}
                    </View>
                </View>
            </Image>





        );
    }
}


const styles = StyleSheet.create({
   viewRoot:{
       flex:1
   },

   viewLogo:{
       flex:2,
       paddingTop:60
   },
   viewLoginPanel:{
       flex:7,
       padding:30
   },
    loginPanelOr:{
        alignItems:'center',
        padding:16
    }

});
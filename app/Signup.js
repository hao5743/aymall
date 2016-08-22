import React, { Component } from 'react';
import { View, Text,StyleSheet, TextInput } from 'react-native';
import {Button,H3} from 'carbon-native';
import {Actions} from 'react-native-router-flux';
import Api from './common/Api';

export default class Signup extends Component {

    _toLogin(){
        Actions.pop();
    }


    render() {
        return (
            <View style={styles.viewRoot}>
                <H3>在这里注册</H3>
                <Button
                    color="danger"
                    text="返回"
                    outline
                    onPress={this._toLogin.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
   viewRoot:{
       flex:1,
       padding:16,
       paddingTop:60
   }
});
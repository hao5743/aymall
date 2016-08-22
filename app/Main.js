import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Main extends Component {

    gotoMovie(){
        Actions.MovieMain();
    }

    render() {
        return (
            <View style={styles.viewRoot}>

                <Icon.Button name="ios-videocam-outline" backgroundColor="#3b5998" onPress={this.gotoMovie}>
                    去看电影
                </Icon.Button>
                <View style={{height:5}}></View>
                <Icon.Button name="ios-book-outline" backgroundColor="#B2DFEE" onPress={()=>{
                    this.gotoMovie();
                }}>
                    去看书
                </Icon.Button>
                <View style={{height:5}}></View>
                <Icon.Button name="ios-musical-notes-outline" backgroundColor="#FFD39B" onPress={this.gotoMovie}>
                    去听音乐
                </Icon.Button>

            </View>
        )
    }
}

const styles = StyleSheet.create({
   viewRoot:{
       marginTop:64,
       flex:1,
       justifyContent:'flex-start',
       alignItems:'stretch',
       padding:16
   }
});
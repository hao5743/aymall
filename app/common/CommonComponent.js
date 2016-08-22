import { View, Text,StyleSheet,ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
export class Loading extends Component{
    render(){
        const styles={
            centering: {
                alignItems: 'center',
                justifyContent: 'center'
            }
        };

        const animating = this.props.animating;
        const size = this.props.size || 'small';
        const color = this.props.color ||'gray';

        const loadingRender = ()=>{
            if(animating){
                return(
                    <ActivityIndicator
                        animating={animating}
                        size={size}
                        color={color}
                        style={[styles.centering]}
                    />
                )
            }else{
                return (
                    <View></View>
                )
            }
        }

        return (
            <View>
                {loadingRender()}
            </View>
        )

    }
}
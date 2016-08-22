import React, { Component } from 'react';
import { View, Text ,StyleSheet,ScrollView,Image,TouchableOpacity,InteractionManager} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {MovieData} from '../common/ApiData';
import {fetchActor} from '../actions/movie';
import {Loading} from '../common/CommonComponent';
import {connect} from 'react-redux';

export default class Actor extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        InteractionManager.runAfterInteractions(()=>{
            this.fetchActor();
        });
        // this.fetchActor();
    }

    fetchActor(){
        this.props.dispatch(fetchActor(this.props.aId));
    }

    render() {
        const styles = StyleSheet.create({
            viewRoot:{
                marginTop:64,
                flex:1,
                justifyContent:'flex-start',
                alignItems:'stretch',
                padding:16
            }
        });
        const actor = this.props.actor;
        const data = actor.actor;
        const renderView = ()=>{
            if(actor.fetching){
                return(
                    <View>
                        <Loading animating={true}/>
                    </View>
                )
            }else{
                return(
                    <View>
                        <Text onPress={this.fetchActor.bind(this)}>fetch actors</Text>
                        <ActorInfo data={data}/>
                        <Text>影视作品</Text>
                        <ActorWorks data={data.works} />
                        <Text>更多资料</Text>
                        <Text>{data.alt}</Text>
                    </View>
                )
            }

        };
        return(
            <ScrollView>
            <View style={styles.viewRoot}>
                {renderView()}
            </View>
            </ScrollView>
        )
    }
}


function select(state) {
    return {
        actor:state.actor
    }
}

export default connect(select)(Actor)

class ActorInfo extends Component{
    render(){
        const styles = StyleSheet.create({
            viewRoot:{
                flex:1,
                justifyContent:'flex-start',
                flexDirection:'row',
                padding:10,
                borderStyle:'solid',
                borderTopWidth:0.5,
                borderBottomWidth:0.5,
                borderColor:'lightgray'
            },
            viewInfo:{
                flex:5,
            },
            viewImg:{
                flex:4
            },
            img:{
                height:200,
                width:150
            },
            name:{
                fontSize:16
            },
            subName:{
                fontSize:16
            }
        });
        const data = this.props.data;
        return(
            <ScrollView>
            <View style={styles.viewRoot}>
                <View style={styles.viewInfo}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.subName}>{data.name_en}</Text>
                    <Text>{data.aka_en}</Text>
                    <Text>{data.aka.join(' / ')}</Text>
                    <Text>{data.gender} {' / '} {data.born_place}</Text>
                    <Text>id：{data.id}</Text>
                </View>
                <View style={styles.viewImg}>
                    <Image source={{uri:data.avatars.medium}} style={styles.img} />
                </View>

            </View>
            </ScrollView>
        )
    }
}

class ActorWorks extends Component{
    render(){
        const data = this.props.data;
        const styles={
            viewRoot:{
                flex:1,
                padding:8,
                flexDirection:'row',
                justifyContent:'flex-start',
                alignItems:'stretch',
                borderStyle:'solid',
                borderTopWidth:0.5,
                borderBottomWidth:0.5,
                borderColor:'lightgray'
            }
        };

        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.viewRoot}>
                    {data.map((e,index)=>{
                        return(
                            <Work data={e.subject} key={index}/>
                        )
                    })}
                </View>
            </ScrollView>
        )
    }
}

class Work extends Component{
    render(){
        const data = this.props.data;
        const styles = {
            viewRoot:{
                flex:1,
                justifyContent:'flex-start',
                alignItems:'stretch',
                padding:5,
            },
            viewImg:{
                flex:7,
                alignItems:'center'
            },
            viewName:{
                flex:3,
                alignItems:'center'
            },
            img:{
                height:190,
                width:140
            },
            name:{
                textAlign:'center',
                fontSize:14,
                width:130
            }
        };
        const img = {uri:data.images.large};
        return (
            <View style={styles.viewRoot}>
                <TouchableOpacity onPress={()=>{
                    Actions.MovieDetail({mId:data.id});
                }} >
                    <View style={styles.viewImage}>
                        <Image source={img} style={styles.img} />
                    </View>
                    <View style={styles.viewName}>
                        <Text style={styles.name} >
                            {data.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
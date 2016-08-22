import React, { Component } from 'react';
import { View, Text,StyleSheet,ListView,TouchableOpacity,Image,ActivityIndicator,InteractionManager } from 'react-native';
import {Button} from 'carbon-native';
import {MovieData} from '../common/ApiData'
import {Loading} from '../common/CommonComponent';
import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';
import {fetchMovieLists} from '../actions/movie'

export default class MovieMain extends Component {
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.count = 1;
    };

    componentWillMount(){
        InteractionManager.runAfterInteractions(()=>{
            this.fetchMovies();
        });

    }

    fetchMovies(){
        this.props.dispatch(fetchMovieLists());
    }

    renderRow(rowData){
        return (
            <TouchableOpacity onPress={()=>{
                Actions.MovieDetail({mId:rowData.id, mTitle:rowData.title});
            }} >
                <MovieItem data={rowData}/>
            </TouchableOpacity>
        )
    }


    render() {
        const {movie} = this.props;
        const dsMovies = this.ds.cloneWithRows(movie.movies);
        const {fetching} = movie;
        console.log(this.count++,'render movieMain');

        return (
            <View style={styles.viewRoot}>
                <Loading animating={fetching}/>
                <Text onPress={this.fetchMovies.bind(this)}>fetch movie</Text>
                <ListView
                    showsVerticalScrollIndicator={false}
                    dataSource={dsMovies}
                    renderRow={this.renderRow}
                />
            </View>
        )
    }
}


function select(state) {
    return {
        movie:state.movie
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(MovieMain)


class MovieItem extends Component{
    render(){
        const styles = {
            viewRoot:{
                flex:1,
                padding:10,
                flexDirection:'row',
                justifyContent:'flex-start',
                borderStyle:'solid',
                borderTopWidth:0.5,
                borderBottomWidth:0.5,
                borderColor:'lightgray'
            },
            viewImage:{
                flex:4
            },
            viewContent:{
                flex:6,
                flexDirection:'column',
            },
            image:{
                height:140,
                width:100
            },
            title:{
                fontSize:20,
                fontFamily:'Helvetica',
                fontWeight:'bold'
            },
            originTitle:{
                fontSize:18,
                fontFamily:'Helvetica',
                fontWeight:'bold'
            },
            rating:{
                fontStyle: 'italic'
            }
        };
        const data = this.props.data;
        const img = {uri:data.images.medium};
        return(
            <View style={styles.viewRoot}>
                <View style={styles.viewImage}>
                    <Image source={img} style={styles.image} />
                </View>
                <View style={styles.viewContent}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.originTitle}>{data.original_title}</Text>
                    <Text style={styles.rating}>{data.rating.average}分</Text>
                    <Text>{data.genres.join('/')}（{data.year}）</Text>
                    <Text>{data.casts.map(e=>e.name).join('/')}</Text>

                </View>
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
import React, { Component } from 'react';
import { View, Text ,StyleSheet,ScrollView,Image,TouchableOpacity,InteractionManager} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Loading} from '../common/CommonComponent';
import {fetchMovie} from '../actions/movie'
import {connect} from 'react-redux';

export default class MovieDetail extends Component {

    constructor(props){
        super(props);
        this.count=1;
    }
    componentWillMount(){
        console.log('detail will mount');
        InteractionManager.runAfterInteractions(()=>{
            this.fetchMovie();
        });

    }

    fetchMovie(){
        this.props.dispatch(fetchMovie(this.props.mId));
    }


    render() {
        const {fetching, movie} = this.props.movie;
        const data = movie;
        const styles = StyleSheet.create({
            viewRoot:{
                marginTop:64,
                flex:1,
                justifyContent:'flex-start',
                alignItems:'stretch',
                padding:16
            },
            viewTitle:{

            },
            title:{
                fontSize:20,
                fontFamily:'Helvetica',
                fontWeight:'bold',
                textAlign:'center'
            },
            originTitle:{
                fontSize:18,
                fontFamily:'Helvetica',
                fontWeight:'bold',
                textAlign:'center'
            },
            viewSummary:{
                padding:6,
                borderStyle:'solid',
                borderTopWidth:0.5,
                borderBottomWidth:0.5,
                borderColor:'lightgray',
            },
            summary:{
            }
        });
        const viewTitle = (
          <View style={styles.viewTitle}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.originTitle}>{data.original_title}</Text>
          </View>
        );
        const viewInfo = (
              <View style={styles.viewInfo}>
                  <MovieInfo data={data}/>
              </View>
          );
        // <Directors data={data.directors}/>
        const viewSummary = (
            <View style={styles.viewSummary}>
                <Text style={styles.summary}>{data.summary}</Text>
            </View>
        );
        const render = ()=>{
            console.log('movie in movieDetail render',data)
          if(fetching){
              return(
                  <View>
                      <Loading animating={fetching}/>
                  </View>
              )
          }else{
              return(
                 <View>
                      {viewTitle}
                      {viewInfo}
                      <Text>影人</Text>
                      <Directors
                          data={data.directors.map(e=>Object.assign({},e,{director:true})).concat(data.casts)}
                      />
                      <Text>剧情介绍</Text>
                      {viewSummary}
                      <Text>更多资料</Text>
                      <Text>{data.alt}</Text>
                  </View>
              )
          }
        };
        return (
            <ScrollView>
                <View style={styles.viewRoot}>
                    <Text onPress={this.fetchMovie.bind(this)}>fetch movie</Text>
                {render()}
                </View>
            </ScrollView>
        )
    }
}

function select(state) {
    return {
        movie:state.movieDetail
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(MovieDetail)

class MovieInfo extends Component{
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
                flex:5,
                flexDirection:'column',
            },
            image:{
                height:210,
                width:125
            },

            rating:{
                fontStyle: 'italic'
            }
        };
        const data = this.props.data;
        const img = {uri:data.images.large};
        return(
            <View style={styles.viewRoot}>
                <View style={styles.viewImage}>
                    <Image source={img} style={styles.image} />
                </View>
                <View style={styles.viewContent}>
                        <Text style={styles.rating}>{data.rating.average}分{' / '}{data.ratings_count}人评分</Text>
                        <Text>{data.genres.join('/')}</Text>
                        <Text>{data.countries.join(' / ')}（{data.year}上映）</Text>
                        <Text>导演：{data.directors.map((e)=>e.name).join(' / ')}</Text>
                        <Text>主演：{data.casts.map((e)=>e.name).join(' / ')}</Text>
                        <Text>别名：{data.aka.join(' / ')}</Text>
                        <Text style={styles.rating}>{data.collect_count}人收藏</Text>
                        <Text style={styles.rating}>{data.comments_count}人评论</Text>
                </View>
            </View>
        )
    }
}

class Directors extends Component{
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
              // borderTopWidth:0.5,
              borderBottomWidth:0.5,
              borderColor:'lightgray'
          }
        };

        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.viewRoot}>
                    {data.map((e)=>{
                        return(
                            <Avator data={e} key={e.id}/>
                        )
                    })}
                </View>
            </ScrollView>
        )
    }
}

class Avator extends Component{

    render(){
        const data = this.props.data;
        const styles = {
          viewRoot:{
              flex:1,
              justifyContent:'flex-start',
              alignItems:'stretch',
              padding:8
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
              height:130,
              width:95
            },
            name:{
                textAlign:'center',
                fontSize:14
            },
            director:{
                fontSize:13,
                color:'gray'
            }
        };
        const director = data.director?'（导演）':'';
        const img = {uri:data.avatars.medium};
        return (
            <View style={styles.viewRoot}>
                <TouchableOpacity onPress={()=>{
                        Actions.Actor({aId:data.id});
                    }} >
                    <View style={styles.viewImage}>
                        <Image source={img} style={styles.img} />
                    </View>
                    <View style={styles.viewName}>
                        <Text style={styles.name} >
                            {data.name}
                            <Text style={styles.director}>{director}</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
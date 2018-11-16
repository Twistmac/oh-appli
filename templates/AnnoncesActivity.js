import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  ListView,
  ScrollView,
  TouchableHighOpacity,
  TouchableHighlight,
  Animated, BackHandler, DeviceEventEmitter, Alert
}
from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import Masonry from 'react-native-masonry';
import {
  MenuProvider,
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
// import {
//   RefresherListView
// } from 'react-native-refresher';
import style from '../Styles/Style';
import {Container, Content, Header, Icon, Left, Button, Title, Item, Input,Card, CardItem, Body} from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {LoginScreen, DetailsScreen, AjoutAdsScreen, CommentairesScreen, detailsAnnoncesSyndicScreen} from '../route/ScreenName';
import Headers from '../header/Headers';
import Footers from '../footer/Footers';
import Fab from '../footer/Fab';
import {getAnnonces, getAnnoncesSyndic} from './services/Services';
import Slideshow from 'react-native-slideshow';


const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const HEADER_HEIGHT = 55;
const BOX_SIZE = (Dimensions.get('window').width / 2) - 12;
const width = Dimensions.get('window').width;
const _format = 'MMMM  DD';

// const dataHorizontal = [
//   {
//     imageUrl: "1532090428_annonce.png",
//     title: "1000"
//   },
//   {
//     imageUrl: "1532102640_annonce.jpg",
//     title: "1000"
//   },
//   {
//     imageUrl: "1532090428_annonce.png",
//     title: "1000"
//   },
//   {
//     imageUrl: "1532090463_annonce.jpg",
//     title: "1000"
//   },
//   {
//     imageUrl: "1532090428_annonce.png",
//     title: "1000"
//   },
//   {
//     imageUrl: "image_463215.png",
//     title: "1000"
//   }
// ];

export default class Annonces extends Component {
  constructor(props) {
    super(props);
    this.filterData = this.filterData.bind(this);
    this.backPressSubscriptions = new Set()
    this.state = {
       dataHorizontal: [],
       positionSlide:1,
       interval: null,
       viewport: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        },
      activeSlide:0,

      visibleSpinner: false,
      refreshing: false,
      categorieTitre:'All',
        dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2 }),
        annonces:[],
        icon:'ios-heart-outline',
        icon1:'ios-heart',
        touchableHighlightMouseDown:true,
        scrollAnim: new Animated.Value(0),
        offsetAnim: new Animated.Value(0),
    };
  };


  static navigationOptions = {
    drawerIcon:(
        <Icon name = "ios-list-box" style ={{color:'#152a45', fontSize:26}} />
      )
  };


    componentWillMount() {
      
      this.setState({
        interval: setInterval(() => {
          this.setState({
            positionSlide: this.state.positionSlide === this.state.dataHorizontal.length ? 0 : this.state.positionSlide + 1
          });
        }, 5000)
      });
    }

    componentWillUnmount() {
      DeviceEventEmitter.removeAllListeners('hardwareBackPress')
          this.backPressSubscriptions.clear()
    this.state.scrollAnim.removeListener(this._handleScroll);

    //
    clearInterval(this.state.interval);
    
    }

    handleHardwareBack = () => { 
             Alert.alert(
                '',
                "Fermer l'application?",
                [
                    {text: 'Annuler', onPress: () => console.log('reset'), style: 'cancel'},
                    {text: 'Quitter', onPress: () => BackHandler.exitApp()},
                ],
                { cancelable: false });

            return true;
       }

    componentDidMount(){
      DeviceEventEmitter.removeAllListeners('hardwareBackPress')
          DeviceEventEmitter.addListener('hardwareBackPress', () => {
            let invokeDefault = true
            const subscriptions = []

            this.backPressSubscriptions.forEach(sub => subscriptions.push(sub))

            for (let i = 0; i < subscriptions.reverse().length; i += 1) {
              if (subscriptions[i]()) {
                invokeDefault = false
                break
              }
            }

            if (invokeDefault) {
              BackHandler.exitApp()
            }
          })

          this.backPressSubscriptions.add(this.handleHardwareBack)

      this.state.scrollAnim.addListener(this._handleScroll);
      this.setState({
          visibleSpinner: true,
      })
      getAnnoncesSyndic(global.id).then((data) => {
        //console.warn(data);
        const dataSlide = [];
        for(var i=0; i<data.length; i++){
          dataSlide.push({
              url: "https://ohome.easywebmobile.fr/public/img/annonces/"+data[i]["image"],
              title: data[i]["titre"],
              caption: data[i]["created_at"],
              id: data[i]["id"]
          });
        }
        this.setState({ 
          dataHorizontal : dataSlide
        
        })
        //console.warn(data);
      })

      getAnnonces(global.id).then((data) => {
        //console.warn(data);
        this.setState({ 
          dataSource:this.state.dataSource.cloneWithRows(data),
          annonces:data
        })
        this.setState({
          visibleSpinner: false,
        })
      })
    }

   

    _handleScroll = ({ value }) => {
      this._previousScrollvalue = this._currentScrollValue;
      this._currentScrollValue = value;
    };

    _handleScrollEndDrag = () => {
      this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 250);
    };

    _handleMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
    };

    _handleMomentumScrollEnd = () => {
      const previous = this._previousScrollvalue;
      const current = this._currentScrollValue;
      
      if (previous > current || current < HEADER_HEIGHT) {
        // User scrolled down or scroll amount was too less, lets snap back our header
        Animated.spring(this.state.offsetAnim, {
          toValue: -current,
          tension: 300,
          friction: 35,
        }).start();
      } else {
        Animated.timing(this.state.offsetAnim, {
          toValue: 0,
          duration: 500,
        }).start();
      }
    };

    _renderDate(data){
      const currentDate = moment(new Date()).format(_format);
      const getDate = moment(data.created_at).format(_format);
      if (currentDate === getDate) {
        return(
            <Text style ={{color:'#FFF', bottom:0, position:'absolute'}} numberOfLines={1}>{moment(data.created_at).format('HH:mm')}</Text>
          )
      }
      return(
            <Text style ={{color:'#FFF', bottom:0, position:'absolute'}} numberOfLines={1}>{moment(data.created_at).format(_format, 'en')}</Text>
        )
    }

    _renderCorner(type){
      if (type === 'o') {
        return(
          <View style ={{position:'absolute',top:10, right:0}}>
             <Image 
             style = {styles.imgetiquette} 
             source={require('../img/cornerO.png')}
             resizeMode="cover"
            />
          </View>
          );
      }else if(type === 'p'){
        return(
          <View style ={{position:'absolute',top:10, right:0}}>
             <Image 
             style = {styles.imgetiquette} 
             source={require('../img/cornerP.png')}
             resizeMode="cover"
            />
          </View>
          );
      }else{
        return(
          <View />
          );
      }
      
    }

    _renderListView(data, rowId, sectionID){
      const img = 'https://ohome.easywebmobile.fr/public/img/annonces/'+data.image;
      // const imgLocal = '../img/image_7.jpg';
      const height = Math.floor(Math.random() * 10) + 200 ;
       return(
        <View style ={{backgroundColor:'transparent', flex:1}} >
         <View style={[styles.card, {flex:1, backgroundColor:'transparent'} ]}>
         <TouchableOpacity style = {{flex:3}}
          onPress = {this.detailsAnnonces.bind(this, this.state.annonces[sectionID], sectionID)}>
          <Image 
            style = {styles.img}
            source = {{uri:img}}
            resizeMode="cover"
           />
           {/*<Image source ={require(imgLocal)} />*/}
          </TouchableOpacity>
         </View>

         <View style ={styles.cardTextTitre} >
            <Text style ={{color:'#152a45', textAlign:'center', fontSize:15, fontWeight:'400'}} numberOfLines={3}>{data.titre}</Text>
         </View>

         <View style ={styles.cardTextFoot} >
           <View style ={{width:'60%'}}>
              <Text style ={{color:'#FFF'}} numberOfLines={1}>{data.categorie}</Text>
              {this._renderDate(data)}
           </View>

           <View style ={{width:'40%', alignItems:'center'}}>
              <Text style ={{color:'#FFF', bottom:0, position:'absolute', fontSize:18, fontWeight:'bold', color:'#f5d017'}} numberOfLines={1}></Text>
              <Text style ={{color:'#FFF', bottom:-2, position:'absolute', fontSize:18, right:10, fontWeight:'bold', color:'#f5d017'}} numberOfLines={1}>{data.prix} €</Text>
           </View>
         </View>
          <TouchableHighlight
                          style = {{
                          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                          width: 50,
                          height: 50,
                          position:'absolute',
                          bottom:50,
                          right:10,
                          zIndex:1,
                          backgroundColor:'rgba(0, 0, 0, 0.111)',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                         underlayColor = '#f5d017'>
              <Icon style={{color:'#FFF'}} name={this.state.icon1} />
             </TouchableHighlight>
             <View style ={{position:'absolute',bottom:45, right:20, justifyContent: 'center', alignItems: 'center'}}>
                <Text style ={{color:'#FFF', textAlign:'center' }} >{data.nb_like}</Text>
             </View>
             {this._renderCorner(data.type)}
        </View>
       )
     }

     // like(index){
     //  var newArray = this.state.annonces.slice(0);
     //  // console.warn(newArray)
     //  newArray[index] = {
     //    id:newArray[index].id,
     //    titre:newArray[index].titre,
     //    prix:newArray[index].prix,
     //    categorie:newArray[index].categorie,
     //    created_at:newArray[index].created_at,
     //    image:newArray[index].image,
     //    description:newArray[index].description,
     //    like:newArray[index].like == false ? true : false,
     //  };
     //  this.state.annonces = newArray;
     //  let newDataSource = this.state.dataSource.cloneWithRows(newArray);
     //  this.setState({dataSource:newDataSource})
     // }

     updateData(data, sectionID){
       var newArray = this.state.annonces.slice(0);
      // console.warn(data.like);
      newArray[sectionID] = {
        id:newArray[sectionID].id,
        titre:newArray[sectionID].titre,
        prix:newArray[sectionID].prix,
        categorie:newArray[sectionID].categorie,
        created_at:newArray[sectionID].created_at,
        image:newArray[sectionID].image,
        description:newArray[sectionID].description,
        like:newArray[sectionID].like == data.like,
      };
      this.state.annonces = newArray;
      let newDataSource = this.state.dataSource.cloneWithRows(newArray);
      this.setState({dataSource:newDataSource})
      // this.like(sectionID)
      // console.warn(sectionID);
     }

     detailsAnnonces(params, sectionID){
      const {navigation} = this.props;
      navigation.navigate(DetailsScreen, {params:params, updateData:this.updateData.bind(this),sectionID:sectionID} )
     }

     _refreshControl(){
       return (
         <RefreshControl
           tintColor="#ff0000"
           title="Loading..."
           titleColor="#00ff00"
           colors={['#ff0000', '#00ff00', '#0000ff']}
           progressBackgroundColor="#ffff00"
           refreshing={this.state.refreshing}
           onRefresh={()=>this._refreshListView()} />
       )
     };

     filterData(value){
      this.setState({
        categorieTitre:value
      })
        this.SearchFilterFunction(value)
     }

     SearchFilterFunction(text){
      if (text === 'All') {
        this.setState({
             dataSource: this.state.dataSource.cloneWithRows(this.state.annonces),
         })
      }else{
         const newData = this.state.annonces.filter(function(item){
             const itemData = item.categorie.toUpperCase()
             const textData = text.toUpperCase()
             return itemData.indexOf(textData) > -1
         })
         this.setState({
             dataSource: this.state.dataSource.cloneWithRows(newData),
             text: text
         })
      }
    }

     _refreshListView(){
         //Start Rendering Spinner
         this.setState({refreshing:true})
         this.state.annonces.push(
            {  
                        "id":5,
                        "categorie_id":4,
                        "titre":"Annonce event",
                        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\r\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
                        "image":"1532102640_annonce.jpg",
                        "prix":"500",
                        "residence":"Calmeilles",
                        "genre":"",
                        "age":200,
                        "created_at":"2018-07-20",
                        "user_id":null,
                        "categorie":"Event",
                        "like":false,
                        "nb_like":2
                    },
                    {  
                        "id":2,
                        "categorie_id":6,
                        "titre":"Annonce 2",
                        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\r\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        "image":"1532090428_annonce.png",
                        "prix":"5",
                        "residence":"Perpignan",
                        "genre":"",
                        "age":3,
                        "created_at":"2018-07-20",
                        "user_id":null,
                        "categorie":"Restaurant",
                        "like":true,
                        "nb_like":2
                    },
         )
         //Updating the dataSource with new data
         this.setState({ dataSource:
             this.state.dataSource.cloneWithRows(this.state.annonces) })
         this.setState({refreshing:false}) //Stop Rendering Spinner
       }

       slide(index){
         this.setState({ activeSlide: index })
         // console.warn(this.state.activeSlide)
       }

       gotoCommentaire(id) {
          this.props.navigation.navigate(CommentairesScreen, {idComs: id});
       }

       detailsAnnoncesSyndic(id_annonce){
          this.props.navigation.navigate(detailsAnnoncesSyndicScreen, {id_annonce: id_annonce});
       }

       _renderIconLike(data){
        if (data.item.etat_like) {
          return(
            <TouchableOpacity  style = {{height:40, paddingTop:10}} >
              <View>
             <Icon style={{color:'#152a45', paddingRight:5}} name="ios-heart-outline" />
             <Text style={{ marginTop: -25, textAlign:'center' }}>
               {data.item.like}
             </Text>
             </View>
            </TouchableOpacity>
          );
        }else{
          return(
              <TouchableOpacity  style = {{height:40, paddingTop:10}} >
                <View>
               <Icon style={{color:'#152a45', paddingRight:5}} name="ios-heart" />
               <Text style={{ marginTop: -25, textAlign:'center' }}>
                 {data.item.like}
               </Text>
               </View>
              </TouchableOpacity>
            );
        }
       }

       _renderItem(data, index){
        // alert(`You've clicked '${data.item.titre}'`);
          //console.warn(data)
         const img = 'https://ohome.easywebmobile.fr/public/img/annonces/'+data.item.image
         return (
           
               <View style ={{padding:5, marginTop:40}} >
                 <Card style = {{borderWidth:5, borderColor:'#FFF', borderRadius:10}} >
                     <View containerStyle={{ padding: 0, width: 100, borderRadius:10 }}>
                     <TouchableOpacity
                         onPress = {this.detailsAnnoncesSyndic.bind(this, data.item.id)}
                         style = {{alignItems:'center', borderRadius:10}} >
                         <Image 
                           style = {styles.imgHorizontal} 
                           source = {{uri:img}}
                           resizeMode="cover"
                          />
                     </TouchableOpacity>
                     <CardItem>
                       <View style = {{flexDirection:'row'}} >
                         <View style = {{width:'50%'}} >
                          {this._renderIconLike(data)}
                         </View>

                         <View style = {{width:'50%'}} >
                          <TouchableOpacity onPress = {this.gotoCommentaire.bind(this, data.item.id)} style = {{height:40, paddingTop:10}}>
                           <Icon style={{color:'#152a45'}} name="md-text" />
                           <Text style={{ marginTop: -25, textAlign:'center' }}>
                             {data.item.nb_com}
                           </Text>
                          </TouchableOpacity>
                         </View>
                       </View>
                     </CardItem>
                       <View style = {{position:'absolute', top:0, justifyContent:'center', alignItems:'center',
                                        backgroundColor: 'rgba(0, 0, 0, 0.56)', 
                                        width:'100%', height:50, borderTopLeftRadius:10, borderTopRightRadius:10, paddingHorizontal:0}} >
                        <Text style ={{color:'#FFF', fontSize:16}} >
                          {data.item.titre}
                        </Text>
                       </View>
                     </View>
                 </Card>
                 
               </View>
           
         );
       }
  

  render() {

    const { scrollAnim, offsetAnim } = this.state;
    
    const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp'
    });
    const titre = 'Ads';
    const {navigation} = this.props;
    const filterData = this.filterData;
    let dataSend = {
      titre,
      navigation,
    }
    return (
      <Container style ={{backgroundColor:'transparent'}}>
        <Animated.View style={[styles.header, { transform: [{translateY}] }]}>
          <Headers dataSend={dataSend} filterData={filterData}/>
        </Animated.View>
        <AnimatedScrollView
          contentContainerStyle={{}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [ { nativeEvent: { contentOffset: { y: this.state.scrollAnim } } } ],
          )}
          onMomentumScrollBegin={this._handleMomentumScrollBegin}
          onMomentumScrollEnd={this._handleMomentumScrollEnd}
          onScrollEndDrag={this._handleScrollEndDrag}
        >
        <Spinner
         visible={this.state.visibleSpinner}
         textContent={"Loading..."} 
         textStyle={{color: '#FFF'}}/>
        <Content contentContainerStyle={[styles.container, {backgroundColor:'transparent'}]}>
        

        <View style={{paddingTop: 60}}>
            <View style ={{backgroundColor:'#C0C0C0', width:'100%', flexDirection: 'row', padding:10}} >
                      <Text style={{color:'#152a45', textAlign:'left', fontSize:15, fontWeight:'bold', paddingLeft:10}} >Residence : {global.nom_residence}</Text>
                </View>
            <Slideshow
          dataSource= {this.state.dataHorizontal}
          height = {this.state.viewport.height-450}
          position={this.state.positionSlide}
          onPositionChanged={position => this.setState({ positionSlide })}
          onPress = {({image}) => this.detailsAnnoncesSyndic(image['id'])}
          />
        </View>

          <View>
          {/* <Carousel 
            ref={(c) => {this._carousel = c;}}
            data={this.state.dataHorizontal}
            renderItem={item => this._renderItem(item)}
            sliderWidth={this.state.viewport.width}
            itemWidth={this.state.viewport.width -50 }
            onSnapToItem={(index) => this.slide(index)}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          /> */}
          </View>

          <View style ={{justifyContent:'center', alignItems:'center'}} >
            <View style ={{marginTop:15, backgroundColor:'#C0C0C0', width:'100%', alignItems:'center', justifyContent:'center', flexDirection: 'row', padding:10}} >
                  <Text style={{color:'#152a45', textAlign:'center', fontSize:14, paddingLeft:10}} >{this.state.categorieTitre}</Text>
            </View>
          </View>

          <View style={styles.style_annonce}>
                <ListView enableEmptySections={true}
                  contentContainerStyle={styles.listView}
                  refreshControl={this._refreshControl()}
                  dataSource={this.state.dataSource}
                  renderRow={(data, rowId, sectionID) => this._renderListView(data, rowId, sectionID)}>
                </ListView>
          </View>
        </Content>
        </AnimatedScrollView>
        <Fab navigation = {navigation} />
        <Footers navigation ={dataSend}/>
      </Container>
    );
  }
}
const bleuOhome = '#152a45';
const height = ((width / 2) - 15) *2;
const styles = StyleSheet.create({
  container:{
    // flex:1,
    // justifyContent:'center',
    // alignItems:'center'
    },
  style_annonce:{
    flex:1,
     paddingTop:5,
     borderWidth: 1,
     borderRadius:10,
     borderColor:'transparent',
     width: '90%',
     marginLeft: 'auto',
     marginRight:'auto',
  },  
    listView: {
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      backgroundColor:'transparent',
    },
    card: {
      flex:1,
      backgroundColor: '#FFF',
      // width: (width / 2) - 15,
      width:(width),
      // height: height,
      // marginHorizontal: 10,
      marginTop: 10,
      justifyContent:'center',
      alignItems:'center'
    },
    cardTextTitre:{
      top:0,
      height: 45,
      // width: (width / 2) - 13,
      width: (width),
      position:'absolute',
      marginTop:9,
      left:-1,
      // backgroundColor: 'rgba(0, 0, 0, 0.111)',
      backgroundColor: '#FFF',
      marginLeft: 0,
      paddingHorizontal: 20,
      justifyContent:'center',
      alignItems:'center',
      borderWidth: 1,
      // borderRadius:10,
      borderBottomLeftRadius:0,
      borderBottomRightRadius:0,
      borderColor:'transparent'
    },
    cardTextFoot:{
      zIndex:0,
      padding:5,
      flex:1,
      flexDirection:'row',
      bottom:-1,
      left:0,
      height: 70,
      // width: (width / 2) - 13,
      width: '100%',
      position:'absolute',
      marginTop:14,
      backgroundColor: 'rgba(0, 0, 0, 0.56)',
      marginLeft: 0,
      borderWidth: 1,
      // borderRadius:10,
      // borderTopLeftRadius:0,
      // borderTopRightRadius:0,
      borderColor:'transparent'
    },
    img: {
      // width: (width / 2) - 15,
      width: width,
      height: height -50,
      // borderRadius:10,
    },
    imgHorizontal:{
      width:width -15,
      height:height -100,
      zIndex:0,
      borderRadius:10
      /*borderTopLeftRadius:50,
      borderTopRightRadius:50*/
    },
    imgetiquette:{
      width:40,
      height:40
    },
    header: {
    height: HEADER_HEIGHT,
    // paddingTop: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex:100,
    backgroundColor: 'red',
    overflow: 'hidden',
  },
   
})

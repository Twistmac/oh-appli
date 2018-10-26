import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList,
	Alert
}
from 'react-native';
import style from '../Styles/Style';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Icon, Toast } from 'native-base';
import Menu, {
    MenuProvider,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import {LoginScreen} from '../route/ScreenName';
import Headers from '../header/Headers';
import Footers from '../footer/Footers';
import {getMyAnnonces, getSuppAnnonces} from './services/Services';
const _format = 'YYYY-MM-DD';
export default class Menus extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	visibleSpinner: false,
	  	data : [],
	  	NewData : []
	  };
	}


    componentDidMount(){
      this.setState({
          visibleSpinner: true,
      })
      getMyAnnonces(global.id).then((data) => {
        this.setState({ 
          data:data
        })
        this.setState({
          visibleSpinner: false,
      })
      })
    }

	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-folder" style ={{color:'#152a45', fontSize:20}} />
			)
	}

	ConfirmationSupp(id, index){
		Alert.alert(
		  'Delete',
		  'Would you delete it?',
		  [
		    {text: 'NO', style: 'cancel'},
		    {text: 'YES', onPress: () => this.suppression(id, index)},
		  ]
		);
	}

	suppression(id, index){
		getSuppAnnonces(id).then((data) => {
			if (data === true) {
				var NewData = this.state.data.splice(index, 1);
				const titre = NewData.titre
				this.setState({
					data : this.state.data
				})
					Toast.show({
		                text: "Delete success !",
		                buttonText: "Ok",
		                duration:3000,
		                type:"success"
	          		})
			}else{
					Toast.show({
		                text: "Delete error try again !",
		                buttonText: "Ok",
		                duration:3000,
		                type:"danger"
	          		})
			}
		})
	}

	modifier(id){
		console.warn('id :' + id);
	}

	_renderItem(data, index){
		let titre = data.titre ;
		const img = 'https://ohome.easywebmobile.fr/public/img/annonces/'+data.image;
		return(
		<TouchableOpacity>
			<List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square large source = {{uri:img}} />
              </Left>
              <Body>
                <Text style = {{fontWeight:'bold', fontSize:18}}>{titre}</Text>
                <Text note numberOfLines={2}>{data.description}</Text>
                <Text note numberOfLines={1}>{moment(data.created_at).format(_format)}</Text>
              </Body>
              <Right>
	              <Menu>
	              	  <MenuTrigger>
	              	  <View style ={styles.viewContext} >
	              	  	<Icon style = {{color:'black', fontSize:30, paddingLeft:35}} name = 'md-more'/>
	              	  </View>
		              </MenuTrigger>
		              <MenuOptions customStyles={{
                                optionWrapper: styles.containerMenu,
                                optionsContainer : styles.containerMenus,
                                optionText: styles.textMenu
                            }}>
		              	  <MenuOption onSelect={this.modifier.bind(this, data.id)}>
                            <Text style={{ color: 'green' }}>Edit</Text>
                          </MenuOption>
                          <MenuOption onSelect={this.ConfirmationSupp.bind(this, data.id, index)}>
                            <Text style={{ color: 'red' }}>Delete</Text>
                          </MenuOption>
		           	  </MenuOptions>
	          	  </Menu>
              </Right>
            </ListItem>
          </List>
        </TouchableOpacity>
		);

		console.warn(index);
	}

	_renderSeparator() {
	  return (
	    <View style={styles.separator}/>
	  )
	}

	_renderListVide(){
		return(
				<View style = {{flex:1, alignItems:'center', justifyContent:'center'}} >
					<Text Style ={{textAlign:'center'}} > No data to render</Text>
				</View>
			)
	}

	render() {
		const titre = 'My Ads';
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		}
		return (
			<Container>
				<Headers dataSend={dataSend} />
				<Spinner
				 visible={this.state.visibleSpinner}
				 textContent={"Loading..."} 
				 textStyle={{color: '#FFF'}}/>
				<Content contentContainerStyle={styles.container}>
				<MenuProvider style={styles.container}>
					<FlatList
		                  data={this.state.data}
		                  keyExtractor={item => item.id.toString()}
		                  extraData={this.state}
		                  ItemSeparatorComponent={this._renderSeparator}
		                  ListEmptyComponent={this._renderListVide}
		                  renderItem = {({item, index}) =>this._renderItem(item, index)}/>
                </MenuProvider>
				</Content>
				<Footers navigation ={dataSend} />
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		// justifyContent:'center',
		// alignItems:'center'
	},
	separator: {
		left:110,
	    height: 2,
	    backgroundColor: '#152a45'
   },
   viewContext:{
	   	backgroundColor:'transparent', 
	   	width:50, 
	   	height:30, 
	   	alignItems:'center', 
	   	justifyContent: 'center',
   },
   containerMenus:{
   		marginTop:-30,
        width : 150,
        alignItems : 'center',
        borderWidth: 1,
        borderColor: '#d3d3d3',
    },
   containerMenu:{
       alignItems : 'center'
    },
    textMenu:{
        fontSize: 16
    }
})

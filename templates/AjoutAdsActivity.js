import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	BackHandler, DeviceEventEmitter
}
from 'react-native';
import style from '../Styles/Style';
import {Container, Content, Header, Icon, Left, Button, Title, Form, Item, Input, Label, Picker, Textarea, Toast } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {LoginScreen, HomeScreen, AnnoncesScreen} from '../route/ScreenName';
import Headers from '../header/Headers';
import HeaderAll from '../header/HeadersAllPage';
import Footers from '../footer/Footers';
import {getCategories, postAnnonceRes} from './services/Services';
import RNFetchBlob from 'react-native-fetch-blob';

const options = {
    title: 'Select photo',
    takePhotoButtonTitle: 'Take photo',
    chooseFromLibraryButtonTitle: 'From library',
    quality: 1,
};


export default class AjoutAdsActivity extends Component {
	constructor(props) {
	  super(props);
		this.backPressSubscriptions = new Set()
	  this.state = {
	  	visibleSpinner: false,
	  	titre:'',
	  	prix:null,
	  	categorie:1,
	  	description:'',
	  	avatarSource:undefined,
	  	data:[],
	  	dataImage:null,
	  	fileName:null,
	  	type:null
	  };
	}

	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-folder" style ={{color:'#152a45', fontSize:20}} />
			)
	}

	componentWillMount(){
		getCategories().then((data) =>{
			this.setState({
				data:data.categories
			})
		})

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
	}

	componentWillUnmount(){
	    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
	    this.backPressSubscriptions.clear()
  	}

  	handleHardwareBack = () => {
  	 this.props.navigation.goBack();
  	  return true;
  	}

	onValueChange(value: string) {
		// console.warn(value)
	    this.setState({
	      categorie: value
	    });
	  }

	getImage(){
		ImagePicker.showImagePicker(options, (response) => {
		  console.log('Response = ', response);

		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  }
		  else {
		    let source = { uri: response.uri };

		    this.setState({
		      avatarSource: source,
		      dataImage: response.data,
              type: response.type,
              fileName: response.fileName,
		    });
		    // console.warn(response.data)
		  }
		});

	}

	Send(){
		if (this.state.dataImage === null) {
			this.postNotImage();
		}else{
			this.SendPost();
		}
	}

	postNotImage(){
		this.setState({
			visibleSpinner: true,
	})

		const params = {
			id_User : global.id,
			id_partenaire : null,
    		type : 'r',
    		titre : this.state.titre,
    		prix: this.state.prix,
    		categorie : this.state.categorie,
    		description : this.state.description,
    		syndic_id : global.syndic_id
		}
		postAnnonceRes(params).then((data)=>{
			
			 //console.warn(params);
			if (data.result === 'ok') {
				this.setState({
						visibleSpinner: false,
				});
			this.props.navigation.navigate(AnnoncesHomeScreen);
			Toast.show({
								text: "Add success !",
								buttonText: "Ok",
								duration:3000,
								type:"success"
						})
						this.input._root.clear();
						this.setState({
						titre:'',
					prix:null
				})
			}else{
				this.setState({
						visibleSpinner: false,
				})
			Toast.show({
								text: "Error, please try again",
								buttonText: "Ok",
								duration:3000,
								type:"danger"
						})
			}
		})
	}

	SendPost(){
		this.setState({
		    visibleSpinner: true,
		})
		const etat = this.state;


			RNFetchBlob.fetch('POST', 'https://ohome.easywebmobile.fr/api/post-annonce', {
		    Authorization : "Bearer access-token",
		    otherHeader : "foo",
		    'Content-Type' : 'multipart/form-data',
		  }, [
		    	{name: 'image', filename: this.state.fileName, type: this.state.type, data: this.state.dataImage},
		    	{name: 'formulaire', data : JSON.stringify({
						id_User : global.id,
						id_partenaire : null,
		    		type : 'r',
		    		titre : this.state.titre,
		    		prix: this.state.prix,
		    		categorie : this.state.categorie,
		    		description : this.state.description,
		    		syndic_id : global.syndic_id
 		    	})}
		  ]).then((resp) => {
		  	let result = resp.json().result;
		  	if (result.result === 'ok') {
					this.props.navigation.navigate(AnnoncesScreen);
			  	this.setState({
			  	    visibleSpinner: false,
			  	});
				Toast.show({
	                text: "Add success !",
	                buttonText: "Ok",
	                duration:3000,
	                type:"success"
          		})
          		this.input._root.clear();
          		this.setState({
		  		    titre:'',
	  				prix:null
		  		})
		  	}else{
		  		this.setState({
		  		    visibleSpinner: false,
		  		})
				Toast.show({
	                text: "Error, please try again",
	                buttonText: "Ok",
	                duration:3000,
	                type:"danger"
          		})
		  	}
		    console.warn(result);
		  }).catch((err) => {
		  	this.setState({
		  	    visibleSpinner: false,
		  	})
		    console.warn('erreur', err);
		  }) 


		
	}


	render() {
		const titre = 'Add';
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		};
		return (
			<Container>
				{/*<Headers dataSend={dataSend} />*/}

				<Spinner
				 visible={this.state.visibleSpinner}
				 textContent={"Loading..."} 
				 textStyle={{color: '#FFF'}}/>
				<Content contentContainerStyle={{backgroundColor:'black'}}>
				<HeaderAll titre = {'Service Add'} />
				<View style ={styles.container} >
					<Form>
			            <Item floatingLabel>
			              <Label>Titre</Label>
			              <Input
			              	onChangeText = {(text) => this.setState({
			              	titre:text
			              })} />
			            </Item>

			            <Item floatingLabel>
			              <Label>Price</Label>
			              <Input
			              	keyboardType="numeric" 
			              	onChangeText = {(text) => this.setState({
			              	prix:text
			              })} />
			            </Item>

			            <View style = {{ paddingHorizontal:10, paddingTop:30}} >
			            	<Text style={{fontSize:16, color:'black'}} > Category :</Text>
			            </View>
			            <View style={{paddingHorizontal:4}} >
							<Item picker style={{borderColor:'#FFF'}} >
				              <Picker
				                mode="dropdown"
				                iosIcon={<Icon name="ios-arrow-down-outline" />}
				                style={{ width: undefined, paddingLeft: 5 }}
				                placeholder="Select Categorie"
				                placeholderStyle={{ color: "#bfc6ea" }}
				                placeholderIconColor="#007aff"
				                selectedValue={this.state.categorie}
				                onValueChange={this.onValueChange.bind(this)}>
				                {this.state.data.map((item, key) => (<Picker.Item label={item.name} value={item.id} key ={key} />))}
				              </Picker>
				            </Item>
			            </View>

			            <View style = {{ paddingHorizontal:10, paddingTop:10}} >
			            <TouchableOpacity style={styles.profilImage} onPress={this.getImage.bind(this)}>
                            <Text style={{fontSize:16, color:'black'}}> Select a Photo: </Text>
                        </TouchableOpacity>
			            </View>

			            <View style = {{ paddingHorizontal:15}}>
                        {(this.state.avatarSource === undefined) ?
                          <Text>No selected photo</Text> :
			              <Image style = {{width:100, height:100}} source={this.state.avatarSource} />
			            }
			            </View>

			            <View style={{paddingHorizontal:10, paddingTop:20}} >
			            	<Textarea ref={input => { this.input = input} } rowSpan={5} bordered placeholder="Description" onChangeText = {(text) => this.setState({
			              	description:text
			              })} />
			            </View>
			            <View style={{paddingHorizontal:30, paddingVertical:20}} >
							<Button primary block style={styles.button}
							 	onPress = {this.Send.bind(this)}	>
		                    	<Text style={styles.textButton} > Add </Text>
	                    	</Button>
                    	</View>
		            </Form>
		        </View>
				</Content>
				<Footers navigation ={dataSend} />
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	content:{
		backgroundColor:'black'
	},
	container:{
		padding:10,
		backgroundColor:'#FFF'
	},
	button:{
		height:55, 
		borderRadius:5
	},
	textButton:{
		fontSize:20, 
		color:'#FFF', 
		fontWeight:'bold'
	},
})

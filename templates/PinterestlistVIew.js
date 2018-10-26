import React, { Component } from 'react';
import {View, Text, StyleSheet, ListView, Image} from 'react-native';
import {Container, Content} from 'native-base';

const Dimensions = require('Dimensions');
const w = Dimensions.get('window');
const r = (w.width / 2) / 500;

const REQUEST_URL = 'http://www.wisgoon.com/api/v6/post/user/8090/';

const result = [  
        {  
            "id":5,
            "categorie_id":4,
            "titre":"Annonce event",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
            "image":{
            	 "url":"1532102640_annonce.jpg",
            	 "width":500,
                 "height":888
            	},
            "prix":"500",
            "residence":"Calmeilles",
            "type":"o",
            "genre":"",
            "age":200,
            "created_at":"2018-07-20 16:04:00",
            "user_id":null,
            "categorie":"Event",
            "like":false,
            "nb_like":0
        },
        {  
            "id":2,
            "categorie_id":6,
            "titre":"Annonce 2",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\r\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "image":{
            	"url":"1532090428_annonce.png",
            	"width":500,
                "height":800
            	},
            "prix":"5",
            "residence":"Perpignan",
            "type":"o",
            "genre":"",
            "age":3,
            "created_at":"2018-07-20 12:40:28",
            "user_id":null,
            "categorie":"Restaurant",
            "like":true,
            "nb_like":1
        },
        {  
            "id":3,
            "categorie_id":3,
            "titre":"Annonce 3",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\r\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "image":{
            	"url":"1532090463_annonce.jpg",
            	"width":500,
                "height":800
            	},
            "prix":"50",
            "residence":"Perpignan",
            "type":"o",
            "genre":"",
            "age":25,
            "created_at":"2018-07-20 12:41:03",
            "user_id":null,
            "categorie":"Service",
            "like":true,
            "nb_like":1
        },
        {  
            "id":4,
            "categorie_id":1,
            "titre":"Annonce informations",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\r\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "image":{
            	"url":"1532090702_annonce.jpg",
            	"width":500,
                "height":800
            	},
            "prix":"25",
            "residence":"Saint-Laurent-de-la-Salanque",
            "type":"o",
            "genre":"",
            "age":2,
            "created_at":"2018-07-20 12:45:02",
            "user_id":null,
            "categorie":"Information",
            "like":false,
            "nb_like":0
        },
        {  
            "id":8,
            "categorie_id":6,
            "titre":"Titre annonces",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
             "image":{
            	"url":"image_463215.png",
            	"width":500,
                "height":800
            	},
            "prix":"99",
            "residence":null,
            "type":"r",
            "genre":null,
            "age":null,
            "created_at":"2018-08-02 15:41:34",
            "user_id":null,
            "categorie":"Restaurant",
            "like":false,
            "nb_like":0
        },
        {  
            "id":11,
            "categorie_id":5,
            "titre":"Mon annonce",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",

            "image":{
            	"url":"1533283389_annonce.jpg",
            	"width":500,
                "height":200
            	},
            "prix":"88",
            "residence":null,
            "type":"r",
            "genre":null,
            "age":null,
            "created_at":"2018-08-03 08:03:10",
            "user_id":{  
                "id":2,
                "username":"test2",
                "nom":"Test",
                "prenom":"Pr\u00e9nom",
                "birthday":null,
                "sex":"Male",
                "pseudo":"Ttttttyyt",
                "phone":"6546810004",
                "email":"test2@easywebmobile.fr",
                "salt":"b2hvbWU=",
                "residence_id":null,
                "created_at":"2018-07-20 08:10:10",
                "updated_at":"2018-08-24 11:54:42",
                "role":"resident",
                "complete":1
            },
            "categorie":"Real estate",
            "like":false,
            "nb_like":0
        },
        {  
            "id":12,
            "categorie_id":7,
            "titre":"Annonce essai",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",

            "image":{
            	"url":"1533283515_annonce.jpg",
            	"width":500,
                "height":800
            	},
            "prix":"8864",
            "residence":null,
            "type":"r",
            "genre":null,
            "age":null,
            "created_at":"2018-08-03 08:05:16",
            "user_id":{  
                "id":2,
                "username":"test2",
                "nom":"Test",
                "prenom":"Pr\u00e9nom",
                "birthday":null,
                "sex":"Male",
                "pseudo":"Ttttttyyt",
                "phone":"6546810004",
                "email":"test2@easywebmobile.fr",
                "salt":"b2hvbWU=",
                "residence_id":null,
                "created_at":"2018-07-20 08:10:10",
                "updated_at":"2018-08-24 11:54:42",
                "role":"resident",
                "complete":1
            },
            "categorie":"Motorbike",
            "like":false,
            "nb_like":0
        },
        {  
            "id":19,
            "categorie_id":6,
            "titre":"Test luc",
            "description":"Description restaurant",
            "image":{
            	"url":"1534498118_annonce.jpg",
            	"width":500,
                "height":800
            	},
            "prix":"8000",
            "residence":null,
            "type":"r",
            "genre":null,
            "age":null,
            "created_at":"2018-08-17 09:28:38",
            "user_id":{  
                "id":1,
                "username":"luc",
                "nom":"Resident",
                "prenom":"Test",
                "birthday":"1990-09-17",
                "sex":"Male",
                "pseudo":"Luc",
                "phone":"06261234",
                "email":"luc@easywebmobile.fr",
                "salt":"b2hvbWU=",
                "residence_id":null,
                "created_at":"2018-07-20 08:09:54",
                "updated_at":"2018-07-20 08:09:54",
                "role":"resident",
                "complete":1
            },
            "categorie":"Restaurant",
            "like":false,
            "nb_like":0
        }
    ]

export default class PinterestlistVIew extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
	  };
	}

	componentDidMount() {
	  this.setState({
	      dataSource: this.state.dataSource.cloneWithRows(result),
	    });
	};

	renderPost(data) {
		const img = 'https://ohome.easywebmobile.fr/public/img/annonces/'+data.image.url;
	  return (
	    <View style={[styles.item, {width: (w.width / 2) - 7}]}>
	      <Image source={{uri: img}} 
	      style={[{ width: data.image.width * r, height: data.image.height * r }]} 
	      />

	      <View style={styles.post_text_box}>
	        <Text style={styles.post_text}>{data.description}</Text>
	      </View>
	    </View>
	    );
	};
	render() {
		return (
			<Container>
				<Content>
				<Text>
					List
				</Text>
					<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderPost}
					contentContainerStyle={styles.items}
					style={styles.itemsBox}
					/>
				</Content> 
			</Container>
		);
	}
}

const styles = StyleSheet.create({
    itemsBox: {
        marginLeft: 5,
        marginRight: 5,
        height: 3500,
    },
    items: {
        flexDirection: 'column',
        flex: 1,
        flexWrap: 'wrap',
    },
    item: {
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
        borderWidth: 1,
        borderColor: '#555',
        marginRight: 5,
        marginTop: 5,
    },
    post_text_box: {
        padding: 20,
    },
});

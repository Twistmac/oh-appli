import { StackNavigator, DrawerNavigator, DrawerItems} from  'react-navigation';
import {BackHandler, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import HomeScreen from '../templates/HomeActivity';
import LoginScreen from '../templates/LoginActivity';
import LoginPartenaireScreen from '../templates/LoginPartenaireActivity';
import {View, Image, StyleSheet, Text} from 'react-native';
import React, { Component } from 'react';
import {Container, Content, Header, Body} from 'native-base';
import RegisterScreen from '../templates/RegisterActivity';
import TutorialScreen from '../templates/TutorialActivity';
import AddProfilScreen from '../templates/AddProfilActivity';
import TermsScreen from '../templates/TermsActivity';
import AnnoncesScreen from '../templates/AnnoncesActivity';
import MessageScreen from '../templates/MessageActivity';
import AccessScreen from '../templates/AccessActivity';
import LogoutScreen from '../templates/Logout';
import DetailsScreen from '../templates/detailsAnnoncesActivity';
import ProfileScreen from '../templates/ProfileActivity';
import ProfilePartenaireScreen from '../templates/ProfilePartenaireActivity';
import AjoutAdsScreen from '../templates/AjoutAdsActivity';
import AjoutAdsPartenaireScreen from '../templates/AddAdsPartenaireActivity';
import CommentairesScreen from '../templates/CommentairesActivity';
import detailsAnnoncesSyndicScreen from '../templates/detailsAnnoncesSyndicActivity';
import ChatScreen from '../templates/chat/Chat';
import HomePartenaireScreen from '../templates/HomePartenaireActivity';
import AnnonceResidenceScreen from '../templates/AnnonceResidenceActivity';
import {login, storeMailResident, getMailResident, storePassResident, getPassResident, storeRole, getRole} from '../templates/services/Services';
import ChatPartenaireScreen from '../templates/chat/ChatPartenaire';
import ChatResidentPartenaireScreen from '../templates/chat/ChatRp';





// configuration de toutes les pages
// SplashScreen sy mapscreen le string ary @ screenName

// const navigationOptions = ({navigation}) => ({
//     drawerLockMode:'locked-closed' //here
// });

const CustomDrawerContentComponent = (props)=>(
      <Container>
        <Header style={{height:90, backgroundColor:'#152a45'}} >
          <Body style= {{alignItems:'center', justifyContent:'center'}} >
            <Image
            style={styles.drawerImage}
            source= {require('../img/logo_BCL_small.png')}>
            </Image>
            <Text style ={{fontSize: 18, color:'#FFF', padding:10}} > {global.userName} </Text>
          </Body>
        </Header>
        <Content style ={{backgroundColor:'#FFF'}} >
        <View style ={{backgroundColor:'#FFF'}} >
          <DrawerItems{...props} 
            activeTintColor='#f5d017'
            activeBackgroundColor='transparent' 
            inactiveTintColor='#000' 
            inactiveBackgroundColor='transparent' 
            style={{backgroundColor: '#FFF'}} 
            labelStyle={{}}
          />
        </View>
          
        </Content>
      </Container>
)

const Drawer2 = DrawerNavigator({
    HomePartenaireScreen: {
        screen: HomePartenaireScreen,
        navigationOptions: {
            headerTitleStyle: { left:10},
            title: "Partner",
            // drawerLockMode:'unlocked',
        }
    },
    ProfileScreen: {
        screen: ProfilePartenaireScreen,
        navigationOptions: {
            headerTitleStyle: { left:10},
            title: "Profil",
            // drawerLockMode:'unlocked',
        }
    },

    AnnonceResidenceScreen: {
        screen: AnnonceResidenceScreen,
        navigationOptions: {
            headerTitleStyle: { left:10},
            title: "Residence Ads",
            // drawerLockMode:'unlocked',
        }
    },
    LogoutScreen: {
        screen: LogoutScreen,
        navigationOptions: {
             headerTitleStyle: { left:30 },
             title: "Logout",
        }
    },
},
{
    // navigationOptions: navigationOptions, //enleve draw
    initialRouteName:'HomePartenaireScreen',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle',
    contentOptions: {
        activeTintColor: "#f5d017" //couilure active menus
    },
});

const Drawer = DrawerNavigator({
    HomeScreen:{
           screen: HomeScreen,
           navigationOptions: {
               headerTitleStyle: { left:10},
               title: "My ads",
               //drawerLockMode:'locked',
           }
       },
    ProfileScreen: {
           screen: ProfileScreen,
           navigationOptions: {
                headerTitleStyle: { left:30 },
                title: "Profil",
                // drawerLockMode:'unlocked', //enleve draw
           }
       },
    TutorialScreen: {
           screen: TutorialScreen,
           navigationOptions: {
                headerTitleStyle: { left:30 },
                title: "Tutorial",
           }
       },
    TermsScreen: {
           screen: TermsScreen,
           navigationOptions: {
                headerTitleStyle: { left:30 },
                title: "Terms & Conditions",
           }
       },
    AnnoncesScreen: {
           screen: AnnoncesScreen,
           navigationOptions: {
                headerTitleStyle: { left:30 },
                title: "Ads",
           }
       },
     MessageScreen: {
           screen:  MessageScreen,
           navigationOptions: {
                headerTitleStyle: { left:30 },
                title: "Messages",
           }
       },
    AccessScreen: {
           screen: AccessScreen,
           navigationOptions: {
                headerTitleStyle: { left:30 },
                title: "Access",
           }
       },
    LogoutScreen: {
           screen: LogoutScreen,
           navigationOptions: {
                headerTitleStyle: { left:30 },
                title: "Logout",
           }
       }      
},
    {
        // navigationOptions: navigationOptions, //enleve draw
        initialRouteName:'HomeScreen',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute:'DrawerClose',
        drawerToggleRoute:'DrawerToggle',
        contentOptions: {
            activeTintColor: "#f5d017" //couilure active menus
        },
    },
);

//console.warn(global.roleUser);

const PageRoute2 = StackNavigator({
        LoginScreen:{screen: LoginScreen},
        LoginPartenaireScreen:{screen: LoginPartenaireScreen},
        AddProfilScreen:{screen: AddProfilScreen},
        DetailsScreen:{screen: DetailsScreen},
        CommentairesScreen:{screen: CommentairesScreen},
        //HomePartenaireScreen:{screen: HomePartenaireScreen},
        detailsAnnoncesSyndicScreen:{screen: detailsAnnoncesSyndicScreen},
        AjoutAdsPartenaireScreen: { screen: AjoutAdsPartenaireScreen},
        ChatPartenaireScreen: { screen: ChatPartenaireScreen},
        ChatResidentPartenaireScreen: { screen: ChatResidentPartenaireScreen},
        Main : Drawer2
        //screen: Drawer
    },
    {
        headerMode: "none",
    }
);


const styles = StyleSheet.create({
  DrawerImage:{
    paddingTop:20,
    height:30,
    width:'90%',
    resizeMode:'contain', 
    flex:1
  }
})

export default PageRoute2;




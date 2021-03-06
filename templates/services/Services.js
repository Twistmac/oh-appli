import React from 'react';
import { AsyncStorage, NetInfo  } from 'react-native';
// const Serveur = 'https://ohome.easywebmobile.fr/api/';
const Serveur = 'http://192.168.0.9/oh/public/api/';


const PostLogin = Serveur+'login-appli';
const PostRegister = Serveur+'complete-profil';
const PostComs = Serveur+'post-coms/';
const GetAnnonces = Serveur+'annonces/r/';
const GetMyAnnonces = Serveur+'my-annonces/';
const GetLike = Serveur+'like-annonce/';
const GetProfile = Serveur+'profile/';
const GetTerms = Serveur+'termes-conditions';
const GetCategories = Serveur+'categories';
const GetSuppAnnonces = Serveur+'delete-annonce/';
const GetAnnoncesSyndic = Serveur+'annonces-syndic/';
const GetOneAnnoncesSyndic = Serveur+'get-annonce-syndic/';
const GetCommentsSyndic = Serveur+'coms-annonce/';
const PostLoginPartenaire = Serveur+'login-partenaire';
const PostAnnonceRes = Serveur+'post-annonce-not-image';

const ACCESS_EMAILRES = 'emailres';
const ACCESS_PWD = 'passres';
const PARTNER = 'partner';

async function storePartner(params){
    try{
        await AsyncStorage.setItem(PARTNER,JSON.stringify(params));
    }catch(error){
        // console.warn(error);
    }
}

async function getPartner(){
    try{
        let Partener = await AsyncStorage.getItem(PARTNER);
        return Partener;
    }catch(error){
        alert(error);
    }
}

async function storeMailResident(mail){
    try{
        await AsyncStorage.setItem(ACCESS_EMAILRES,mail);
    }catch(error){
        // console.warn(error);
    }
}

async function getMailResident(){
    try{
        let mail = await AsyncStorage.getItem(ACCESS_EMAILRES);
        return mail;
    }catch(error){
        alert(error);
    }
}

async function storePassResident(pass){
    try{
        await AsyncStorage.setItem(ACCESS_PWD,pass);
    }catch(error){
        alert(error);
    }
}

async function getPassResident(){
    try{
        let pass = await AsyncStorage.getItem(ACCESS_PWD);
        return pass;
    }catch(error){
        alert(error);
    }
}

async function removeEmailRes(){
    try{
        await AsyncStorage.removeItem(ACCESS_EMAILRES);
    }catch(error){
        alert(error);
    }
}

async function removePassRes(){
    try{
        await AsyncStorage.removeItem(ACCESS_PWD);
    }catch(error){
        alert(error);
    }
}

async function login(login,password) {
    try {
        let response = await fetch(PostLogin, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: login,
                password: password
            })
        });

        let res = await response.json();
        //console.warn(res);
        return res.result;
    }catch(error){
        return error;
    }
}

async function loginPartenaire(login,password) {
    try {
        let response = await fetch(PostLoginPartenaire, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: login,
                password: password
            })
        });

        let res = await response.json();
        return res;
    }catch(error){
        return error;
    }
}

async function register(params) {
    try {
        let response = await fetch(PostRegister, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });

        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

async function postAnnonceRes(params) {
    try {
        let response = await fetch(PostAnnonceRes, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });

        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

async function postComs(id_annonce, idUser, params) {
    try {
        let response = await fetch(PostComs+id_annonce+'/'+idUser, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });

        let res = await response.json();
        return res;
    }catch(error){
        return error;
    }
}

async function getAllMarker() {
    try {
        let response = await fetch(GetAllLocation);
        let res = await response.json();
        return res.data;
    }catch(error){
        return error;
    }
}

async function getAnnonces(id) {
    try {
        let response = await fetch(GetAnnonces+id+'/'+global.syndic_id);
        let res = await response.json();
        //console.warn(res);
        return res.result;
    }catch(error){
        return error;
    }
}

async function getAnnoncesSyndic(id) {
    try {
        let response = await fetch(GetAnnoncesSyndic+id);
        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

async function getOneAnnoncesSyndic(id, idUser) {
    try {
        let response = await fetch(GetOneAnnoncesSyndic+id+'/'+idUser);
        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

async function getMyAnnonces(id) {
    try {
        let response = await fetch(GetMyAnnonces+id);
        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

async function getProfile(id) {
    try {
        let response = await fetch(GetProfile+id);
        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

async function getLike(id_Ads, id) {
    try {
        let response = await fetch(GetLike+id_Ads+'/'+id);
        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

async function getTerms() {
    try {
        let response = await fetch(GetTerms)
        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

async function getCategories() {
    try {
        let response = await fetch(GetCategories);
        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

async function getComments(id) {
    try {
        let response = await fetch(GetCommentsSyndic + id);
        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

async function getSuppAnnonces(id) {
    try {
        let response = await fetch(GetSuppAnnonces+id);
        let res = await response.json();
        return res.result;
    }catch(error){
        return error;
    }
}

export{getAllMarker};
export{login};
export{register};
export{getAnnonces};
export{getMyAnnonces};
export{getLike};
export{getProfile};
export{getTerms};
export{getCategories};
export{getSuppAnnonces};
export{storeMailResident};
export{getMailResident};
export{storePassResident};
export{getPassResident};
export{removeEmailRes};
export{removePassRes};
export{getAnnoncesSyndic};
export{getComments};
export{postComs};
export{getOneAnnoncesSyndic};
export{loginPartenaire};
export{storePartner};
export{getPartner};
export{postAnnonceRes};
import {Dimensions} from 'react-native';
const blanc = '#FFF';
const bleuInput = '#529ABF';
export default{
	container:{
		// flex:1,
		// justifyContent:'center',
		// alignItems:'center'
	},
	headerLeft:{
		position: 'relative',
		left: -(Dimensions.get('window').width * 0.45)
	},
	inputGroup: {
        // backgroundColor: blanc ,
        // borderRadius: 5,
        // color: '#111',
        // borderWidth: 1,
        // borderColor:'#152a45',
        // borderBottomWidth: 2,
        // borderColor: bleuInput
    },
    item:{
		borderWidth:2,
		borderColor:'black'
	},
	listItem :{
		borderWidth:1,
		borderColor:'transparent'
	}
}
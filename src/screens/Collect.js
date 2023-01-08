import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';
import Header from '../components/Header';
import MechanicOrder from '../core/api/MechanicOrder';
import { theme } from '../core/theme';



const Collect = ({navigation}) => {
    const orderID=navigation.getParam('orderID');
    const order=navigation.getParam('order');

    const CostPaid = async () => {
        try{
            const response=await MechanicOrder.post('/costPaid',{
                _id: orderID,
            });
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }    
    const OnCashPressed = async () => {
        await CostPaid();
        navigation.navigate('Wait');
    }

    return(
        <View style={{flex:1,}}>
            <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.backgroundImg}
    >
        <Header>Collect Rs. {order.repair_cost}</Header>
        <TouchableOpacity style={styles.button} onPress={OnCashPressed}>
            <Text style={styles.buttonText}> Cash Collected</Text>
        </TouchableOpacity>

    </ImageBackground>
        </View>
    );
}

const styles= StyleSheet.create({
    button:{
        width:'70%',
        margin: 100,
        height:60,
        alignSelf:'center',
        paddingTop:12,
        backgroundColor:theme.colors.primary,
        borderRadius:10,
        
    },
    buttonText:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center',
    },
    backgroundImg: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.surface,
      },
});

export default withNavigation(Collect);
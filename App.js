import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TouchableOpacity,SafeAreaView, TextInput } from 'react-native';
import { api } from './src/services/api';
  import React,{useState,useEffect} from 'react';
export default function App() {
  const [data,setData] = useState();
  const [cep,setCep] = useState('');
 

      async function busca(){
        try{
            const a = await api.get(cep+`/json/`)
            console.log(a.data)
            setData(a.data)
          }catch(err){console.log(err)}
      }
      
      
  return (
     <SafeAreaView style={styles.container}>
     
      <Text style={styles.text}>digite o cep</Text>
        <TextInput
        style={styles.input}
        placeholder='Ex: 79003241'
        value={cep}
        onChangeText={ (t)=> setCep(t)}
        keyboardType='numeric'
      />
  
        
        <View style={styles.areaBtn} >
         
          <TouchableOpacity  style={[styles.botao,{backgroundColor:'green'}]}
            onPress={()=> busca()}
          >
              <Text style={styles.botaoText}> 
                buscar
              </Text>
          </TouchableOpacity>
       
          <TouchableOpacity style={[styles.botao,{backgroundColor:'red'}]}
            onPress={()=> setCep('')}
          >
              <Text style={styles.botaoText}> 
                limpar
              </Text>
          </TouchableOpacity>
        </View>
    {data != undefined  
    ? 
    (
      <View styles={styles.resultado}>
      <Text styles={styles.itemText} > CEP: {data.cep}</Text>
      <Text styles={styles.itemText} > logradouro: {data.logradouro}</Text>
      <Text styles={styles.itemText} > bairro: {data.bairro}</Text>
      <Text styles={styles.itemText} > cidade: {data.cidade}</Text>
      <Text styles={styles.itemText} > estado: {data.uf}</Text>
    </View>
      ): (null) 
  }
       
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    marginTop:15,
    marginBottom:15,
    fontSize:25,
    fontWeight:'bold'
  },
  input:{
    backgroundColor:'#FFF',
    borderColor:'#DDD',
    borderWidth:1,
    borderRadius:5,
    width:'90%',
    padding:10
},
areaBtn:{
  marginTop:15,
flexDirection:'row',
justifyContent:'space-between',


},
botao:{
  height: 50,
  justifyContent:'center',
  alignItems:'center',
  padding:10,
  borderRadius:5,
},
botaoText:{
  fontSize:22,
},
resultado:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
},
itemText:{
  fontSize: 22,

}
});

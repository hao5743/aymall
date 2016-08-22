import {AsyncStorage} from 'react-native';

export default class Local {

    static set(key,value){
        let valueStr = JSON.stringify(value);
        let promise = new Promise(function(resolve, reject) {
            AsyncStorage.setItem(key,valueStr,err => {
                if(err) reject(err);
                else resolve();
            });
        }).catch(err=>{
            console.error('AsyncStorage.setItem error.'+err);
            return err;
        });
        return promise;
    }

   static get(key){
       let promise = new Promise(function(resolve, reject) {
           AsyncStorage.getItem(key,(err,data) => {
               if(err) reject(err);
               else resolve(data);
           });
       })
           .then(data=>JSON.parse(data))
           .catch(err=>{
               console.error('AsyncStorage.getItem error.'+err);
               return err;
           });
       return promise;
   }

   static removeItem(key){
       let promise = new Promise(function(resolve, reject) {
           AsyncStorage.removeItem(key,err => {
               if(err) reject(err);
               else resolve();
           });
       }).catch(err=>{
           console.error('AsyncStorage.removeItem error.'+err);
           return err;
       });
       return promise;
   }

   static clear(){
       let promise = new Promise(function(resolve, reject) {
           AsyncStorage.clear(err => {
               if(err) reject(err);
               else resolve();
           });
       }).catch(err=>{
           console.error('AsyncStorage.clear error.'+err);
           return err;
       });
       return promise;
   }

    static getAllKeys(){
        let promise = new Promise(function(resolve, reject) {
            AsyncStorage.getAllKeys((err,keys) => {
                if(err) reject(err);
                else resolve(keys);
            });
        }).then(keys=>keys)
            .catch(err=>{
            console.error('AsyncStorage.clear error.'+err);
            return err;
        });
        return promise;
    }

}
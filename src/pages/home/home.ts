import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase, { database } from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
// displayName:any;
// familyName:any;
// userId:any;
// imageUrl:any;
// email:any;
// loggedIn = false;
userProfile: any = null;

collage=[];
  dep=[]

  constructor(public navCtrl: NavController,private googlePlus: GooglePlus) {
    this.db.list("pro").snapshotChanges().subscribe(date=>{
      this.collage = date;
      this.dep=date 
    });
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfile = user;
      } else { 
          this.userProfile = null;
      }
   
    });
  
  }
  myfilter(){
    this.collage = this.dep
    var myf=this.collage.filter(f=>{
      return f.payload.val()['name'] == this.selectValue
    });
    this.collage=myf
  }
  loginUser(): void {
    this.googlePlus.login({
      'webClientId': '653069597755-bc7l6om9u6vv0t98m1984p7pd6joe7mi.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
            const googleCredential = firebase.auth.GoogleAuthProvider
                .credential(res.idToken);
   
            firebase.auth().signInWithCredential(googleCredential)
          .then( response => {
              
              alert("hello you are in the firebase")
              
          });
    }, err => {
        console.error("Error: ", err)
        alert(console.error)
    });
  }

// loginface(){
//   this.fb.login(['email']).then(res=>{
//     const fc=firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
//     firebase.auth().signInWithCredential(fc).then(fs=>{
//       alert("hello your in the firebase") 
//       alert(fs.providerData['name'])
//       fs.providerData.forEach(ele => {
//         alert(ele)
//       });
//     }).catch(err=>{
//       alert("firebase error")
//     })
//   }).catch(err=>{
//     alert(JSON.stringify(err))
//   })
// }

//   login(){
//   this.googlePlus.login({
//     'webClientId': '.com.googleusercontent.apps.653069597755-bc7l6om9u6vv0t98m1984p7pd6joe7mi',
//     'offLine':true
//   })
//   .then(res =>{firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc=>{
//   //     console.log(res);
//   // this.displayName = res.displayName;
//   // this.email = res.email;
//   // this.familyName =res.familyName;
//   // this.imageUrl = res.imageUrl;
//   // this.loggedIn = false;
 
  
//       alert ("login succes")
//   }).catch(ns=>{
//     alert("not succes")
 
//   })
// })

// }
//     {console.log(res);
//   this.displayName = res.displayName;
//   this.email = res.email;
//   this.familyName =res.familyName;
//   this.imageUrl = res.imageUrl;
//   this.loggedIn = false;
 
// )
//   .catch(err => console.error(err));
// }
// logout(){
//   this.googlePlus.logout().then(res=>{
//     this.displayName = '';
//     this.email ='';
//     this.familyName ='';
//     this.imageUrl ='';
//     this.loggedIn = true;
//   }).catch(err => console.error(err));
// }
// login(){
// this.googlePlus.login({
//   'webClientId': '.com.googleusercontent.apps.653069597755-bc7l6om9u6vv0t98m1984p7pd6joe7mi'
// }).then((res) => {
//     console.log(res);
// }, (err) => {
//     console.log(err);
// });


}

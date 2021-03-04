import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import database from '@react-native-firebase/database'


export const signup = (data) => async (dispatch) => {
    console.log(data);
    const {name, username, bio, email, password, country, image} = data;

    auth().createUserWithEmailAndPassword(email, password)
    .then((data) => {
        console.log(data);
        console.log("signup succesful")

        database().ref('/users/' + data.user.uid)
        .set({
            name,
            username,
            country,
            image,
            bio,
            uid: data.user.uid
        })
        .then(()=>console.log("data storage sucess"))
        Snackbar.show({
            text:"Account created!",
            textColor:"white",
            backgroundColor:"#1b262c"
        })

    })
    .catch((error)=>{
        console.error(error)
        Snackbar.show({
            text: "Signup failed",
            textColor:"white",
            backgroundColor:"red"
        })
    })
};

export const signin = (data) => async (dispatch) => {
    console.log('ag',data)
    const {email, password} = data

    auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        console.log('Signin success');
        Snackbar.show({
            text:'signed in!',
            textColor:'white',
            backgroundColor:'#1b262c'
        })
    })
    .catch((error) => {
        console.error(error);
        Snackbar.show({
            text: 'Signin Failed',
            textColor:"white",
            backgroundColor:'red'
        })
    } )
}

export const signout = () => async (dispatch) => {
    auth().signOut()
    .then(()=>{
        Snackbar.show({
            text: 'Signed Out',
            textColor:"white",
            backgroundColor:'#1b262c'
        })
    })
    .catch((error) => {
        console.error(error);
        Snackbar.show({
            text: 'Signout Failed',
            textColor:"white",
            backgroundColor:'red'
        })
    })
}
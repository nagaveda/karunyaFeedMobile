import React, {useState} from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';

import {
    Container,
    Form,
    Item,
    Input,
    Text,
    Button,
    Thumbnail,
    Content
} from 'native-base';

import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';

import ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options';

//redux
import propTypes from 'prop-types'
import {signup} from '../action/auth';
import {connect} from 'react-redux';


const Signup = ({navigation, signup}) => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(
        'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
        );
    
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    
    const chooseImage = async () => {
        ImagePicker.showImagePicker(options,(response) => {
            console.log("Response: ", response);
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                // console.log(response);
                uploadImage(response);
              }
        })
    }

    const uploadImage = async (response) => {
        setImageUploading(true);
        const reference = storage().ref(response.fileName)

        const task = reference.putFile(response.path)
        task.on('state_changed', (taskSnapshot) => {
            const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000
            setUploadStatus(percentage)

        })

        task.then(async () => {
            const url = await reference.getDownloadURL()
            setImage(url)
            setImageUploading(false)
        })
        
    }
    
    const doSignUp = async () => {
        signup({
            name,
            username,
            bio,
            country,
            email,
            password,
            image
        })
    }

    return (
        <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={chooseImage}>
                  <Thumbnail large source={{uri: image}} />
                </TouchableOpacity>
              </View>
    
              {imageUploading && (
                <ProgressBar progress={uploadStatus} style={styles.progress} />
              )}
    
              <Form>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="name"
                    value={name}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setName(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="email"
                    value={email}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setEmail(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="password"
                    value={password}
                    secureTextEntry={true}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setPassword(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Username"
                    value={username}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setUsername(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Your Short Bio"
                    value={bio}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setBio(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="country"
                    value={country}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setCountry(text)}
                  />
                </Item>
                <Button regular block onPress={doSignUp}>
                  <Text>SignUp</Text>
                </Button>
                <TouchableOpacity
                onPress={() => navigation.navigate('Signin')}
                style={{marginTop: 10}}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Already have an account? Signin here
                </Text>
              </TouchableOpacity>
              </Form>
            </ScrollView>
          </Content>
        </Container>
      );
}

const mapDispatchToProps = {
    signup: (data) => signup(data)
}

Signup.propTypes = {
    signup: propTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 5,
    },
    progress: {width: null, marginBottom: 20},
    formItem: {
      marginBottom: 20,
    },
  });
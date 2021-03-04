import React from 'react';
import {
    StyleSheet
} from 'react-native';

import {
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text,
    Header
} from 'native-base';

import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signout} from '../action/auth';

//TODO: line 25 only for android need to update for ios

const CustomHeader = ({navigation, authState, signout}) => {
    return(
        <Header
        androidStatusBarColor='#0f4c75'
        style={{
            backgroundColor: "#0f4c75"
        }}
        >
            <Body>
                <Title onPress={()=>{navigation.navigate("Home")}}>karunyaFeed</Title>
            </Body>
                <Right>
                    {
                        authState.isAuthenticated && (
                            <>
                                <Button
                                transparent
                                iconLeft
                                onPress = {()=> navigation.navigate('AddPost')}
                                >
                                    <Text style={{color:"#fdcb9e"}}>Add Post</Text>
                                </Button>

                                <Button
                                transparent
                                onPress = {()=> signout()}
                                >
                                    <Icon name="log-out-outline" style={{color:"red"}}/>
                                </Button>
                            </>
                        ) 
                    }
                </Right>
            

        </Header>
    )
}

const mapStateToProps = (state) => ({
    authState: state.auth
})

const mapDispatchToProps = {
    signout
}

CustomHeader.propTypes = {
    signout: propTypes.func.isRequired,
    authState: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
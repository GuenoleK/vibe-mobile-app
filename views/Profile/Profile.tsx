import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export class ProfileScreen extends React.Component<{navigation: any}> {
    static navigationOptions = {
        title: 'Profile',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>This is a profile screen</Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

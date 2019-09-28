import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export class HomeScreen extends React.Component<{ navigation: any }> {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Hello!</Text>
                <Text>This is the home screen{'\n'}</Text>
                <Button
                    mode="contained"
                    onPress={() => navigate('Profile', { name: 'Jane' })}>
                    Profile
                </Button>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

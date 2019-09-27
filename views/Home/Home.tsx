import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export class HomeScreen extends React.Component<{navigation: any}> {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Hello!</Text>
                <Text>This is the home screen{'\n'}</Text>
                <Button
                    title="Profile"
                    onPress={() => navigate('Profile', { name: 'Jane' })}
                />
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

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { userStore } from '../../stores/user-store';
import { userApi } from '../../api/user-apix';
import { roleAPi } from '../../api/role-api';
import { initializeTranslation } from '../../translation/translation-initializer';
import { headerStore } from '../../stores/header-store';

export class HomeScreen extends React.Component<{ navigation: any }> {

    // Component life cycle
    componentWillMount() {
        userStore.clearUser();
        headerStore.headerTitle = 'Vibe';
    }

    /**
     * Here we initialize the data for everywhere
     */
    async componentDidMount() {
        userStore.user = await userStore.initUserStore();
        if (userStore.user && userStore.user.id) {
            userStore.extendedUser = await userApi.getExtendedUser(userStore.user.id);
            userStore.userRole = await roleAPi.getRoleByUserAndStructure(userStore.user.id, userStore.extendedUser.currentStructure.id);
            if (userStore.user.langKey) {
                initializeTranslation(userStore.user.langKey);
            }
        } else {
            initializeTranslation();
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Hello!</Text>
                <Text>This is the home screen{'\n'}</Text>
                <Button
                    mode="contained"
                    // onPress={() => navigate('Profile', { name: 'Jane' })}>
                    onPress={() => navigate('Login')}>
                    Login
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

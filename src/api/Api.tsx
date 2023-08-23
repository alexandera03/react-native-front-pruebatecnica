import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/usuarios';

const Api = axios.create({ baseURL });


Api.interceptors.request.use(

    async (config) => {
        const emailUser = await AsyncStorage.getItem('email');
        const passUser = await AsyncStorage.getItem('password');
        if (emailUser && passUser) {
            config.data['email'] = emailUser;
            config.data['password'] = passUser;
        }
        return config;
    }
)

export default Api;
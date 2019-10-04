import React, { useEffect, useState } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, AsyncStorage, StyleSheet, Image } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.104:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Your reservation at ${booking.spot.company} for the date ${booking.date} was ${booking.approved ? 'APPROVED' : 'REJECTED'}`);
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 45,
    },
});

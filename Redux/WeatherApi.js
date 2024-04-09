import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const weatherApi = createAsyncThunk('weatherapi', async (arg) => {

    const { latitude, longitude } = arg;
    console.log("Latitude : " + latitude);
    console.log("Longitude : " + longitude);

    let result = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly%2Cminutely&appid=00d49afb60af52a47022d369756ca31a&units=metric`);

    return result.data;
});
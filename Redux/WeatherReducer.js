import { createSlice } from "@reduxjs/toolkit";
import { weatherApi } from "./WeatherApi";

export const weatherslice = createSlice({
    name: 'weatherapi',
    initialState: {
        data: null,
        isLoading: false,
        isError: false,
        latitude: null,
        longitude: null,
    },

    extraReducers: (builder) => {

        builder.addCase(weatherApi.pending, (state, action) => {
            state.isLoading = true;
            console.log('Fetching weather data...');
        });

        builder.addCase(weatherApi.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log('can\'t fetch weather data...');
        });

        builder.addCase(weatherApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            console.log('Weather data is fetched successfully...');
        });
    },

    reducers: {
        locationcords: (state, action) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        }
    },
});

export const { locationcords } = weatherslice.actions;

export default weatherslice.reducer;
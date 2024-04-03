import { configureStore } from "@reduxjs/toolkit";
import weather from './WeatherReducer';

const store = configureStore({
    reducer: {
        api: weather,
    }
});

export default store;
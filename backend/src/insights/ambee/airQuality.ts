import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface AirQualityInfo {
    pollutant: string;
    concentration: number;
    category: string;
}

interface AirQualityStation {
    NO2: number;
    PM10: number;
    PM25: number;
    CO: number;
    SO2: number;
    OZONE: number;
    AQI: number;
    updatedAt: string;
    aqiInfo: AirQualityInfo;
}

interface AirQualityResponse {
    error?: AmbeeError;
    message: string;
    stations: AirQualityStation[];
}

export const getAirQuality = async (lat: number, lng: number): Promise<AirQualityResponse> => {
    try {
        const response = await axios.request({
            url: 'https://api.ambeedata.com/latest/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10) },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
            stations: [],
        };
    }
};

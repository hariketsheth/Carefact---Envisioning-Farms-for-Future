import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface AirQualityHistoryData {
    NO2: number;
    PM10: number;
    PM25: number;
    CO: number;
    SO2: number;
    OZONE: number;
    AQI: number;
    lat: number;
    lng: number;
    createdAt: string;
    postalCode: number;
    majorPollutant: string;
}

interface AirQualityHistoryResponse {
    error?: AmbeeError;
    data: AirQualityHistoryData[];
}

export const getAirQualityHistory = async (
    lat: number,
    lng: number,
    from: string,
    to: string,
): Promise<AirQualityHistoryResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/history/by-lat-lng',
            params: {
                lat: lat.toString(10),
                lng: lng.toString(10),
                from,
                to,
            },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
        } as AirQualityHistoryResponse;
    }
};

import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface WaterVaporLatestData {
    _id: string;
    createdAt: string;
    water_vapor: number;
}

interface WaterVaporLatestResponse {
    error?: AmbeeError;
    message: string;
    data: WaterVaporLatestData[];
}

export const getWaterVaporLatest = async (lat: number, lng: number): Promise<WaterVaporLatestResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/waterVapor/latest/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10) },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
        } as WaterVaporLatestResponse;
    }
};

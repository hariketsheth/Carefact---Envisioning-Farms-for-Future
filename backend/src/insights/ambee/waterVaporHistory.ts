import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface WaterVaporHistoryData {
    _id: string;
    createdAt: string;
    water_vapor: number;
}

interface WaterVaporHistoryResponse {
    error?: AmbeeError;
    message: string;
    data: WaterVaporHistoryData[];
}

export const getWaterVaporHistory = async (
    lat: number,
    lng: number,
    from: string,
    to: string,
): Promise<WaterVaporHistoryResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/waterVapor/history/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10), from: from, to: to },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
        } as WaterVaporHistoryResponse;
    }
};

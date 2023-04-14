import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface PollenCount {
    grass_pollen: number;
    tree_pollen: number;
    weed_pollen: number;
}

interface PollenRisk {
    grass_pollen: string;
    tree_pollen: string;
    weed_pollen: string;
}

interface PollenHistoryData {
    Count: PollenCount;
    Risk: PollenRisk;
}

interface PollenHistoryResponse {
    error?: AmbeeError;
    message: string;
    data: PollenHistoryData[];
}

export const getPollenHistory = async (
    lat: number,
    lng: number,
    from: string,
    to: string,
): Promise<PollenHistoryResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/history/pollen/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10), from: from, to: to },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
        } as PollenHistoryResponse;
    }
};

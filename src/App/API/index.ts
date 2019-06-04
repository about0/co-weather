import axios from 'axios';
import { IResponse, IWeatherData } from '../types';



export const getClosestCities = (): IResponse<IWeatherData> => {
    const url = new URL("http://api.openweathermap.org/data/2.5/box/city");
    url.searchParams.set('bbox', '10,32,15,37,40')
    url.searchParams.set('APPID', '0b0d88caa53156e1c9de49c544d8866f')
    url.searchParams.set('units', 'metric')

    return axios.get(url as unknown as string)
}
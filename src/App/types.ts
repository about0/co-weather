import { AxiosPromise } from "axios";

export interface IResponse<T>
    extends AxiosPromise<{
        list: T[];
        status: {
            offset: number;
            total: number;
        };
    }> { }



export interface IWeatherData {
    name: string;
    main: {
        humidity: number;
        pressure: number;
        temp: number;
        temp_min: number;
        temp_max: number;
    }
}
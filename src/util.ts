import { IWeatherData } from "./App/types";

export const getTableData = (data: IWeatherData[]) =>
    data.map(({ name, main: { humidity, temp } }) => [
        name,
        temp,
        humidity
    ]);

const calcDistance = (num: number, target: number) => Math.abs(num - target)


export const sortCities = (a: IWeatherData, b: IWeatherData, forFemale?: boolean) => {
    const perfTemp = forFemale ? 22 : 21
    const perfHumidity = 50;

    const combinedDistance = (obj: IWeatherData) => calcDistance(obj.main.temp, perfTemp) + calcDistance(obj.main.humidity, perfHumidity)
    const prevTotalDistance = combinedDistance(a);
    const nextTotalDistance = combinedDistance(b);


    if (prevTotalDistance > nextTotalDistance) {
        return 1;
    } else if (prevTotalDistance < nextTotalDistance) {
        return - 1;
    } else {
        return 0
    }
}

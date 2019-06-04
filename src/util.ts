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
    const prevCityTemp = a.main.temp;
    const nextCityTemp = b.main.temp;
    if (calcDistance(prevCityTemp, perfTemp) > calcDistance(nextCityTemp, perfTemp)) {
        return 1;
    } else if (calcDistance(prevCityTemp, perfTemp) < calcDistance(nextCityTemp, perfTemp)) {
        return - 1;
    } else {
        return 0
    }
}

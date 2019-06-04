import { IWeatherData } from "./App/types";

export const getTableData = (data: IWeatherData[]) =>
    data.map(({ name, main: { humidity, temp } }) => [
        name,
        temp,
        humidity
    ]);

const calcDistance = (num: number, target: number) => Math.abs(num - target)

export const getHeatIndex = (T: number, R: number) => {
    const c1 = -8.78469475556,
        c2 = 1.61139411,
        c3 = 2.33854883889,
        c4 = -0.14611605,
        c5 = -0.012308094,
        c6 = -0.0164248277778,
        c7 = 0.002211732,
        c8 = 0.00072546,
        c9 = -0.000003582;

    return c1 + c2 * T + c3 * R + c4 * T * R + c5 * (T ** 2) + c6 * (R ** 2) + c7 * (T ** 2) * R + c8 * T * (R ** 2) + c9 * (T ** 2) * (R ** 2)

}


export const sortCities = (a: IWeatherData, b: IWeatherData, forFemale?: boolean) => {
    const perfTemp = forFemale ? 22 : 21
    const perfHumidity = 50;
    const perfHeatIndex = getHeatIndex(perfTemp, perfHumidity);
    const prevHeatIndex = getHeatIndex(a.main.temp, a.main.humidity);
    const nextHeatIndex = getHeatIndex(b.main.temp, b.main.humidity);

    const prevTotalDistance = calcDistance(prevHeatIndex, perfHeatIndex);
    const nextTotalDistance = calcDistance(nextHeatIndex, perfHeatIndex);

    if (prevTotalDistance > nextTotalDistance) {
        return 1;
    } else if (prevTotalDistance < nextTotalDistance) {
        return - 1;
    } else {
        return 0
    }
}

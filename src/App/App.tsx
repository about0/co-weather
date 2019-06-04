import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { getClosestCities } from './API';
import { IWeatherData } from './types';
import Loader from '../components/Loader';
import ErrorCard from '../components/ErrorCard';
import { AxiosError } from 'axios';
import CityTable from '../components/Table';
import { getTableData, sortCities } from '../util';
import BestCity from '../components/BestCity';
import { Checkbox } from 'baseui/checkbox';
import { Card } from 'baseui/card';

const App: React.FC = () => {
  const [cities, setCities] = useState([] as IWeatherData[]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [isFemale, setIsFemale] = useState(false);

  useEffect(() => {
    setLoading(true);
    getClosestCities()
      .then(res => {
        setCities(res.data.list.sort((a, b) => sortCities(a, b)));
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setErr(err.response!.data.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCities(cities.sort((a, b) => sortCities(a, b, isFemale)));
  }, [isFemale, cities]);

  if (loading) {
    return <Loader />;
  }

  if (err) {
    return <ErrorCard message={err} />;
  }

  return (
    <div className={styles.App}>
      <div className={styles.Left}>
        <Card
          overrides={{ Root: { style: { marginBottom: '40px' } } }}
          title={`About the App`}
        >
          <p>
            This App calculates Heat Index with the{' '}
            <a
              href="https://en.wikipedia.org/wiki/Heat_index#Formula"
              target="_blank"
              rel="noopener noreferrer"
            >
              formula
            </a>
            . It's different for men and women accordingly.
          </p>
          <p>
            You can click on checkbox to test it out. But during the day winning
            city would be the same for both genders.
          </p>
        </Card>
        <Checkbox checked={isFemale} onChange={() => setIsFemale(!isFemale)}>
          Want to see the best city for girls? Check on!
        </Checkbox>
        <BestCity data={cities[0]} isFemale={isFemale} />
      </div>

      <CityTable
        header="Other good cities in desc. order"
        columns={['City', 'Current Temp., ℃', 'Humidity, %']}
        data={getTableData(cities.slice(1))}
      />
    </div>
  );
};

export default App;

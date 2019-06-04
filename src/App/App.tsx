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
        setLoading(false);
        setErr(err.message);
      });
  }, []);

  const handleGenderChange = () => {
    setIsFemale(!isFemale);
    setCities(cities.sort((a, b) => sortCities(a, b, !isFemale)));
  };

  if (loading) {
    return <Loader />;
  }

  if (err) {
    return <ErrorCard message={err} />;
  }

  return (
    <div className={styles.App}>
      <div className={styles.Left}>
        <Checkbox checked={isFemale} onChange={handleGenderChange}>
          Want to see the best city for girls? Check on!
        </Checkbox>
        <BestCity data={cities[0]} isFemale={isFemale} />
      </div>

      <CityTable
        header="Other good cities in desc. order"
        columns={['City', 'Current Temp.', 'Humidity']}
        data={getTableData(cities.slice(1))}
      />
    </div>
  );
};

export default App;

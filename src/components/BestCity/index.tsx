import React from 'react';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { Button } from 'baseui/button';
import { IWeatherData } from '../../App/types';
import { getHeatIndex } from '../../util';

interface IProps {
  data: IWeatherData;
  isFemale: boolean;
}

const BestCity: React.FunctionComponent<IProps> = ({ data, isFemale }) => {
  const getInfo = () =>
    isFemale
      ? `${data.name} is the best for girls!`
      : `Boys are going to find ${data.name} to be the best for them!`;

  const handleClick = () => {
    window.open(`https://en.wikipedia.org/wiki/${data.name}`);
  };

  const { temp, humidity } = data.main;
  const heatIndex = getHeatIndex(temp, humidity).toFixed(2);

  return (
    <Card
      overrides={{ Root: { style: { width: '450px', minHeight: '205px' } } }}
      title={`Best city is: ${data.name}`}
    >
      <StyledBody>
        <p>
          Temp.: <b>{temp} ℃</b>
        </p>
        <p>
          Humidity: <b>{humidity}%</b>
        </p>
        <p>
          Heat Index: <b>{heatIndex}</b>
        </p>
        <p>{getInfo()}</p>
      </StyledBody>
      <StyledAction>
        <Button style={{ width: '100%' }} onClick={handleClick}>
          Interested? Try to find more info! Wikipedia
        </Button>
      </StyledAction>
    </Card>
  );
};

export default BestCity;

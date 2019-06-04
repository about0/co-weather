import React from 'react';
import { Card, StyledBody } from 'baseui/card';
import styles from './Card.module.scss';

interface IProps {
  message: string;
}
const CardComponent: React.FunctionComponent<IProps> = ({ message }) => (
  <div className={styles.Card}>
    <Card
      overrides={{
        Root: {
          style: {
            width: '328px'
          }
        }
      }}
    >
      <StyledBody>
        <p>Something happen during fetching process. Try to reload the page.</p>
        <p>{message}</p>
      </StyledBody>
    </Card>
  </div>
);

export default CardComponent;

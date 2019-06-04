import React from 'react';
import { Spinner } from 'baseui/spinner';

import styles from './Loader.module.scss';

export default () => (
  <div className={styles.Loader}>
    <Spinner size={96} />
  </div>
);

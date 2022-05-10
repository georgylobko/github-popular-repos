import React from 'react';

import RepositoriesList from './RepositoriesList';

import styles from './App.module.css';

function App() {
  return (
      <div className={styles.container}>
        <RepositoriesList />
      </div>
  );
}

export default App;

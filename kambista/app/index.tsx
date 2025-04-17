import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { Logger } from '@/utils/logger';

const App = () => {
  useEffect(() => {
    Logger.log(`🤑 Starting Kambista App.`);
  }, []);

  return <Redirect href="/sign-in" />;
};

export default App;

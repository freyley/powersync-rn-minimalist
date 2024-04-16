import '@azure/core-asynciterator-polyfill';
import 'react-native-polyfill-globals/auto';
import { PowerSyncContext, RNQSPowerSyncDatabaseOpenFactory } from '@journeyapps/powersync-sdk-react-native';
import { ReactNode, useMemo } from 'react';

import { BackendConnector } from './connector';
import { AppSchema } from './AppSchema';

const factory = new RNQSPowerSyncDatabaseOpenFactory({
  AppSchema,
  dbFilename: 'db.sqlite'
  //location: 'optional location directory to DB file'
});

const connector = new BackendConnector();

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {

  const powerSync = useMemo(() => {
    const powerSync = factory.getInstance();
    powerSync.init();
    powerSync
      .connect(connector)
      .then(() => console.log('connected'))
      .catch((err) => console.error("error!", err));

    return powerSync;
  }, []);

  return <PowerSyncContext.Provider value={powerSync}>{children}</PowerSyncContext.Provider>;
};
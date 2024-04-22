import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-polyfill-globals/auto';
import '@azure/core-asynciterator-polyfill';

import { usePowerSyncWatchedQuery } from '@journeyapps/powersync-sdk-react-native';

import { PowerSyncProvider } from './library/provider';
import { LIST_TABLE, TODO_TABLE } from './library/AppSchema';
import { ScrollView } from 'react-native';
import React from 'react';


export default function App() {
    // The outer layer of this app, the entire purpose of this is to wrap everything in the PowerSyncProvider
    return (
        <PowerSyncProvider>
            <Page/>
        </PowerSyncProvider>
    );
}

function Page() {
    const listRecords = usePowerSyncWatchedQuery<ListRecord>(`
        SELECT
          api_list.*
        FROM
          api_list
        `);
  console.log(listRecords);
  return (
    <View style={styles.container}>
      <ScrollView key={'lists'} style={{ maxHeight: '90%' }}>
          {listRecords.map((r) => (
            <Text key="{{r.id}}">{r.name} / {r.id}</Text>
          ))}
      </ScrollView>
      <Text>You've reached the end of your todos. </Text>
      <StatusBar style="auto" />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

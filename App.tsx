import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-polyfill-globals/auto';
import '@azure/core-asynciterator-polyfill';

import { usePowerSyncWatchedQuery } from '@journeyapps/powersync-sdk-react-native';

import { PowerSyncProvider } from './library/provider';
import { LIST_TABLE, TODO_TABLE, ListRecord } from './library/AppSchema';
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

    const listRecords = usePowerSyncWatchedQuery<ListRecord & { total_tasks: number; completed_tasks: number }>(`
        SELECT
          ${LIST_TABLE}.*, COUNT(${TODO_TABLE}.id) AS total_tasks, SUM(CASE WHEN ${TODO_TABLE}.completed = true THEN 1 ELSE 0 END) as completed_tasks
        FROM
          ${LIST_TABLE}
        LEFT JOIN ${TODO_TABLE}
          ON  ${LIST_TABLE}.id = ${TODO_TABLE}.list_id
        GROUP BY
          ${LIST_TABLE}.id;
        `);
  console.log(listRecords);
  return (
    <View style={styles.container}>
      <ScrollView key={'lists'} style={{ maxHeight: '90%' }}>
          {listRecords.map((r) => (
            <Text>{r.name} / {r.id}</Text>
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

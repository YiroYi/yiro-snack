import React from 'react';
import { Text, View, StyleSheet, ViewBase } from "react-native";
import { colors } from "../../utils/colors";
import { spacing } from '../../utils/sizes';

export const Timer = ({ focusSubject }) => {
  return (
    <View style={styles.container}>
      <View style={{paddingTop: spacing.xxl}}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold"
  },
});

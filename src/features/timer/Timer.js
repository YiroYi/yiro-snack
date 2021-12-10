import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibrate, Platform, Vibration } from 'react-native';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';

import { useKeepAwake } from "expo-keep-awake";

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject }) => {
  useKeepAwake()

  const [isStarted, setIsStarted] = useState(false)
  const [progress, setProgress] = useState(1)
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const vibrate = () => {
    if(Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000)
      setTimeout(() => clearInterval(interval), 1000)
    } else {
      Vibration.vibrate(10000)
    }
  }

  const changeTime = (min) => {
    setMinutes(min)
    setProgress(1)
    setIsStarted(false)
  }

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </ View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </ View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="stop" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
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
    fontWeight: "bold",
  },
  countdown: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    padding: 50
  },
});

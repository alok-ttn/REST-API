/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ceil} from 'react-native-reanimated';

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.opacity = 0;
    this.animatedValue = new Animated.Value(this.opacity);
  }
  animate = () => {
    this.opacity = this.opacity === 0 ? 1 : 0;
    Animated.timing(this.animatedValue, {
      toValue: this.opacity,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    // this.opacity.setValue(1);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.animationView}>
          <Animated.Text
            style={{
              //   opacity: this.animatedValue,
              fontSize: 20,
              //   marginTop: this.animatedValue.interpolate({
              //     inputRange: [0, 1],
              //     outputRange: [0, 200],
              //   }),
              //   marginLeft: this.animatedValue.interpolate({
              //     inputRange: [0, 1],
              //     outputRange: [0, 200],
              //   }),
              transform: [
                {
                  translateX: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                },
                {
                  translateY: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                },
                {
                  rotate: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                {
                  scale: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 2],
                  }),
                },
              ],
            }}>
            Animated Text
          </Animated.Text>
        </View>
        <TouchableOpacity
          onPress={() => this.animate()}
          style={styles.buttonView}>
          <Text>Press here to animate</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  animationView: {
    flex: 0.5,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    backgroundColor: '#a1b2c3',
    flex: 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});

export default Animation;

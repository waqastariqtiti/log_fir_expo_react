import React, { useEffect } from 'react';
import { StyleSheet, Image, View, Animated } from 'react-native';
import { router, Router } from 'expo-router';

const logo = require('../assets/images/logo.png');

const Index = () => {
  const scaleAnim = new Animated.Value(1); // Start at normal size (scale 1)

  useEffect(() => {
    // Start the animation
    Animated.timing(scaleAnim, {
      toValue: 1.1, // Slightly enlarge the logo
      duration: 2000, // 2 seconds animation
      useNativeDriver: true,
    }).start(() => {
      // Navigate to Splash Screen after animation
      setTimeout(() => {
        router.push('Splash'); // Replace to Splash Screen
      }, 2000); // Delay for 2 seconds
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              {
                scale: scaleAnim, // Scale the logo based on animation
              },
            ],
          },
        ]}
      >
        <Image style={styles.logo} source={logo} />
      </Animated.View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#219EBC', // Set the background color
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 100, // Make the image circular
    borderWidth: 5, // Add a border
    borderColor: '#FB8500', // Set border color
  },
});

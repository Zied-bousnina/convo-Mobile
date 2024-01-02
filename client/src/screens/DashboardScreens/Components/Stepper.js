/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Divider, Step, Stepper } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const HorizontalLinearStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ActivityIndicator animating={true} color={MD2Colors.red800} />
  );
};

export default HorizontalLinearStepper;

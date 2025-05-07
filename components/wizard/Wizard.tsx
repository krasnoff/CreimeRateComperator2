import React, { ReactNode, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export interface WizardProps {
    children?: ReactNode | ReactNode[];
    handleSetCurrentStep?: (currentStep: number) => void
}

export function Wizard({children, handleSetCurrentStep}: WizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [numOfSteps, setNumOfSteps] = useState<number>(0);

  useEffect(() => { 
    setNumOfSteps(React.Children.count(children))
  }, [])

  const nextStep = () => {
    if (currentStep < numOfSteps - 1) {
      setCurrentStep(currentStep + 1);
      handleSetCurrentStep?(currentStep + 1) : null;
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      handleSetCurrentStep?(currentStep - 1) : null;
    }
  };

  const newQuery = () => {
    setCurrentStep(0);
    handleSetCurrentStep?(0) : null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {numOfSteps > 0 ? React.Children.map(children, (child, index) => (
          (index == currentStep) ?
            <>{child}</>
          : null
        )) : <><Text>No children in here</Text></>}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}><Button title="הקודם" onPress={prevStep} disabled={currentStep === 0} /></View>
        <View style={styles.button}><Button title="הבא" onPress={nextStep} disabled={numOfSteps - 1 === currentStep} /></View>
        <View style={styles.button}><Button title="שאילתה חדשה" onPress={newQuery} disabled={!(numOfSteps - 1 === currentStep)} /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 0 },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 0, width: '100%' },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%',
    direction: 'rtl',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    width: '33%',
  }
});

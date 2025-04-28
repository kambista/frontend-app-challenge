import { View, Text, StyleSheet } from 'react-native';

export const TransactionStepper = ({ currentStep = 0 }) => {
  const steps = ['Completa', 'Transfiere', 'Constancia'];

  return (
    <View style={styles.container}>
      <View style={styles.linesContainer}>
        {steps.map((_, index) =>
          index < steps.length - 1 ? (
            <View
              key={index}
              style={[
                styles.line,
                index < currentStep ? styles.activeLine : styles.inactiveLine,
              ]}
            />
          ) : null,
        )}
      </View>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <View
              style={[
                styles.circle,
                index <= currentStep
                  ? styles.activeCircle
                  : styles.inactiveCircle,
              ]}
            />
            <Text
              style={[
                styles.label,
                index <= currentStep
                  ? styles.activeLabel
                  : styles.inactiveLabel,
              ]}
            >
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  linesContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 4,
    left: 0,
    right: 0,
    paddingHorizontal: '16%',
    zIndex: 0,
  },
  line: {
    height: 2,
    flex: 1,
  },
  activeLine: {
    backgroundColor: '#000000',
  },
  inactiveLine: {
    backgroundColor: '#BBBBBB',
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 1,
  },
  stepItem: {
    alignItems: 'center',
    width: '33.33%',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  activeCircle: {
    backgroundColor: '#000000',
  },
  inactiveCircle: {
    backgroundColor: '#BBBBBB',
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#000000',
    fontWeight: 'bold',
  },
  inactiveLabel: {
    color: '#BBBBBB',
  },
});

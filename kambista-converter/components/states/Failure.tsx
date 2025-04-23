import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

interface FailureProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
}

export const Failure: React.FC<FailureProps> = ({
  isVisible,
  onClose,
  message,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View
          style={styles.container}
          className="bg-white rounded-t-3xl py-6 items-center"
        >
          <Text
            className="font-montserrat-semibold text-lg text-secondary mb-2 text-center"
            style={styles.textMain}
          >
            ¡Vaya!
          </Text>

          {message ? (
            <Text
              className="font-montserrat text-secondary text-center mb-6"
              style={styles.message}
            >
              {message.split(/(n[úu]mero de documento)/i).map((part, index) => {
                if (/n[úu]mero de documento/i.test(part)) {
                  return (
                    <Text
                      key={index}
                      className="font-montserrat-semibold"
                      style={styles.message}
                    >
                      {part}
                    </Text>
                  );
                }
                return part;
              })}
            </Text>
          ) : (
            <Text
              className="font-montserrat text-secondary text-center mb-6"
              style={styles.message}
            >
              El{' '}
              <Text className="font-montserrat-semibold" style={styles.message}>
                número de documento
              </Text>{' '}
              registrado ya está en uso.
            </Text>
          )}

          <TouchableOpacity
            className="bg-secondary rounded-xl w-full py-4 items-center mb-4"
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text
              className="text-white font-montserrat-medium"
              style={styles.textButton}
            >
              ACEPTAR
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center justify-center mt-1.5">
            <Text
              className="font-montserrat text-secondary"
              style={styles.textSecondary}
            >
              ¿Problemas?{' '}
            </Text>
            <Link href="/support" asChild>
              <TouchableOpacity>
                <Text
                  className="font-montserrat text-secondary underline"
                  style={styles.textSecondary}
                >
                  Contacta a soporte
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  message: {
    fontSize: 16,
  },
  textMain: {
    fontSize: 20,
  },
  textButton: {
    fontSize: 14,
  },
  textSecondary: {
    fontSize: 14,
  },
});

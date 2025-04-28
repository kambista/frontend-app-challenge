import { View, Text, StyleSheet } from 'react-native';

interface Props {
  sendAmount: string;
  receiveAmount: string;
  coupon?: string;
  usedRate: string;
  marketRate: string;
}

export const TransactionSummary: React.FC<Props> = ({
  sendAmount,
  receiveAmount,
  coupon,
  usedRate,
  marketRate,
}) => (
  <View style={styles.card}>
    <Row label="Tú envías" value={sendAmount} />
    <Row label="Tú recibes" value={receiveAmount} />
    {coupon && <Row label="Cupón aplicado" value={coupon} />}
    <View style={styles.separator} />
    <View className="flex-row justify-between items-center">
      <Text
        className="text-secondary font-montserrat-bold"
        style={{ fontSize: 12 }}
      >
        Tipo de cambio utilizado
      </Text>
      <View className="flex-row items-center space-x-1">
        <Text style={styles.rateMarketTachado}>{marketRate}</Text>
        <Text style={styles.rateUsed}>{usedRate}</Text>
      </View>
    </View>
  </View>
);

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <View className="flex-row justify-between mb-1">
    <Text
      className="text-secondary font-montserrat-light"
      style={{ fontSize: 14 }}
    >
      {label}
    </Text>
    {typeof value === 'string' ? (
      <Text
        className="text-secondary font-montserrat-bold"
        style={{ fontSize: 14 }}
      >
        {value}
      </Text>
    ) : (
      value
    )}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#00000033',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    width: '100%',
  },
  separator: {
    marginTop: 8,
    marginBottom: 8,
    borderBottomColor: '#686868',
    borderBottomWidth: 1,
  },
  rateUsed: {
    color: '#060F26',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  rateMarketTachado: {
    color: '#EF4444',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
});

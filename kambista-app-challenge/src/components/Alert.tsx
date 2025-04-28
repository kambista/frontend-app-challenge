import { InfoIcon } from "lucide-react-native"
import { Text, View } from "react-native"
import KambistaColors from "../utils/colors";

export enum AlertType {
  info = 'Info',
  warning = 'warning'
}

type Props = {
  label: String,
  type?: AlertType,
}

export default function AlertMessage({label, type = AlertType.info}: Props){
  const textColor = type == AlertType.info ? 'text-informativeDark' : 'text-highlightDark';
  const bgColor = type == AlertType.info ? 'bg-informativeLight' : 'bg-highlight';
  return (
    <View className={`rounded-md py-3 px-4 ${bgColor}`}>
      <View className="flex-row gap-3 items-center">
        <InfoIcon 
          size={16} 
          color={type == AlertType.info ? KambistaColors.informativeDark : KambistaColors.highlightDark}
        />
        <Text className={`font-mont text-xs flex-1 ${textColor}`}>{label}</Text>
      </View>
    </View>
  )
}
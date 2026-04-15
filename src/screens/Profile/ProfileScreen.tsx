import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { CARD_ELEVATION_STYLE } from "../../constants/colors";
import type { TipoDocumento } from "../../services/auth/auth.types";
import { useAuthStore } from "../../stores/auth/authStore";
import util from "../../utils/util";

const TIPO_DOCUMENTO_LABEL: Record<TipoDocumento, string> = {
  dni: "DNI",
  cce: "CCE",
  pasaporte: "Pasaporte",
};

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const session = useAuthStore((state) => state);

  return (
    <SafeAreaView className="flex-1 bg-kambista-screen" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 32,
          paddingBottom: 32,
          paddingTop: 24,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!user ? (
          <View className="flex-1 justify-center py-12">
            <Text className="text-center text-base text-kambista-muted">
              No hay datos de usuario disponibles.
            </Text>
          </View>
        ) : (
          <>
            <Text className="mb-6 text-2xl font-bold text-kambista-navy">
              Perfil
            </Text>

            <View className="mb-6 flex-row items-center gap-3">
              <Icon name="person" size={28} color="#0A1F33" />
              <View className="min-w-0 flex-1">
                <Text
                  className="text-xl font-bold text-kambista-navy"
                  numberOfLines={2}
                >
                  {user.nombresCompletos}
                </Text>
                <Text
                  className="mt-0.5 text-sm text-kambista-muted"
                  numberOfLines={1}
                >
                  {user.email}
                </Text>
              </View>
            </View>

            <View
              className="rounded-2xl bg-white p-5"
              style={CARD_ELEVATION_STYLE}
            >
              <View className="mb-4">
                <Text className="text-xs text-kambista-muted">
                  Correo electrónico
                </Text>
                <Text className="mt-1 text-base font-semibold text-kambista-navy">
                  {user.email}
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-xs text-kambista-muted">Documento</Text>
                <Text className="mt-1 text-base font-semibold text-kambista-navy">
                  {TIPO_DOCUMENTO_LABEL[user.tipoDocumento]} ·{" "}
                  {user.numeroDocumento}
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-xs text-kambista-muted">Celular</Text>
                <Text className="mt-1 text-base font-semibold text-kambista-navy">
                  {user.celular}
                </Text>
              </View>
              <View>
                <Text className="text-xs text-kambista-muted">
                  Fecha de nacimiento
                </Text>
                <Text className="mt-1 text-base font-semibold text-kambista-navy">
                  {util.formatFechaNacimiento(user.fechaNacimiento)}
                </Text>
              </View>
            </View>

            <View className="mt-8">
              <Button
                variant="fill"
                tone="navySolid"
                onPress={() => session.clearSession()}
              >
                Cerrar sesión
              </Button>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Info, User } from 'lucide-react-native';
import { router } from 'expo-router';

const ProfileScreen = () => {

    const handleLogOut = () => {
        router.navigate("/auth/login")
    }

    return (
        <ScrollView className="flex-1 bg-white p-6">
            {/* Foto de perfil */}
            <View className="items-center mb-6">
                <User size={30} color={"#000000"} />
                <Text className="text-gray-700 text-lg font-bold">Romel Carrasco</Text>
                <Text className="text-gray-400 text-sm">romel@gmail.com</Text>
            </View>

            {/* Datos del usuario */}
            <View className="bg-gray-100 rounded-lg p-4 mb-6">
                <View className="mb-4">
                    <Text className="text-gray-400 text-xs">Teléfono</Text>
                    <Text className="text-gray-700 text-base">+51 987 654 321</Text>
                </View>
                <View className="mb-4">
                    <Text className="text-gray-400 text-xs">Documento de Identidad</Text>
                    <Text className="text-gray-700 text-base">DNI: 12345678</Text>
                </View>
                <View>
                    <Text className="text-gray-400 text-xs">Dirección</Text>
                    <Text className="text-gray-700 text-base">Av. Principal 123, Lima</Text>
                </View>
            </View>

            {/* Botones */}

            <TouchableOpacity className="bg-primary py-4 rounded-xl mb-4 items-center">
                <Text className="text-white font-bold text-base">Editar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity className="border-2 border-primary py-4 rounded-xl items-center"
                onPress={handleLogOut}
            >
                <Text className="text-primary font-bold text-base">Cerrar Sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    )
};

export default ProfileScreen;
import { Link, router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { User2 } from 'lucide-react-native';
import { useAuthStore } from '../../features/auth/store/auth';
import { Logo } from '../../features/home/components/logo';

export const RegisterScreen = () => {

    const { isAuthenticated } = useAuthStore();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        getValues, reset
    } = useForm({
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        }
    });

    const {
        register: registerUser,
    } = useAuthStore();

    const handleRegister = () => {
        // Lógica para manejar el registro
        registerUser(getValues('username'), getValues('email'), getValues('password'));
    };

    useEffect(() => {
        if (isAuthenticated) {
            router.navigate('/home');
            reset();
        }
    }, [isAuthenticated]);

    return (
        <View className=" w-full flex-1 justify-center items-center px-2 bg-white">
            <View className='w-full flex flex-col px-4 py-5'>
                <View className='w-full h-36 flex flex-row justify-center items-center rounded-full bg-white px-2 pt-1.5'>
                    <Logo />
                </View>

                <Text className='text-left text-[#686868]'>Correo electrónico</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="w-full px-4 py-3 rounded-lg bg-white mb-4 border border-[#E0E0E0] text-base"
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Text className='text-left text-[#686868]'>Nombre de Usuario</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    name="username"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="w-full px-4 py-3 rounded-lg bg-white mb-4 border border-[#E0E0E0] text-base"
                            placeholder="Username"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Text className='text-left text-[#686868]'>Contraseña</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: {
                            value: 8,
                            message: 'La contraseña debe tener al menos 8 caracteres',
                        },
                    }}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="w-full px-4 py-3 rounded-lg bg-white mb-4 border border-[#E0E0E0] text-base"
                            placeholder="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />

                <Text className='text-left  text-[#686868]'>Confirme la contraseña</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        validate: (value) => {
                            if (value !== getValues('password')) {
                                return 'Las contraseñas no coinciden';
                            }
                            return true;
                        },
                    }}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="w-full px-4 py-3 rounded-lg bg-white mb-4 border border-[#E0E0E0] text-base"
                            placeholder="Confirm Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />

                <View className='flex flex-col pb-3'>
                    {
                        errors.email?.type === 'required' && (
                            <Text className="text-red-500">* El correo electrónico es requerido</Text>
                        )
                    }
                    {
                        errors.username?.type === 'required' && (
                            <Text className="text-red-500">* El nombre de usuario es requerido</Text>
                        )
                    }

                    {
                        errors.password?.type === 'required' && (
                            <Text className="text-red-500">* La contraseña es requerida</Text>
                        )
                    }
                    {
                        errors.password?.type === 'minLength' && (
                            <Text className="text-red-500">* {errors.password?.message}</Text>
                        )
                    }

                    {
                        errors.confirmPassword?.type === 'required' && (
                            <Text className="text-red-500">* Confirme la contraseña</Text>
                        )
                    }
                    {
                        errors.confirmPassword?.type === 'validate' && (
                            <Text className="text-red-500">* Las contraseñas no coinciden</Text>
                        )
                    }

                </View>

                <TouchableOpacity
                    onPress={handleSubmit(handleRegister)}
                    className={`
                            bg-primary w-full p-4 rounded-lg
                            transition-opacity duration-200 flex flex-row justify-center items-center
                            ${ !getValues('email') || !getValues('password') ? 'opacity-50' : '' }
                          `}
                    disabled={!getValues('email') || !getValues('password')}
                >
                    <User2 size={24} className="text-white mr-2" />
                    <Text className="text-white font-bold text-lg">Register</Text>
                </TouchableOpacity>

                <View className="mt-2 flex-row">
                    <Text className="text-gray-700 pr-1">¿tienes una cuenta? </Text>
                    <Link
                        href='/auth/login'
                        className="border-b border-[#686868]"
                    >
                        <Text className="text-[#686868] text-sm font-bold">Login</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
};
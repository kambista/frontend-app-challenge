import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeClosed } from 'lucide-react-native';
import Checkbox from 'expo-checkbox';
import { useAuthStore } from '../../features/auth/store/auth';
import { Logo } from '../../features/home/components/logo';

interface FormValues {
    email: string;
    password: string;
}

export const LoginScreen: React.FC = () => {

    const { login, isAuthenticated } = useAuthStore();
    const [isChecked, setChecked] = useState(false);

    const [isShow, setIsShow] = useState(true);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
        watch
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur'
    })

    const handleLogin = () => {
        // Lógica para el inicio de sesión
        console.log({ email: getValues('email'), password: getValues('password') });
        // login(getValues('email'), getValues('password'));
        router.navigate('/onboarding');

        reset()
    };

    const handleBack = () => {
        router.navigate('/(tabs)/home');
    }

    useEffect(() => {
        if (isAuthenticated) {
            router.navigate('/(tabs)/home');
            reset();
        }
    }, [isAuthenticated]);

    // const isDisabled = !watch('email') || !watch('password') || watch('password').length < 6 || !isChecked || Object.keys(errors).length > 0;

    const errorMessages = Object.entries(errors).map(([fieldName, errorObj]) => {
        if (errorObj?.message) {
            return errorObj.message;
        }
        return null;
    }).filter(Boolean);

    return (
        <View className=" w-full flex-1 justify-center items-center px-2 bg-white">

            <View className='flex flex-col justify-center items-center w-full rounded-3xl py-5 px-3'>
                <View className='w-full h-auto flex flex-col justify-center items-center  bg-white px-2 mb-16'>
                    <Logo />
                    <Text className='w-36 py-1.5 rounded-full text-black text-2xl font-bold text-center'>Inicia sesión</Text>
                </View>

                <View className='w-full flex flex-col px-3 mb-4'>
                    <Text className='text-left pb-1 text-[#686868]'>Correo electrónico</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: "El correo es obligatorio",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Ingrese un correo válido",
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                className={`px-4 py-3 rounded-lg bg-white border text-base
                                    ${ errors.email ? 'border-red-500' : 'border-[#E0E0E0] ' }
                                    `}
                            />
                        )}
                        name="email"
                    />
                    {
                        errors.email &&
                        <Text className="text-red-500">{errors.email.message}</Text>
                    }
                </View>

                <View className='w-full flex flex-col px-3 mb-4'>
                    <Text className='text-left pb-1 text-[#686868]'>Contraseña</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres",
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View className='relative'>
                                <TextInput
                                    placeholder="Password"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={isShow}
                                    className={`w-full px-4 py-3 rounded-lg bg-white border text-base
                                        ${ errors.password ? 'border-red-500' : 'border-[#E0E0E0] ' }
                                        `}
                                />
                                {
                                    isShow ?
                                        <TouchableOpacity className='absolute right-4 top-4' onPress={() => setIsShow(false)}>
                                            <Eye className='w-5 h-5' color={"black"} size={24} strokeWidth={1} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity className='absolute right-4 top-4' onPress={() => setIsShow(true)}>
                                            <EyeClosed className='w-5 h-5' color={"black"} size={24} strokeWidth={1} />
                                        </TouchableOpacity>
                                }
                            </View>
                        )}
                        name="password"
                    />
                    {
                        errors.password &&
                        <Text className="text-red-500">{errors.password.message}</Text>
                    }
                </View>

                <View className='w-full px-4 flex flex-row items-center justify-between '>
                    <View className='flex flex-row items-center'>
                        <Checkbox
                            className='p-2 rounded-md border border-[#686868]'
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? '#00e3c2' : undefined}
                        />
                        <Text className="text-[#686868] text-sm font-semibold pl-1"
                            onPress={() => setChecked(!isChecked)}
                        >
                            Recordarme
                        </Text>
                    </View>
                    <Link
                        href={'/auth/forgot-password'}
                        className='border-b border-[#686868]'
                    >
                        <Text className="text-[#686868] text-sm font-semibold mt-5 ">
                            Olvidaste tu contraseña
                        </Text>
                    </Link>
                </View>

                {/* <View className='w-full px-3 flex flex-col pt-2'>
                    {
                        errorMessages.map((errorMessage, index) => {
                            return (
                                <Text key={index} className='text-red-500 text-sm'>* {errorMessage}</Text>
                            )
                        })
                    }
                </View> */}

                <View className='w-full flex flex-col px-3 mt-16'>
                    <TouchableOpacity
                        className={`
                            bg-primary w-full p-4 rounded-lg items-center
                            transition-opacity duration-200
                          `}
                        onPress={handleSubmit(handleLogin)}
                    >
                        <Text
                            className='text-black font-semibold text-sm'
                        >INICIA SESIÓN</Text>
                    </TouchableOpacity>
                </View>

                <View className='flex flex-col items-center px-3 pt-3'>
                    <View className='flex flex-row justify-center items-center '>
                        <Text className="text-[#686868] text-sm font-bold ">
                            ¿No tienes una cuenta?{" "}
                        </Text>
                        <Link
                            href={'/auth/register'}
                            className='border-b border-[#686868]'
                        >
                            <Text className="text-[#686868] text-sm font-bold ">
                                Registrate aquí
                            </Text>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    );
};
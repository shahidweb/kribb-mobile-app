import { useSignIn } from '@clerk/expo';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';


type VerifyProps = {
    onVerify: (code: string) => void;
};



export default function Verify({ onVerify }: VerifyProps) {
    const { signIn } = useSignIn();
    const [code, setCode] = useState('');
    const isLoading = false;
    const onResendCode = () => signIn.mfa.sendEmailCode()

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }} className='bg-white' keyboardShouldPersistTaps='handled'>
            <View className='flex-1 justify-center px-6 py-12'>
                <Text className='font-bold'>Kribb Logo</Text>
                <Text className='text-3xl font-bold text-gray-800 mb-2'>Verify your account</Text>
                <Text className='text-gray-500 mb-8'>We sent a code to</Text>
                <View className='gap-3 mb-4'>
                    <TextInput className='flex-1 border border-gray-300 rounded-xl px-4 py-3'
                        value={code} onChangeText={setCode}
                        keyboardType='number-pad'
                        placeholder='Enter verfication code' placeholderTextColor="#9CA3AF" autoCapitalize='words' />

                </View>
                <TouchableOpacity onPress={() => onVerify(code)} disabled={isLoading}
                    className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4">
                    {isLoading ? <ActivityIndicator color='white' /> : (
                        <Text className='text-white font-bold'>Verify</Text>
                    )}
                </TouchableOpacity>
                <View className='flex-row justify-center'>
                    <Text className='text-gray-500'>I need a new code.</Text>
                    <Text onPress={onResendCode} className='text-blue-600 font-semibold'> Resend</Text>
                </View>
            </View>
        </ScrollView>
    )
}
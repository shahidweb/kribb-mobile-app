import { useSignIn } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()
  const isLoading = fetchStatus === 'fetching';

  const onSignin = async () => {
    const { error } = await signIn.password({
      emailAddress: email,
      password,
    })
    if (error) {
      alert(error.message)
      return;
    }
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session.currentTask) {
            console.log(session.currentTask);
            return;
          }
          const url = decorateUrl('/');
          router.replace(url as any)
        }
      })
    }
    else if (signIn.status === "needs_second_factor") {
      await signIn.mfa.sendPhoneCode();
    }
    else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find((factor) => factor.strategy === 'email_code');
      if (emailCodeFactor) await signIn.mfa.sendEmailCode();
    } else {
      console.error("Sing in attempt not complete:", signIn)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-white' keyboardShouldPersistTaps='handled'>

      <View className='flex-1 justify-center px-6 py-12'>
        <Text className='font-bold'>Kribb Logo</Text>
        <Text className='text-3xl font-bold text-gray-800 mb-2'>LogIn Account</Text>
        <Text className='text-gray-500 mb-8'>Find your dream home today</Text>

        <View className='gap-3 mb-4'>
          <TextInput className='flex-1 border border-gray-300 rounded-xl px-4 py-3'
            value={email}
            onChangeText={setEmail}
            placeholder='Email' placeholderTextColor="#9CA3AF" autoCapitalize='words' />
          {errors.fields.identifier && (
            <Text className='text-red-500 mb-4'>{errors.fields.identifier.message}</Text>
          )}

          <TextInput className='flex-1 border border-gray-300 rounded-xl px-4 py-3'
            value={password}
            onChangeText={setPassword}
            placeholder='Password' placeholderTextColor="#9CA3AF" autoCapitalize='words' />
          {errors.fields.password && (
            <Text className='text-red-500 mb-4'>{errors.fields.password.message}</Text>
          )}
        </View>
        <TouchableOpacity onPress={onSignin} disabled={isLoading}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? <ActivityIndicator color='white' /> : (
            <Text className='text-white font-bold'>Sign In</Text>
          )}
        </TouchableOpacity>
        <View className='flex-row justify-center'>
          <Text className='text-gray-500'>Don't have an account?</Text>
          <Link href="/sign-up">
            <Text className='text-blue-600 font-semibold'> Sign Up</Text>
          </Link>
        </View>
        <View nativeID='clerk-captcha' />
      </View>
    </ScrollView>
  )
}
import { useAuth, useSignUp } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Verify from './verify';

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn, isLoaded } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);


  const router = useRouter()

  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isLoading = fetchStatus === 'fetching'
  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName: fname,
      lastName: lname
    })
    if (error) {
      alert(error.message)
      return;
    }
    if (!error) await signUp.verifications.sendEmailCode();

    if (signUp.status === "missing_requirements" &&
      signUp.unverifiedFields.includes("email_address") &&
      signUp.missingFields.length == 0) {
      setIsVerifying(true)
    }
  }

  const handleVerify = async (code: string) => {
    try {
      await signUp.verifications.verifyEmailCode({ code });
      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: ({ decorateUrl }) => {
            const url = decorateUrl('/');
            router.replace(url as any)
          }
        })
      }
      setIsVerifying(false)
    } catch (err) {
      console.log("Verification error:", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-white' keyboardShouldPersistTaps='handled'>
      {isVerifying ? (
        <Verify onVerify={handleVerify} />
      ) : (
        <View className='flex-1 justify-center px-6 py-12'>
          <Text className='font-bold'>Kribb Logo</Text>
          <Text className='text-3xl font-bold text-gray-800 mb-2'>Create Account</Text>
          <Text className='text-gray-500 mb-8'>Find your dream home today</Text>
          <View className='flex-row gap-3 mb-4'>
            <TextInput className='flex-1 border border-gray-300 rounded-xl px-4 py-3'
              value={fname}
              onChangeText={setFName}
              placeholder='First name' placeholderTextColor="#9CA3AF" autoCapitalize='words' />
            <TextInput className='flex-1 border border-gray-300 rounded-xl px-4 py-3'
              value={lname}
              onChangeText={setLName}
              placeholder='Last name' placeholderTextColor="#9CA3AF" autoCapitalize='words' />
          </View>
          <View className='gap-3 mb-4'>
            <TextInput className='flex-1 border border-gray-300 rounded-xl px-4 py-3'
              value={email}
              onChangeText={setEmail}
              placeholder='Email' placeholderTextColor="#9CA3AF" autoCapitalize='words' />
            {errors.fields.emailAddress && (
              <Text className='text-red-500 mb-4'>{errors.fields.emailAddress.message}</Text>
            )}

            <TextInput className='flex-1 border border-gray-300 rounded-xl px-4 py-3'
              value={password}
              onChangeText={setPassword}
              placeholder='Password' placeholderTextColor="#9CA3AF" autoCapitalize='words' />
            {errors.fields.password && (
              <Text className='text-red-500 mb-4'>{errors.fields.password.message}</Text>
            )}
          </View>
          <TouchableOpacity onPress={onSignUpPress} disabled={isLoading}
            className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
          >
            {isLoading ? <ActivityIndicator color='white' /> : (
              <Text className='text-white font-bold'>Sign up</Text>
            )}
          </TouchableOpacity>
          <View className='flex-row justify-center'>
            <Text className='text-gray-500'>Already have an account?</Text>
            <Link href="/sign-in">
              <Text className='text-blue-600 font-semibold'> Sign In</Text>
            </Link>
          </View>
          <View nativeID='clerk-captcha' />
        </View>
      )}
    </ScrollView>
  )
}
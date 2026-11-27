import { useAuth } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  const { signOut } = useAuth()
  const router = useRouter()


  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50 p-5'>
      <View>
        <Text>Profile</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>SignOut</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
import { NativeTabs } from 'expo-router/native-tabs';

export default function TabLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="search">
                <NativeTabs.Trigger.Icon sf="magnifyingglass" />
                <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="saved">
                <NativeTabs.Trigger.Icon sf="heart.fill" />
                <NativeTabs.Trigger.Label>Saved</NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <NativeTabs.Trigger.Icon sf="person.fill" />
                <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}

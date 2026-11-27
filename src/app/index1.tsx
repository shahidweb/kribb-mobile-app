import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export interface PropertySale {
  id: number;
  title: string;
  city: string;
  price: number;
  sqft: number;
}

// Optional: Component props interface if passing as a prop
export interface PropertyListProps {
  properties: PropertySale[];
}


const properties: PropertySale[] = [
  {
    "id": 1,
    "title": "3 BHK Luxury Builder Floor",
    "city": "Faridabad",
    "price": 8500000,
    "sqft": 1800
  },
  {
    "id": 2,
    "title": "2 BHK Modern Apartment",
    "city": "Noida",
    "price": 6200000,
    "sqft": 1150
  },
  {
    "id": 3,
    "title": "4 BHK Independent Villa",
    "city": "Gurugram",
    "price": 24500000,
    "sqft": 3200
  },
  {
    "id": 4,
    "title": "Residential Plot in Gated Society",
    "city": "Faridabad",
    "price": 7200000,
    "sqft": 1620
  },
  {
    "id": 5,
    "title": "3 BHK High-Rise Flat",
    "city": "Delhi",
    "price": 13500000,
    "sqft": 1650
  },
  {
    "id": 6,
    "title": "2 BHK Affordable Housing Flat",
    "city": "Ghaziabad",
    "price": 3800000,
    "sqft": 950
  },
  {
    "id": 7,
    "title": "Commercial Office Space",
    "city": "Noida",
    "price": 11000000,
    "sqft": 1400
  },
  {
    "id": 8,
    "title": "3 BHK Duplex House",
    "city": "Jaipur",
    "price": 9200000,
    "sqft": 2100
  }
]
export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="bg-gray-500">
          <Text className="bg-red-800 text-white p-3">Edit src/app/index.tsx to edit this screen
          </Text>
          <TextInput style={{ borderWidth: 1, padding: 10, borderRadius: 10 }} placeholderTextColor='#ccc' placeholder="Search CIty" />
          <TouchableOpacity
            style={{ backgroundColor: "#2563EB", borderRadius: 10, padding: 10, marginTop: 10, alignItems: "center" }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={properties}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text style={{ color: "#666" }}>{item.city}</Text>
              <Text style={{ color: "#2563EB" }}>{item.price}</Text>
            </View>
          )}

        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

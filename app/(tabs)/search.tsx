import seed, { seedWithoutImages } from "@/lib/seed";
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Search
      </Text>

      <View style={{ gap: 10 }}>
        <Button
          title="Seed Database (with images)"
          onPress={() =>
            seed().catch((error) =>
              console.log("Failed to seed the database", error)
            )
          }
        />

        <Button
          title="Seed Database (without images)"
          onPress={() =>
            seedWithoutImages().catch((error) =>
              console.log("Failed to seed the database", error)
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

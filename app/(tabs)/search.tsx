/* eslint-disable react-hooks/exhaustive-deps */
import CartButton from "@/components/CartButton";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/hooks/useAppwrite";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 6,
    },
  });

  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({
      category,
      query,
      limit: 6,
    });
  }, [category, query]);

  // console.log("DATA", JSON.stringify(data, null, 2));

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem: boolean = index % 2 === 0;
          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem && "mt-10"
              )}
            >
              <Text>Menu Card</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperStyle={{ gap: 7 }}
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0 5">
                  <Text className="paragraph semi-bold text-dark 100">
                    Find your favourite food
                  </Text>
                </View>
              </View>

              <CartButton />
            </View>

            <Text>Search Input</Text>

            <Text>Filter</Text>
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && (
            <View className="flex-1 justify-center items-center">
              <Text className="paragraph semi-bold text-dark 100">
                No results found
              </Text>
            </View>
          )
        }
      />

      {/* <View style={{ gap: 10 }}>
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
      </View> */}
    </SafeAreaView>
  );
};

export default Search;

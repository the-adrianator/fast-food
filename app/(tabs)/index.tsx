import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import { useAuthStore } from "@/store/auth.store";
// import * as Sentry from "@sentry/react-native";
import cn from "clsx";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as Sentry from "sentry-expo";

export default function Index() {
  const { user } = useAuthStore();

  console.log("USER", JSON.stringify(user, null, 2));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <Pressable
              className={cn(
                "offer-card",
                isEven ? "flex-row-reverse" : "flex-row"
              )}
              style={{
                backgroundColor: item.color,
              }}
              android_ripple={{ color: "#ffffff22" }}
            >
              {({ pressed }) => (
                <Fragment>
                  <View className="h-full w-1/2">
                    <Image
                      source={item.image}
                      className="size-full"
                      resizeMode="contain"
                    />
                  </View>

                  <View
                    className={cn(
                      "offer-card__info",
                      isEven ? "pl-10" : "pr-10"
                    )}
                  >
                    <Text className="h1-bold text-white leading-tight">
                      {item.title}
                    </Text>
                    <Image
                      source={images.arrowRight}
                      className="size-10"
                      resizeMode="contain"
                      tintColor="#ffffff"
                    />
                  </View>
                </Fragment>
              )}
            </Pressable>
          );
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View className="flex-row flex-between w-full my-5">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity
                className="flex-row flex-center gap-x-1 mt-0.5"
                onPress={() => {}}
              >
                <Text className="paragraph-bold text-dark-100">
                  UNITED KINGDOM
                </Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
        // ListFooterComponent={() => (
        //   <Button
        //     title="Try!"
        //     onPress={() => {
        //       // console.log("here");
        //       // Sentry.Native.captureException(new Error("First error"));
        //       // console.log("here2");
        //     }}
        //   />
        // )}
      />
    </SafeAreaView>
  );
}

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const { email, password } = form;

    if (!email || !password)
      return Alert.alert("Error", "Please enter your email and/or password");
    setIsSubmitting(true);

    try {
      // call appwrite sign in function
      await signIn({ email, password });

      // console.log("session", session);

      // Alert.alert("Success", "You have successfully signed in");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        label="Email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <CustomInput
        placeholder="Enter your password"
        label="Password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        keyboardType="default"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <CustomButton
        title="Sign In"
        onPress={handleSubmit}
        isLoading={isSubmitting}
      />

      <View className="flex justify-center flex-row gap-2 mt-5">
        <Text className="base-regular text-gray-100">
          Don&apos;t have an account?
        </Text>
        {/* <TouchableOpacity> */}
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SignIn;

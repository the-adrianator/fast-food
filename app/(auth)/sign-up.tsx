import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password)
      return Alert.alert(
        "Error",
        "Please enter your full name, email and/or password"
      );
    setIsSubmitting(true);

    try {
      // call appwrite sign up function
      await createUser({
        name,
        email,
        password,
      });

      // Alert.alert("Success", "You have successfully signed up");
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
        placeholder="Enter your full name"
        label="Full name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
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
        title="Sign Up"
        onPress={handleSubmit}
        isLoading={isSubmitting}
      />

      <View className="flex justify-center flex-row gap-2 mt-5">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        {/* <TouchableOpacity> */}
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SignUp;

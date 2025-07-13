import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.fastfood",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
	userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
};

export const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);
// export const storage = new Storage(client);

export const createUser = async ({ email, password, name}: CreateUserParams) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);

		if (!newAccount) throw new Error("Failed to create user");

		await signIn({ email, password });

		const avatarUrl = avatars.getInitials(name).toString();

		console.log("avatarUrl", avatarUrl);

		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				name,
				email,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (e) {
		throw new Error(e as string)
	}
}

export const signIn = async ({ email, password }: SignInParams) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);

		if (!session) throw new Error("Failed to sign in");

		return session;
	} catch (e) {
		throw new Error(e as string)
	}
}
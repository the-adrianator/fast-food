import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.fastfood",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
	bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
	userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
	categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
	menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID!,
	customizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID!,
	menuCustomizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID!,
};

// console.log("appwriteConfig", appwriteConfig);

export const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
// const avatars = new Avatars(client);

export const createUser = async ({ email, password, name}: CreateUserParams) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);

		if (!newAccount) throw new Error("Failed to create user");

		await signIn({ email, password });

		const avatarUrl = `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(name)}`

		// console.log("avatarUrl", avatarUrl.toString());

		// console.log("avatarUrl not toString", avatarUrl);

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

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw new Error("Failed to get current account");

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser.documents[0]) throw new Error("Failed to get current user");

		return currentUser.documents[0];
	} catch (e) {
		throw new Error(e as string)
	}
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
	try {
		const queries: string[] = [];

		if (category) queries.push(Query.equal("categories", category));
		if (query) queries.push(Query.search("name", query));

		const menus = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.menuCollectionId,
			queries
		);

		return menus.documents;
	} catch (e) {
		throw new Error(e as string)
	}
}

export const getCategories = async () => {
	try {
		const categories = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.categoriesCollectionId,
		);

		return categories.documents;
	} catch (e) {
		throw new Error(e as string)
	}
}
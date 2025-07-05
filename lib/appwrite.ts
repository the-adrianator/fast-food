// import { Account, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "com.fastfood",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
	userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
};

// export const client = new Client();
// client.setEndpoint(appwriteConfig.endpoint);
// client.setProject(appwriteConfig.projectId);

// export const account = new Account(client);
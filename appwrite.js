import { Client, Databases, Query } from 'appwrite';

const client = new Client();


const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

client.setProject(PROJECT_ID);
client.setEndpoint('https://cloud.appwrite.io/v1');

const databases = new Databases(client);
export { databases, DATABASE_ID, COLLECTION_ID };

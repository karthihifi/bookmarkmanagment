import { GraphQLClient, gql } from "graphql-request";

import {
    graphqlFolderInput,
    graphqlFileInput,
    graphqlCreateFolderResp,
    graphqlCreateCategoryResp,
    graphqlCreateFileResp
} from "../types/interface";

const client = new GraphQLClient("http://localhost:8000/catalog");

export async function createFolder(userId: string, folderData: graphqlFolderInput): Promise<string> {
    const query = gql`
      mutation ($userId: ID!, $folderData: folderInput!) {
  createFolder(userID: $userId, folderData: $folderData)
}
    `;
    const { createFolder } = (await client.request(query, { userId, folderData })) as graphqlCreateFolderResp;
    return createFolder;
}

export async function createCategory(userId: string, category: string): Promise<string> {
    const query = gql`
      mutation($userId: ID!, $category: String!){
  createCategory(userID: $userId, category: $category)
}
    `;
    const { createCategory } = (await client.request(query, { userId, category })) as graphqlCreateCategoryResp;
    return createCategory;
}

export async function createFile(fileInput: graphqlFileInput): Promise<string> {
    const query = gql`
    mutation($fileInput: fileInput!){
        createFile(fileInput: $fileInput)
}
    `;
    const { createFile } = (await client.request(query, { fileInput })) as graphqlCreateFileResp;
    return createFile;
}
import { GraphQLClient, gql } from "graphql-request";
import {
  folder,
  file,
  category,
  graphqlFolder,
  graphqlFile,
  graphqlFileResp,
  graphqlCategories,
  graphqlFileSingle
} from "../types/interface";

const client = new GraphQLClient("http://localhost:8000/catalog");

export async function getFolder(id): Promise<folder[]> {
  const query = gql`
    query folders($id: ID!) {
      folders(id: $id) {
        folder_name
        maincategory
        email
        favourities
        filecount
        ID
        imageurl
        lastvisited
      }
    }
  `;
  const { folders } = (await client.request(query, { id })) as graphqlFolder;
  return folders;
}

export async function getCategories(id: string): Promise<category[]> {
  const query = gql`
    query categories($id: ID!) {
      categories(id: $id) {
        category
        count
      }
    }
  `;
  const { categories } = (await client.request(query, { id })) as graphqlCategories;
  return categories;
}

export async function getSingleFile(parentId: string, fileId: string): Promise<file> {
  const query = gql`
   query($parentId: ID!, $fileId: ID!){
  fileDetails(parentId: $parentId, fileId: $fileId) {
    ID
    comments
    category
    title
    imageurl
    visitedimes
    lastvisited
    references {
      title
      url
    }
    tags
  }
}
  `;
  const { fileDetails } = (await client.request(query, { parentId, fileId })) as graphqlFileSingle;
  return fileDetails;
}


export async function getFileDetails(userId: string, folderName: string): Promise<graphqlFile> {
  const query = gql`
query ($userId: ID!, $folderName: String!) {
  folder(userID: $userId, folderName: $folderName) {
    folder_name
    files {
      ID
      title
      category
      imageurl
      comments
      lastvisited
      visitedimes
      references {
        title
        url
      }
      tags
    }
  }
}

  `;
  const { folder } = (await client.request(query, { userId, folderName })) as graphqlFileResp;
  return folder;
}
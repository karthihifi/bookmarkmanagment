export interface folder {
    ID: string,
    folder_name: string
    maincategory: string
    email: string
    favourities: boolean
    filecount: number
    imageurl: string
    lastvisited: Date
    visitedimes: number
}

export interface file {
    ID: string,
    title: string,
    category: string,
    imageurl: string,
    comments: string,
    lastvisited: Date,
    visitedimes: number,
    references: reference[],
    tags: string[]
}

export interface reference {
    title: string,
    url: string
}

export interface category {
    category: string
    count: number
}

export type graphqlFolder = {
    folders: folder[]
}

export type graphqlFile = {
    folder_name: string,
    files: file[]
}

export type graphqlCategories = {
    categories: category[]
}

export type groupedFile = category & graphqlFile

export type graphqlFileCategories = {
    fileCategories: category[]
}

export type graphqlFileSingle = {
    fileDetails: file
}

export type graphqlFolderInput = {
    // ID: ID!
    maincategory: string
    imageurl: string
    folder_name: string
    email: string
    favourities: boolean
}

export type graphqlFileInput = {
    fileHeader: fileHeader,
    references: reference[],
    tags: string[]
}

export type graphqlCreateFolderResp = {
    createFolder: string;
}

export type graphqlCreateCategoryResp = {
    createCategory: string;
}

export type graphqlFileResp = {
    folder: graphqlFile;
}

export type graphqlCreateFileResp = {
    createFile: string;
}


type fileHeader = {
    ParentID: string,
    category: string,
    comments: string,
    title: string,
    imageurl: string
}
// export type referenceFile = {
//     title: String,
//     url: String
// }

export type CreateBlogModel = {
    name: string,
    description: string,
    websiteUrl: string
}

export type UpdateBlogModel = {
    name: string,
    description: string,
    websiteUrl: string
}

export type QueryBlogInputModel = {
    searchNameTerm?: string,
    sortBy?: string,
    sortDirection?: string,
    pageNumber?: number,
    pageSize?: number
}
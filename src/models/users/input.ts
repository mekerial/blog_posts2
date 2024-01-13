export type CreateUserModel = {
    login: string,
    password: string,
    email: string
}

export type QueryUserInputModel = {
    sortBy?: string,
    sortDirection?: string,
    pageNumber?: number,
    pageSize?: number,
    searchLoginTerm?: string,
    searchEmailTerm?: string
}

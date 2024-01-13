import {CreateUserModel, QueryUserInputModel} from "../models/users/input";
import {userCollection} from "../db/db";
import {userMapper} from "../models/users/mappers/user-mapper";
import {ObjectId} from "mongodb";
import {LoginInputModel} from "../models/logins/input";

export class UserRepository {
    static async getAllUsers(sortData: QueryUserInputModel) {
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ??  'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10
        const searchLoginTerm = sortData.searchLoginTerm ?? null
        const searchEmailTerm = sortData.searchEmailTerm ?? null

        let filter = {}

        if (searchLoginTerm || searchEmailTerm) {
            filter = {
                name: {
                    $regex: searchLoginTerm, searchEmailTerm,
                    $options: 'i'
                }
            }
        }

        const users = await userCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(+pageSize)
            .map(userMapper)
            .toArray()

        const totalCount = await userCollection.countDocuments(filter)

        const pagesCount = Math.ceil(totalCount / +pageSize)

        return {
            page: +pageNumber,
            pageSize: +pageSize,
            pagesCount,
            totalCount,
            items: users
        }
    }
    static async checkCredentials(auth: LoginInputModel): Promise<boolean | null> {
        const loginOrEmail = auth.loginOrEmail
        const password = auth.password
        const userLoginAndPassword = await userCollection.findOne({login: loginOrEmail, password: password})

        if (userLoginAndPassword) {
            return true
        }
        return false
    }
    static async createUser(createdData: CreateUserModel) {

        const user = {
            ...createdData,
            createdAt: new Date().toISOString(),
        }

        const newUser = await userCollection.insertOne({...user})

        return userMapper({...user, _id: newUser.insertedId})
    }
    static async deleteUserById(id: string): Promise<boolean | null> {
        const user = await userCollection.deleteOne({_id: new ObjectId(id)})

        return !!user.deletedCount
    }
}


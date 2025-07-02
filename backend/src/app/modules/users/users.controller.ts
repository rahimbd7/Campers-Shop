import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./users.service";
import httpStatus from 'http-status'

const createUser = catchAsync(async (req, res, next) => {
    const result = await UserService.createUserIntoDB(req.body, next);
    if (result) {
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User created successfully',
            data: result
        })
    } else {
        throw new Error('Failed to create user')
    }
});

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserService.getAllUsersFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users fetched successfully',
        data: result
    })
});

const getUserById = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await UserService.getUserByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: result
    })
});


const updateUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await UserService.updateUserIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User updated successfully',
        data: result
    })
})

const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserService.deleteUserFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: result
    })
})

export const UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
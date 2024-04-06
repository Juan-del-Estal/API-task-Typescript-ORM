import { UserEntity } from "../entities/user.entity";
import { AppDataSource } from "../../config/data.source";
import UserInterface from "../interfaces/create.user.interface";
import { RoleType } from "../dto/user.dto";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

export const createUserService = async (user: UserInterface) => {
    const { username, email, password, confirmPassword} = user;
    // Check if username already exists
    const existingUserName = await AppDataSource.manager.findOne(UserEntity, { where: { username } });
    if (existingUserName) {
        console.log('Username already exists:', username);
        return { message: 'Username already in use.' };
    }
    // Check if the email exists
    const existingEmail = await AppDataSource.manager.findOne(UserEntity, { where: { email } });
    if (existingEmail) {
        console.log('Email already exists:', email);
        return { message: 'Email already in use.' };
    }

    if(password !== confirmPassword) {
        return { message: 'Passwords don´t match'}
    }

    // If the username and email don´t exist, proceed with creating the new user
    const newUser = new UserEntity();
    // Hash password
    user.password = await bcrypt.hash(user.password, 10)
    
    if(!user.password) {
        throw new Error('Error during password hashing');
    }
    // Adding unique ID and respective role
    newUser.id = uuidv4();
    newUser.role = RoleType.USER;
    
    // Copying props from user to newUser
    Object.assign(newUser, user); 
   
    try {
        const userData = await AppDataSource.manager.save(newUser);
        if (!userData) {
            throw new Error('Error creating user');
        }
        console.log('User created successfully');
        // Return a success message if the user is created successfully
        return { message: 'User created successfully' };
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Propagate the error to the caller
    }
};


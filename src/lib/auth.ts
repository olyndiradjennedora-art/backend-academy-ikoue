import jwt from 'jsonwebtoken';
import { loadEnvironment } from '../config/env';

const config = loadEnvironment();


export type Payload = {
  user_id: string;
  user_role: string;
  user_email: string;
};

export const generateToken = (payload: Payload): string => {
    const token = jwt.sign(payload, config.jwtSecret!);

    if(!token) {
        throw new Error('Erreur lors de la génération du token.');
    }
    return token;
};

export const verifyToken = (token: string): Payload => {
    const decoded = jwt.verify(token, config.jwtSecret!);
    if(!decoded) {
        throw new Error('Erreur lors de la vérification du token.');
    }
    return decoded as Payload;
};

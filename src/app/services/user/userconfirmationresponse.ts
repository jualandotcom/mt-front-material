import { User } from './user';

export class UserConfirmationResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbUsers: User;
}

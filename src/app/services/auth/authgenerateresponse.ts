import { Claims } from './claims';

export class AuthGenerateResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    token: string;
    claims: Claims;
}

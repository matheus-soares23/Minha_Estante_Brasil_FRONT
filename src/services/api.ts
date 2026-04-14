
import { httpService, HttpService, ApiError } from './httpService';

export class ApiService extends HttpService {}

export const api = httpService;

export type { ApiError };

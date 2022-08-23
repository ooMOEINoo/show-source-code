import { IDetails } from '@interfaces/response.interface';

// Create Class Http Exception From Error Class
export default class HttpException extends Error {
  constructor(
    public readonly status: string,
    public readonly statusCode: number,
    public readonly details: IDetails[]
  ) {
    super(status);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export interface IResponse {
  code: number;
  status: string;
  details: IDetails[];
}

export interface IDetails {
  message: string;
  data: any;
}

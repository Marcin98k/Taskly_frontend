export interface TaskOptionsResponse {
  name: string;
  value: string;
}

export class TaskOptions implements TaskOptionsResponse {
  constructor(
    public name: string,
    public value: string
  ) {}
}

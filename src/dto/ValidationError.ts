export class ValidationError {
  public property: string;
  public errors: string[];

  constructor(property: string, errors: string[]) {
    this.property = property;
    this.errors = errors;
  }
}

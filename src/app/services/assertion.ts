const throwError = (message: string): never => {
  throw new Error(message);
};

export class Assertion {
  public static between(
    value: number,
    first: number,
    last: number,
    message: string = ''
  ): void {
    if (value < first || value > last) {
      throwError(message || `${value} not between ${first} and ${last}`);
    }
  }
}

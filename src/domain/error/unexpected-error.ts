export class UnexpectedError extends Error {
  constructor() {
    super("Um erro inesperado aconteceu, tente novamente mais tarde");
    this.name = "UnexpectedError";
  }
}

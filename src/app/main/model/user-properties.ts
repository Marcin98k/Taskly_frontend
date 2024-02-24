export class UserProperties {
  id: number;
  username: string;
  role: string;

  public getId(): number {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getRole(): string {
    return this.role;
  }
}

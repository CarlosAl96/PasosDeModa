export class User {
  public id_user: string;
  public name: string;
  public surname: string;
  public email?: string;
  public phone: string;
  public address: string;
  public password?: string;
  public role?: string;

  constructor() {
    this.id_user = '';
    this.name = '';
    this.surname = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.password = '';
    this.role = '';
  }
}

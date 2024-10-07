export class UserModel {
  id: string;
  name: string;
  email: string;
  constructor(id?: string, name?: string, email?: string, img?: string) {
    this.id = id || '';
    this.name = name || '';
    this.email = email || '';
  }
}

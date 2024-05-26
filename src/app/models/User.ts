import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

export class User {
  id: UUID;
  username: string;

  constructor(username: string, id?: UUID) {
    this.username = username;
    this.id = id ?? (uuidv4() as UUID);
  }
}

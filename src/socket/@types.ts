
export interface User {
  id: string;
  author: string;
}

export interface Message {
  message: string;
  author: string;
}

export interface AttributesRoom {
  id: string;
  name: string;
  limit: number;
  connected: number;
  messeges: Message[];
  users: User[];
}

export interface Room {
  getName(): string;
  addUser(id: string, author: string): void;
  enterRoom(user: User): void;
  leaveRoom(user: User): void;
  addMessage(message: Message): void;
  getMessages(): Message[];
  allowedConnection(): boolean;
  attributes: AttributesRoom;
}

export interface RoomController {
  addUser( name_room: string, socket_id: string, author: string ): void;
  addMessage( name: string, message: Message ): void;
  getMessages(name: string): Message[];
  getRooms(): AttributesRoom[];
  addRoom( name: string, limit: number ): void;
  someRoom(name: string): boolean;
  enterRoom(name: string, user: User): void;
  leaveRoom(name: string, user: User): void;
  allowedConnection(name: string): boolean;
}

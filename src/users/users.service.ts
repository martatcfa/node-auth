import { Injectable } from '@nestjs/common';
import { User } from './model/user';

@Injectable()
export class UsersService {
	private readonly users: Array<User> = [
		{
			id: 1,
			username: 'alice.almeida',
			password: 'abc123'
		},
		{
			id: 2,
			username: 'carlos.alberto',
			password: 'abc456'
		},
	];

	async findOne(username: string): Promise<User> {
    return this.users.find(user => user.username === username);
  }
}

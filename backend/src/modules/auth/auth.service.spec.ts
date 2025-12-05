import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(async () => 'hashed'),
  compare: jest.fn(async () => true),
}));

class UsersMock {
  createUser = jest.fn(async (d: any) => ({ id: 1, name: d.name, email: d.email }));
  findByEmail = jest.fn(async (email: string) => ({ id: 1, name: 'User', email, passwordHash: 'hashed', createdAt: new Date() }));
}

describe('AuthService', () => {
  it('signup returns user and token', async () => {
    const users = new UsersMock();
    const jwt = new JwtService({ secret: 'test' });
    const svc = new AuthService(users as any, jwt);
    const res = await svc.signup({ name: 'U', email: 'u@example.com', password: 'password123' });
    expect(res.user).toEqual({ id: 1, name: 'U', email: 'u@example.com' });
    expect(res.token).toBeTruthy();
  });

  it('login returns user and token', async () => {
    const users = new UsersMock();
    const jwt = new JwtService({ secret: 'test' });
    const svc = new AuthService(users as any, jwt);
    const res = await svc.login({ email: 'u@example.com', password: 'password123' });
    expect(res.user.email).toEqual('u@example.com');
    expect(res.token).toBeTruthy();
  });
});

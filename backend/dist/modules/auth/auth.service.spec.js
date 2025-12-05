"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
jest.mock('bcrypt', () => ({
    hash: jest.fn(async () => 'hashed'),
    compare: jest.fn(async () => true),
}));
class UsersMock {
    constructor() {
        this.createUser = jest.fn(async (d) => ({ id: 1, name: d.name, email: d.email }));
        this.findByEmail = jest.fn(async (email) => ({ id: 1, name: 'User', email, passwordHash: 'hashed', createdAt: new Date() }));
    }
}
describe('AuthService', () => {
    it('signup returns user and token', async () => {
        const users = new UsersMock();
        const jwt = new jwt_1.JwtService({ secret: 'test' });
        const svc = new auth_service_1.AuthService(users, jwt);
        const res = await svc.signup({ name: 'U', email: 'u@example.com', password: 'password123' });
        expect(res.user).toEqual({ id: 1, name: 'U', email: 'u@example.com' });
        expect(res.token).toBeTruthy();
    });
    it('login returns user and token', async () => {
        const users = new UsersMock();
        const jwt = new jwt_1.JwtService({ secret: 'test' });
        const svc = new auth_service_1.AuthService(users, jwt);
        const res = await svc.login({ email: 'u@example.com', password: 'password123' });
        expect(res.user.email).toEqual('u@example.com');
        expect(res.token).toBeTruthy();
    });
});
//# sourceMappingURL=auth.service.spec.js.map
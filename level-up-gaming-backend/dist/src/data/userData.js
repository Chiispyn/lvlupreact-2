// level-up-gaming-backend/src/data/userData.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mockUsers", {
    enumerable: true,
    get: function() {
        return mockUsers;
    }
});
const mockUsers = [
    {
        id: 'u1',
        name: 'Administrador Principal',
        email: 'admin@levelup.com',
        password: 'admin123',
        rut: '123456789',
        age: 35,
        role: 'admin',
        token: 'MOCK_ADMIN_TOKEN_123',
        hasDuocDiscount: true,
        points: 500,
        referralCode: 'ADMIN1000',
        isActive: true,
        // 🚨 DIRECCIÓN CORREGIDA: Duoc UC Sede Concepción
        address: {
            street: 'Paicaví 3280',
            city: 'Concepción',
            region: 'Biobío',
            zipCode: '4030000'
        }
    }
];

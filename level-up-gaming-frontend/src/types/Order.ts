// level-up-gaming-frontend/src/types/Order.ts

export type OrderStatus = 'Pendiente' | 'Procesando' | 'Enviado' | 'Entregado' | 'Cancelado';

export interface OrderItem {
    product: {
        name: string;
        price: number;
    };
    quantity: number;
}

export interface ShippingAddress {
    street: string;
    city: string;
    region: string;
}

export interface Order {
    id: string;
    userId: string;
    userRut?: string; // Opcional para transición
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    totalPrice: number;
    status: OrderStatus;
    createdAt: string;
}

export interface OrderUpdatePayload {
    status: OrderStatus;
}

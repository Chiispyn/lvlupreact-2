// level-up-gaming-frontend/src/types/Reward.ts

export type RewardType = 'Producto' | 'Descuento' | 'Envio';
export type RewardSeason = 'Standard' | 'Halloween' | 'Navidad' | 'BlackFriday' | 'Verano';

export interface Reward {
    id: string;
    name: string;
    type: RewardType;
    pointsCost: number;
    description: string;
    isActive: boolean;
    season: RewardSeason;
    imageUrl: string;
}

export interface RewardFormData {
    name?: string;
    type?: RewardType;
    pointsCost?: number;
    description?: string;
    isActive?: boolean;
    season?: RewardSeason;
    imageUrl?: string;
}

export interface StatusMessage {
    msg: string;
    type: 'success' | 'danger';
}

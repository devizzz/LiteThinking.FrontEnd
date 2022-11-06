
export type Products = {
    name: string;
    stock: number;
    unit_price: number;
}

export type Companies = {
    id: string;
    NIT: string | null;
    name: string;
    address: string;
    phone: string;
    created_at: string;
    products: Array<Products>
}
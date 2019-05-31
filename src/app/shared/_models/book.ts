export interface Book {
    id: number;
    bookCode: string;
    title: string;
    authors: string[];
    price: number;
    amount: number;
    pages?: number;
    rating?: number;
    image?: string;
    description?: string;
    quantity?: number;
}
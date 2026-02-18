
export class Product {
    Products_id: number = 0;
    Product_name!: string;
    price!: number;
    Category_Id!: number;
    description!: string;
    imageUrl!: string;
    category?: string;
    quantity?: number; // לא חובה, רק אם רוצים לעקוב אחרי כמות במוצר
}

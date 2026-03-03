import { Injectable } from '@angular/core';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    categoryId: string;
    shopId: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [
        {
            id: '1',
            name: 'Fresh Apples',
            price: 3.50,
            image: 'assets/img/product/details/product-details-1.jpg',
            description: 'Crisp and sweet fresh apples.',
            categoryId: 'fruit',
            shopId: 'shop1'
        },
        {
            id: '2',
            name: 'Organic Bananas',
            price: 2.00,
            image: 'assets/img/product/details/product-details-2.jpg',
            description: 'Organic fair-trade bananas.',
            categoryId: 'fruit',
            shopId: 'shop2'
        },
        {
            id: '3',
            name: 'Whole Wheat Bread',
            price: 4.00,
            image: 'assets/img/product/details/product-details-3.jpg',
            description: 'Freshly baked whole wheat bread.',
            categoryId: 'bakery',
            shopId: 'shop1'
        },
        {
            id: '4',
            name: 'Carrots',
            price: 1.50,
            image: 'assets/img/product/details/product-details-4.jpg',
            description: 'Crunchy orange carrots.',
            categoryId: 'vegetable',
            shopId: 'shop3'
        }
    ];

    constructor() { }

    getProducts(): Product[] {
        return this.products;
    }

    getProductById(id: string): Product | undefined {
        return this.products.find(p => p.id === id);
    }

    getProductsByCategory(categoryId: string): Product[] {
        return this.products.filter(p => p.categoryId === categoryId);
    }

    getProductsByShop(shopId: string): Product[] {
        return this.products.filter(p => p.shopId === shopId);
    }
}

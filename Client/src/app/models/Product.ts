export type Product = {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productType: string;
    productBrand: string;
    pictureUrl: string;
    quantityInStock: number;
    isDeleted: boolean;
};

export type ProductParam = {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    searchTerm: string;
    brandList: string[];
    typeList: string[];
};
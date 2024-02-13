import { defineStore } from 'pinia';

interface Product {
  name: string;
  imageUrl: string;
  quantity: number;
  remainQuantity: number;
  status: string;
  updatedAt: string;
}

interface ProductStoreState {
  list: Product[];
}

export const useProductStore = defineStore('product', {
  state: (): ProductStoreState => ({
    list: [],
  }),
  actions: {
    loadProduct(this: any) {
      const productList = localStorage.getItem('product-data');
      if (productList) {
        this.list = JSON.parse(productList);
      }
    },
    getProduct(this: any, index: number): Product | undefined {
      return this.list[index];
    },
    addProduct(this: any, productData: Product): void {
      productData.remainQuantity = productData.quantity;
      this.list.push(productData);
      // save to localstorage
      localStorage.setItem('product-data', JSON.stringify(this.list));
    },
    updateProduct(this: any, index: number, productData: Product): void {
      const productToUpdate = this.list[index];
      if (productToUpdate) {
        productToUpdate.name = productData.name;
        productToUpdate.imageUrl = productData.imageUrl;
        productToUpdate.quantity = productData.quantity;
        productToUpdate.remainQuantity = productData.quantity;
        productToUpdate.status = productData.status;
        productToUpdate.updatedAt = new Date().toLocaleString();
        // save to localstorage
        localStorage.setItem('product-data', JSON.stringify(this.list));
      }
    },
    removeProduct(this: any, index: number): void {
      this.list.splice(index, 1);
      // save to localstorage
      localStorage.setItem('product-data', JSON.stringify(this.list));
    },
  },
});

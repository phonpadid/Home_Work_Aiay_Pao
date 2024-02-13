import { defineStore } from 'pinia';

interface Product {
  name: string;
  imageUrl: string;
  quantity: number;
  about: string;
  status: string;
  price: number;
}

interface UserProductState {
  list: Product[];
  loaded: boolean;
}

export const useUserProductStore = defineStore('user-product', {
  state: (): UserProductState => ({
    list: [
      {
        name: 'test',
        imageUrl:
          'https://fastly.picsum.photos/id/849/200/200.jpg?hmac=LwsdGn2endKvoLY10FPqtfqKYCVMbPEp5J6S_tUN1Yg',
        quantity: 10,
        about: 'testt',
        status: 'open',
        price: 100,
      },
      {
        name: 'test2',
        imageUrl:
          'https://fastly.picsum.photos/id/849/200/200.jpg?hmac=LwsdGn2endKvoLY10FPqtfqKYCVMbPEp5J6S_tUN1Yg',
        quantity: 10,
        about: 'Hello',
        status: 'open',
        price: 100,
      },
    ],
    loaded: false,
  }),
  actions: {
    filterProducts (searchName:string) {
      return this.list.filter(product => product.name.includes(searchName))
    }
  }
});

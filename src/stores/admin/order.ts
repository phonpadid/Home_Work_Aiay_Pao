import { defineStore } from 'pinia'

// Define TypeScript types for the state and actions
interface Product {
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: string;
}

interface Order {
  no: string;
  customerName: string;
  totalPrice: string;
  status: string;
  address: string;
  paymentMethod: string;
  updatedAt: string;
  products: Product[];
}

interface OrderState {
  list: Order[];
}

interface OrderActions {
  getOrder(index: number): Order;
}

// Create and export the Pinia store
export const useOrderStore = defineStore({
  id: 'order',
  state: (): OrderState => ({
    list: [
      {
        no: 'A112234',
        customerName: 'Test',
        totalPrice: '25,000',
        status: 'Payment Completed',
        address: '111/892 Lao 99999',
        paymentMethod: 'Credit card',
        updatedAt: '9/15/2023, 11:50:24 PM',
        products: [
          {
            name: 'Test1',
            description: 'Description 1',
            imageUrl: 'https://fastly.picsum.photos/id/928/200/200.jpg?hmac=5MQxbf-ANcu87ZaOn5sOEObpZ9PpJfrOImdC7yOkBlg',
            quantity: 1,
            price: '13,000',
          },
          {
            name: 'Test2',
            description: 'Description 2',
            imageUrl: 'https://fastly.picsum.photos/id/59/200/200.jpg?hmac=q9DbuoFh1L_NWnGk3AGdzuEOlg5bBW4JmBSgWmQdT74',
            quantity: 1,
            price: '12,000',
          },
        ],
      },
    ],
  }),
  actions: {
    getOrder(index: number): Order {
      return this.list[index];
    },
  },
} as const);

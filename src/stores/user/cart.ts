import { defineStore } from 'pinia';

interface ProductData {
  name: string;
  price: number;
  quantity: number;
  imageUrl:string;
  about:string;
  status: string;
}

interface UserCartStoreState {
  items: ProductData[];
  checkout:{};
}

export const useUserCartStore = defineStore('user-cart', {
  state: (): UserCartStoreState => ({
    items: [],
    checkout: {}
  }),
  getters: {
    summaryPrice(state): number {
      return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    quantity(state): number {
      return state.items.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  actions: {
    loadCart(): void {
      const cartItem = localStorage.getItem('cart-item');
      if (cartItem) {
        this.items = JSON.parse(cartItem);
      }
    },
    addToCart(productData: ProductData): void {
      const itemIndex = this.items.findIndex((item) => item.name === productData.name);
      if (itemIndex >= 0) {
        this.updateQuantity(itemIndex, this.items[itemIndex].quantity + 1);
      } else {
        productData.quantity = 1;
        this.items.push(productData);
      }
      localStorage.setItem('cart-item', JSON.stringify(this.items));
    },
    updateQuantity(index: number, quantity: number): void {
      this.items[index].quantity = parseInt(quantity.toString(), 10);
      localStorage.setItem('cart-item', JSON.stringify(this.items));
    },
    removeItemInCart(index: number): void {
      this.items.splice(index, 1);
      localStorage.setItem('cart-item', JSON.stringify(this.items));
    },
    placeorder (checkoutData:any) {
      let checkout = {
        ...checkoutData,
        totalPrice: this.summaryPrice,
        paymentMethod: 'Credit Card',
        createdAt: (new Date()).toLocaleString(),
        orderNumber: `AA${(Math.floor(Math.random() * 900000) + 100000).toString()}`,
        products: this.items
      }
      localStorage.setItem('checkout-data', JSON.stringify(checkout))
    },
    loadCheckout () {
      let checkoutData = localStorage.getItem('checkout-data')
      if (checkoutData) {
        this.checkout = JSON.parse(checkoutData)
      }
    }
  },
});

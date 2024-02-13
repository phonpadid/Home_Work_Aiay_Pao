import { defineStore } from 'pinia'

interface EventStoreState {
  alert: boolean;
  data: {
    status?: string;
    message?: string;
  };
}

export const useEventStore = defineStore('event', {
  state: (): EventStoreState => ({
    alert: false,
    data: {}
  }),
  actions: {
    popupMessage(status: string, message: string): void {
      this.data = {
        status,
        message
      };
      this.alert = true;
      setTimeout(() => {
        this.clearPopup();
      }, 3000);
    },
    clearPopup(): void {
      this.alert = false;
      this.data = {};
    }
  }
});

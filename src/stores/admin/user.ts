import { defineStore } from 'pinia';

interface User {
  name: string;
  role: string;
  status: string;
  updatedAt: string;
}

interface UserStoreState {
  list: User[];
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    list: [
      {
        name: 'NOME',
        role: 'admin',
        status: 'active',
        updatedAt: '9/15/2023, 11:50:24 PM',
      },
      {
        name: 'Test',
        role: 'moderator',
        status: 'inactive',
        updatedAt: '9/15/2023, 11:50:24 PM',
      },
      {
        name: 'TP',
        role: 'member',
        status: 'active',
        updatedAt: '9/15/2023, 11:50:24 PM',
      },
    ],
  }),
  actions: {
    getUser(this: any, index: number): User | undefined {
      return this.list[index];
    },
    updateUser(this: any, index: number, userData: User): void {
      const userToUpdate = this.list[index];
      if (userToUpdate) {
        userToUpdate.name = userData.name;
        userToUpdate.status = userData.status;
        userToUpdate.role = userData.role;
        userToUpdate.updatedAt = new Date().toLocaleString();
      }
    },
    removeUser(this: any, index: number): void {
      this.list.splice(index, 1);
    },
  },
});

let mockUser = {
  Id: 1,
  name: 'احمد علی',
  email: 'ahmed@example.com',
  phone: '+92 300 1234567',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  addresses: [
    {
      Id: 1,
      type: 'home',
      name: 'Home',
      address: '123 Main Street, Block A',
      city: 'Karachi',
      state: 'Sindh',
      country: 'Pakistan',
      postalCode: '75300',
      isDefault: true,
    }
  ],
  preferences: {
    language: 'en',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    newsletter: true,
  },
  joinDate: '2023-01-15',
  lastLogin: new Date().toISOString(),
};

class UserService {
  async delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getProfile() {
    await this.delay();
    return { ...mockUser };
  }

  async updateProfile(userData) {
    await this.delay();
    mockUser = {
      ...mockUser,
      ...userData,
      updatedAt: new Date().toISOString(),
    };
    return { ...mockUser };
  }

  async updatePreferences(preferences) {
    await this.delay();
    mockUser.preferences = {
      ...mockUser.preferences,
      ...preferences,
    };
    return { ...mockUser };
  }

  async addAddress(addressData) {
    await this.delay();
    const newAddress = {
      Id: mockUser.addresses.length + 1,
      ...addressData,
      createdAt: new Date().toISOString(),
    };
    
    // If this is set as default, make others non-default
    if (newAddress.isDefault) {
      mockUser.addresses = mockUser.addresses.map(addr => ({
        ...addr,
        isDefault: false,
      }));
    }
    
    mockUser.addresses.push(newAddress);
    return { ...newAddress };
  }

  async updateAddress(addressId, addressData) {
    await this.delay();
    const index = mockUser.addresses.findIndex(addr => addr.Id === parseInt(addressId));
    if (index === -1) {
      throw new Error(`Address with id ${addressId} not found`);
    }

    // If this is set as default, make others non-default
    if (addressData.isDefault) {
      mockUser.addresses = mockUser.addresses.map(addr => ({
        ...addr,
        isDefault: false,
      }));
    }

    mockUser.addresses[index] = {
      ...mockUser.addresses[index],
      ...addressData,
      updatedAt: new Date().toISOString(),
    };

    return { ...mockUser.addresses[index] };
  }

  async deleteAddress(addressId) {
    await this.delay();
    const index = mockUser.addresses.findIndex(addr => addr.Id === parseInt(addressId));
    if (index === -1) {
      throw new Error(`Address with id ${addressId} not found`);
    }

    const deleted = mockUser.addresses.splice(index, 1)[0];
    
    // If deleted address was default, make first remaining address default
    if (deleted.isDefault && mockUser.addresses.length > 0) {
      mockUser.addresses[0].isDefault = true;
    }

    return { ...deleted };
  }

  async changePassword(currentPassword, newPassword) {
    await this.delay();
    // In a real implementation, you would verify the current password
    // For demo purposes, we'll just simulate success
    return { success: true, message: "Password changed successfully" };
  }

  async requestPasswordReset(email) {
    await this.delay();
    // Simulate sending reset email
    return { success: true, message: "Password reset email sent" };
  }

  async deleteAccount() {
    await this.delay();
    // In a real implementation, this would delete the user account
    return { success: true, message: "Account deleted successfully" };
  }

  async updateLastLogin() {
    await this.delay();
    mockUser.lastLogin = new Date().toISOString();
    return { ...mockUser };
  }

  async getOrderHistory() {
    await this.delay();
    // This would typically call the order service
    // For now, return mock data
    return [
      {
        Id: 1,
        orderId: 'ORD-001',
        date: '2024-01-15',
        status: 'delivered',
        total: 2500,
        items: 3
      },
      {
        Id: 2,
        orderId: 'ORD-002',
        date: '2024-01-10',
        status: 'shipped',
        total: 1800,
        items: 2
      }
    ];
  }
}

export const userService = new UserService();
let mockOrders = [];
let orderCounter = 1;

class OrderService {
  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...mockOrders];
  }

  async getById(id) {
    await this.delay();
    const order = mockOrders.find(o => o.Id === parseInt(id));
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    return { ...order };
  }

  async create(orderData) {
    await this.delay();
    const newOrder = {
      Id: orderCounter++,
      orderId: `ORD-${Date.now()}`,
      status: 'processing',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      ...orderData,
    };
    
    mockOrders.unshift(newOrder);
    return { ...newOrder };
  }

  async update(id, orderData) {
    await this.delay();
    const index = mockOrders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Order with id ${id} not found`);
    }
    
    mockOrders[index] = {
      ...mockOrders[index],
      ...orderData,
      updatedAt: new Date().toISOString(),
    };
    return { ...mockOrders[index] };
  }

  async getByStatus(status) {
    await this.delay();
    return mockOrders
      .filter(o => o.status === status)
      .map(o => ({ ...o }));
  }

  async getRecentOrders(limit = 10) {
    await this.delay();
    return mockOrders
      .slice(0, limit)
      .map(o => ({ ...o }));
  }

  async trackOrder(orderId) {
    await this.delay();
    const order = mockOrders.find(o => o.orderId === orderId);
    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }

    // Simulate tracking information
    const trackingSteps = [
      { status: 'received', date: order.createdAt, completed: true },
      { status: 'processing', date: order.createdAt, completed: order.status !== 'received' },
      { status: 'shipped', date: null, completed: ['shipped', 'delivered'].includes(order.status) },
      { status: 'delivered', date: null, completed: order.status === 'delivered' },
    ];

    return {
      ...order,
      tracking: trackingSteps
    };
  }

  async cancelOrder(id) {
    await this.delay();
    const index = mockOrders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Order with id ${id} not found`);
    }

    if (['shipped', 'delivered'].includes(mockOrders[index].status)) {
      throw new Error("Cannot cancel order that has already been shipped");
    }

    mockOrders[index] = {
      ...mockOrders[index],
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
    };

    return { ...mockOrders[index] };
  }
}

export const orderService = new OrderService();
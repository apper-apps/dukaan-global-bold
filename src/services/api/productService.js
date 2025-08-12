import mockProducts from "@/services/mockData/products.json";

class ProductService {
  // Add delay to simulate real API
  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...mockProducts];
  }

  async getById(id) {
    await this.delay();
    const product = mockProducts.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return { ...product };
  }

  async getByCategory(categoryId) {
    await this.delay();
    return mockProducts
      .filter(p => p.category_id === categoryId)
      .map(p => ({ ...p }));
  }

  async getFeatured() {
    await this.delay();
    return mockProducts
      .filter(p => p.featured)
      .map(p => ({ ...p }));
  }

  async search(query) {
    await this.delay();
    const lowercaseQuery = query.toLowerCase();
    return mockProducts
      .filter(p => 
        p.title_en.toLowerCase().includes(lowercaseQuery) ||
        p.title_ur.toLowerCase().includes(lowercaseQuery) ||
        p.description_en.toLowerCase().includes(lowercaseQuery) ||
        p.description_ur.toLowerCase().includes(lowercaseQuery)
      )
      .map(p => ({ ...p }));
  }

  async create(productData) {
    await this.delay();
    const newId = Math.max(...mockProducts.map(p => p.Id)) + 1;
    const newProduct = {
      Id: newId,
      ...productData,
      created_at: new Date().toISOString()
    };
    mockProducts.push(newProduct);
    return { ...newProduct };
  }

  async update(id, productData) {
    await this.delay();
    const index = mockProducts.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    
    mockProducts[index] = {
      ...mockProducts[index],
      ...productData,
      Id: parseInt(id)
    };
    return { ...mockProducts[index] };
  }

  async delete(id) {
    await this.delay();
    const index = mockProducts.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    
    const deleted = mockProducts.splice(index, 1)[0];
    return { ...deleted };
  }
}

export const productService = new ProductService();
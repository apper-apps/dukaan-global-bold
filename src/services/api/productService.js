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
      .filter(p => p.category_id === parseInt(categoryId))
      .map(p => ({ ...p }));
  }

  async getFeatured() {
    await this.delay();
    return mockProducts
      .filter(p => p.featured)
      .map(p => ({ ...p }));
  }

  async getDeals() {
    await this.delay();
    return mockProducts
      .filter(p => p.discount_percentage > 10)
      .map(p => ({ ...p }));
  }

  async search(query, filters = {}) {
    await this.delay();
    const lowercaseQuery = query.toLowerCase();
    
    let results = mockProducts.filter(p => 
      p.title_en.toLowerCase().includes(lowercaseQuery) ||
      p.title_ur.toLowerCase().includes(lowercaseQuery) ||
      p.description_en.toLowerCase().includes(lowercaseQuery) ||
      p.description_ur.toLowerCase().includes(lowercaseQuery) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    );

    // Apply filters
    if (filters.category && filters.category !== "all") {
      results = results.filter(p => p.category_id === parseInt(filters.category));
    }

    if (filters.priceRange && filters.priceRange.length === 2) {
      results = results.filter(p => 
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    if (filters.rating && filters.rating > 0) {
      results = results.filter(p => p.rating >= filters.rating);
    }

    if (filters.availability === "inStock") {
      results = results.filter(p => p.in_stock);
    }

    // Apply sorting
    if (filters.sortBy) {
      results.sort((a, b) => {
        switch (filters.sortBy) {
          case "price_low":
            return a.price - b.price;
          case "price_high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "newest":
            return new Date(b.created_at) - new Date(a.created_at);
          default:
            return b.featured ? 1 : -1;
        }
      });
    }

    return results.map(p => ({ ...p }));
  }

  async getRelated(productId, categoryId) {
    await this.delay();
    return mockProducts
      .filter(p => p.Id !== parseInt(productId) && p.category_id === parseInt(categoryId))
      .slice(0, 4)
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

export const productService = new ProductService();
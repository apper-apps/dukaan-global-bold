import mockCategories from "@/services/mockData/categories.json";

class CategoryService {
  // Add delay to simulate real API
  async delay(ms = 250) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...mockCategories];
  }

  async getById(id) {
    await this.delay();
    const category = mockCategories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return { ...category };
  }

  async getFeatured() {
    await this.delay();
    return mockCategories
      .filter(c => c.featured)
      .map(c => ({ ...c }));
  }

  async getPopular() {
    await this.delay();
    return mockCategories
      .slice(0, 6)
      .map(c => ({ ...c }));
  }

  async create(categoryData) {
    await this.delay();
    const newId = Math.max(...mockCategories.map(c => c.Id)) + 1;
    const newCategory = {
      Id: newId,
      ...categoryData
    };
    mockCategories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, categoryData) {
    await this.delay();
    const index = mockCategories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`);
    }
    
    mockCategories[index] = {
      ...mockCategories[index],
      ...categoryData,
      Id: parseInt(id)
    };
    return { ...mockCategories[index] };
  }

  async delete(id) {
    await this.delay();
    const index = mockCategories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`);
    }
    
    const deleted = mockCategories.splice(index, 1)[0];
    return { ...deleted };
  }
}

export const categoryService = new CategoryService();
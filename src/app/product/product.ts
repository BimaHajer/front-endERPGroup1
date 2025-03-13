
export class Product {
    constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public active?: boolean,
    public brandId?: any, 
    public modelId?: any, 
    public categoryId?: any,
    public tva?: number,
    public priceTTC?: number,
    public priceHT?: number,
    public initialQuantity?: number,
    public remainingQuantity?: number,
    public picture?: string,
    public createdAt?: string,
    public updatedAt?: string,
    public createdBy?: number,
    public updatedBy?: number,
  
    ) { }
  }
  
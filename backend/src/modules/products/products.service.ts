import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async list(filters: ProductFilters) {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      page = 1,
      pageSize = 12,
    } = filters;

    const where: any = {};
    if (search) where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { brand: { contains: search } },
      { category: { contains: search } },
    ];
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (typeof minPrice === 'number' || typeof maxPrice === 'number') where.price = {};
    if (typeof minPrice === 'number') where.price.gte = minPrice;
    if (typeof maxPrice === 'number') where.price.lte = maxPrice;
    if (typeof minRating === 'number') where.rating = { gte: minRating };
    if (typeof inStock === 'boolean') where.stock = inStock ? { gt: 0 } : { equals: 0 };

    const [total, items] = await this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { images: true },
      }),
    ]);

    return { total, page, pageSize, items };
  }

  async getById(id: number) {
    return this.prisma.product.findUnique({ where: { id }, include: { images: true } });
  }
}

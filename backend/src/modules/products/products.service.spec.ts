import { ProductsService } from './products.service';

class PrismaMock {
  product = {
    count: jest.fn().mockResolvedValue(2),
    findMany: jest.fn().mockResolvedValue([
      { id: 1, name: 'Nike Dunk Low', description: 'desc', price: 120, category: 'Lifestyle', brand: 'Nike', rating: 4.3, stock: 10, images: [] },
      { id: 2, name: 'Nike Air Max 90', description: 'desc', price: 140, category: 'Lifestyle', brand: 'Nike', rating: 4.7, stock: 8, images: [] },
    ]),
  };
  $transaction = jest.fn(async (ops: any[]) => {
    const total = await ops[0];
    const items = await ops[1];
    return [total, items];
  });
}

describe('ProductsService filtering', () => {
  let service: ProductsService;
  let prisma: PrismaMock;

  beforeEach(() => {
    prisma = new PrismaMock();
    service = new ProductsService(prisma as any);
  });

  it('applies search across fields', async () => {
    await service.list({ search: 'dunk', page: 1, pageSize: 5 });
    const args = (prisma.product.findMany as jest.Mock).mock.calls[0][0];
    expect(args.where.OR).toEqual([
      { name: { contains: 'dunk' } },
      { description: { contains: 'dunk' } },
      { brand: { contains: 'dunk' } },
      { category: { contains: 'dunk' } },
    ]);
  });

  it('applies price, rating, stock filters', async () => {
    await service.list({ minPrice: 100, maxPrice: 150, minRating: 4, inStock: true });
    const args = (prisma.product.findMany as jest.Mock).mock.calls[0][0];
    expect(args.where.price).toEqual({ gte: 100, lte: 150 });
    expect(args.where.rating).toEqual({ gte: 4 });
    expect(args.where.stock).toEqual({ gt: 0 });
  });
});

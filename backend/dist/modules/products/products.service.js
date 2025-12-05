"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(filters) {
        const { search, category, excludeCategory, brand, minPrice, maxPrice, minRating, inStock, page = 1, pageSize = 12, } = filters;
        const where = {};
        if (search)
            where.OR = [
                { name: { contains: search } },
                { description: { contains: search } },
                { brand: { contains: search } },
                { category: { contains: search } },
            ];
        if (category)
            where.category = category;
        if (excludeCategory)
            where.NOT = [{ category: excludeCategory }];
        if (brand)
            where.brand = brand;
        if (typeof minPrice === 'number' || typeof maxPrice === 'number')
            where.price = {};
        if (typeof minPrice === 'number')
            where.price.gte = minPrice;
        if (typeof maxPrice === 'number')
            where.price.lte = maxPrice;
        if (typeof minRating === 'number')
            where.rating = { gte: minRating };
        if (typeof inStock === 'boolean')
            where.stock = inStock ? { gt: 0 } : { equals: 0 };
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
        const randomized = search ? shuffle(items) : items;
        return { total, page, pageSize, items: randomized };
    }
    async getById(id) {
        return this.prisma.product.findUnique({ where: { id }, include: { images: true } });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
//# sourceMappingURL=products.service.js.map
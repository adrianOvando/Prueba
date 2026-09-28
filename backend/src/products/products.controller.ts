import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, CreateOrderDto } from './product.interface';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService) private readonly productsService: ProductsService,
  ) {}

  @Get()
  getAll(
    @Query('category') category?: string,
    @Query('search') search?: string,
  ): Product[] {
    return this.productsService.findAll(category, search);
  }

  @Get('categories')
  getCategories(): string[] {
    return this.productsService.getCategories();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Product {
    return this.productsService.findOne(id);
  }

  @Post('checkout')
  @HttpCode(HttpStatus.CREATED)
  checkout(@Body() createOrderDto: CreateOrderDto) {
    return this.productsService.createOrder(createOrderDto);
  }
}

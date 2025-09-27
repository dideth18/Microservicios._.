import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.natsClient.send({ cmd: 'createProduct' }, product).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  getAll(@Query() paginationDto: PaginationDto) {
    return this.natsClient.send({ cmd: 'getAllProducts' }, paginationDto);
  }

  @Get(':id')
  async getbyId(@Param('id', ParseIntPipe) id: number) {
    // * FORMA 1 DE MANEJAR LAS EXCEPCIONES
    return this.natsClient.send({ cmd: 'getProductById' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    // * FORMA 2 DE MANEJAR LAS EXCEPCIONES
    // try {
    //   // * Manejando el Observable que se retorna al hacer el .send
    //   const product = await firstValueFrom(
    //     this.productClient.send({ cmd: 'getById' }, { id }),
    //   );
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Patch()
  update(@Body() product: UpdateProductDto) {
    return this.natsClient.send({ cmd: 'updateProduct' }, product).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.natsClient.send({ cmd: 'deleteProduct' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}

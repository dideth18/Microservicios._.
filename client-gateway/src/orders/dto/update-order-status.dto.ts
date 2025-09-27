import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsEnum(OrderStatusList, {
    message: `Possible status values are: ${OrderStatusList}`,
  })
  status: OrderStatus;
}

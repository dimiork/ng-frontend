import { Product } from './product.model';
import { User } from './user';

export class Order {
  date: number;
  client: User;
  total: number;
  items: {
    [key: string]: {
      product: Product;
      quantity: number;
    }
  };
}

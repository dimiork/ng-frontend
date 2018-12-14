import { Product } from './product.model';
import { User } from './user';

export class Wishlist {
    id?: string;
    items: Product[];
    client: User;
  }

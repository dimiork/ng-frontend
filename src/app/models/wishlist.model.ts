import { User } from '../model/user.model';
import { Product } from '../model/product.model';

export class Wishlist {
    id: string;
    client: User;
    items: Product[];
}
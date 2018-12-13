import { Order } from './order';

export class Checkout {
  order: Order;
  card_number: number;
  security_code: number;
  expiration: Date;
}

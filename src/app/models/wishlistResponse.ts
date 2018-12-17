
export class WishlistResponse {
  success: boolean;
  wishlist: {
    id: string,
    client: {
      id: string,
      login: string,
      password: string,
      iat: number,
      exp: number
    };
    items: [
      {
        id: string,
        title: string,
        description: string,
        category_id: string,
        category_title: string,
        price: number,
        stock: number,
        thumbnail: string
      }
    ];
  };
}

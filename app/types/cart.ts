export interface cartITem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  thumbnail: string;
}
export interface order {
  items: cartITem[];
  total: number;
  time: string;
}

export interface checkoutResponse {
  success: boolean;
  id: string;
}

export interface Application {
  id: number;
  number: string;
  name: string;
  status: number;
  verificationResult: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  quantity: string;
  price: string;
  color: string;
}

export interface SendRequest {
  id: number;
  products: Product[];
}

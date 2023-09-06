export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  createdAt: string;
  updatedAt: string;

  // for cart
  quantity: number;
  totalPrice: number;
}

export interface CategoryType {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: string;
  createdAt: string;
  updatedAt: string;
}

export interface CatchBlockErrorType {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
}

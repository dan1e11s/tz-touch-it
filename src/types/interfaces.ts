export interface Rating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: Rating;
}

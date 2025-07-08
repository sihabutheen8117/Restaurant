export interface Review {
  reviewer_id: string;
  reviewer_name: string;
  review_date: Date;
  review_ratings: number;
  review_details: string;
}

export interface Rating {
  rater_id: string;
  stars?: number;
}

export interface Order {
  order_id: string;
  order_date: Date;
}

  export interface Food {
    _id?: string; 
    food_id?: string;
    food_name: string;
    food_image: string;
    describtion?: string;
    price: number;
    offer_price?: number;
    offer_validity?: string;
    ingredients: string;
    reviews?: Review[];
    ratings?: Rating[];
    rating_stars?: number;
    category?:string ;
    orders?: Order[];
    rating_count? : number ;
    review_count? : number ;
    isDisable : boolean ;
  }

  export interface UserFilters {
    price_order : number ;
    price_range : number ;
    ratings : number ;
    type?: string[] ;
    taste?: string[] ;
  }

  export interface CartItems {
    food_image : string ;
    food_name : string ;
    price : number ;
    offer_price : number ;
    _id : string ;
    quantity : number ;
  }
export interface Reviews {
  reviews: Review[];
  totalReviewCount: number;
  hasMoreReviews: boolean;
}

export interface Review {
  id: number;
  userId: string;
  userDisplayName: string;
  updatedDate: string;
  rating: number;
  text: string;
  productVersion: string;
  isDeleted: boolean;
  isIgnored: boolean;
  reCaptchaToken?: any;
  reply?: Reply;
}

export interface Reply {
  id: number;
  reviewId: number;
  userId: string;
  replyText: string;
  updatedDate: string;
  isDeleted: boolean;
}

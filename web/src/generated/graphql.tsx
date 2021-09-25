import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Bookings = {
  __typename?: 'Bookings';
  bookingStatus?: Maybe<Scalars['String']>;
  carId?: Maybe<Scalars['Float']>;
  comment?: Maybe<Array<Comment>>;
  createdAt?: Maybe<Scalars['String']>;
  fromDate?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  orderId?: Maybe<Scalars['String']>;
  post: Post;
  ratingStatus?: Maybe<Scalars['Boolean']>;
  toDate?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CarDetails = {
  __typename?: 'CarDetails';
  additionalFAQ?: Maybe<Array<Scalars['String']>>;
  availableFrom?: Maybe<Scalars['String']>;
  availableTo?: Maybe<Scalars['String']>;
  commentId?: Maybe<Scalars['Int']>;
  condition?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  doors?: Maybe<Scalars['Int']>;
  fuelType?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  mediaSystem?: Maybe<Array<Scalars['String']>>;
  mileage?: Maybe<Scalars['Int']>;
  petSituation?: Maybe<Array<Scalars['String']>>;
  seats?: Maybe<Scalars['Int']>;
  transmission?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  bookings?: Maybe<Bookings>;
  commentText?: Maybe<Scalars['String']>;
  commentTitle?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CreatePostType = {
  Doors: Scalars['Float'];
  Mileage: Scalars['Float'];
  Miles: Scalars['Float'];
  Seats: Scalars['Float'];
  Transmission: Scalars['String'];
  carCondition: Scalars['String'];
  carCostPerDay: Scalars['Int'];
  carMake: Scalars['String'];
  carModel: Scalars['String'];
  carVin: Scalars['String'];
  carYear: Scalars['String'];
  category: Scalars['String'];
  conditionDescription: Scalars['String'];
  description: Scalars['String'];
  destination: Scalars['String'];
  fuelType: Scalars['String'];
  imageUrl: Array<Scalars['String']>;
  mediaSystem: Array<Scalars['String']>;
  petSituation: Array<Scalars['String']>;
};

export type Destination = {
  __typename?: 'Destination';
  createdAt?: Maybe<Scalars['String']>;
  destinationImage?: Maybe<Scalars['String']>;
  destinationName: Scalars['String'];
  id: Scalars['Int'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addReview: Scalars['Boolean'];
  changePassword: UserResponse;
  createPost: Scalars['Boolean'];
  createpost: Scalars['Boolean'];
  filterCars?: Maybe<PaginatedPosts>;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  ratePost: Scalars['Boolean'];
  razorpaypayment: RazorpayResponse;
  register?: Maybe<UserResponse>;
};


export type MutationAddReviewArgs = {
  bookingId: Scalars['Float'];
  commentText: Scalars['String'];
  commentTitle: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  options: CreatePostType;
};


export type MutationFilterCarsArgs = {
  carMake?: Maybe<Scalars['String']>;
  carModel?: Maybe<Scalars['String']>;
  carYear?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  skipVariable: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRatePostArgs = {
  bookingId: Scalars['Float'];
  id: Scalars['Float'];
  userpoints: Scalars['Float'];
};


export type MutationRazorpaypaymentArgs = {
  id: Scalars['Float'];
  userFromDate: Scalars['DateTime'];
  userToDate: Scalars['DateTime'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordRegistrationInput;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  total: Scalars['Float'];
};

export type PaymentStatus = {
  __typename?: 'PaymentStatus';
  status: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  bookings?: Maybe<Array<Bookings>>;
  carCostPerDay?: Maybe<Scalars['Float']>;
  carDetails: CarDetails;
  carMake?: Maybe<Scalars['String']>;
  carModel?: Maybe<Scalars['String']>;
  carVin?: Maybe<Scalars['String']>;
  carYear?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  creator?: Maybe<User>;
  destination?: Maybe<Destination>;
  id?: Maybe<Scalars['Int']>;
  imageUrl?: Maybe<Array<Scalars['String']>>;
  points?: Maybe<Scalars['Float']>;
  rentedFrom?: Maybe<Scalars['DateTime']>;
  rentedUntil?: Maybe<Scalars['DateTime']>;
  trips?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['String']>;
  usersRated?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  allStarReviews?: Maybe<Array<Post>>;
  browseByCarMake: Array<Post>;
  browseByDestination: Array<Destination>;
  experienceReviews: Array<Comment>;
  filterPost: Array<Post>;
  findCars?: Maybe<PaginatedPosts>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  paymentstatus: PaymentStatus;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  search: Array<Post>;
};


export type QueryExperienceReviewsArgs = {
  carId: Scalars['Float'];
};


export type QueryFilterPostArgs = {
  filterCategory: Scalars['String'];
  filterCriteria: Scalars['String'];
};


export type QueryFindCarsArgs = {
  carMake?: Maybe<Scalars['String']>;
  carModel?: Maybe<Scalars['String']>;
  carYear?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  skipVariable: Scalars['Int'];
};


export type QueryPaymentstatusArgs = {
  orderId: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QuerySearchArgs = {
  destinationId: Scalars['Float'];
  fromDate: Scalars['DateTime'];
  toDate: Scalars['DateTime'];
};

export type RazorpayFields = {
  __typename?: 'RazorpayFields';
  amount?: Maybe<Scalars['Float']>;
  amount_due?: Maybe<Scalars['Float']>;
  amount_paid?: Maybe<Scalars['Float']>;
  attempts?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  entity?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  offer_id?: Maybe<Scalars['String']>;
  receipt?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type RazorpayResponse = {
  __typename?: 'RazorpayResponse';
  errors?: Maybe<Scalars['String']>;
  paymentResponse?: Maybe<RazorpayFields>;
};

export type User = {
  __typename?: 'User';
  bookings?: Maybe<Array<Bookings>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  posts?: Maybe<Array<Post>>;
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordRegistrationInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularErrorsFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, email: string };

export type AddReviewMutationVariables = Exact<{
  addReviewCommentText: Scalars['String'];
  addReviewBookingId: Scalars['Float'];
  addReviewCommentTitle: Scalars['String'];
}>;


export type AddReviewMutation = { __typename?: 'Mutation', addReview: boolean };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type FilterCarsMutationVariables = Exact<{
  findCarsLimit: Scalars['Int'];
  findCarsSkipVariable: Scalars['Int'];
  carMake?: Maybe<Scalars['String']>;
  carYear?: Maybe<Scalars['String']>;
  carModel?: Maybe<Scalars['String']>;
}>;


export type FilterCarsMutation = { __typename?: 'Mutation', filterCars?: Maybe<{ __typename?: 'PaginatedPosts', total: number, posts: Array<{ __typename?: 'Post', id?: Maybe<number>, carMake?: Maybe<string>, carModel?: Maybe<string>, imageUrl?: Maybe<Array<string>>, carYear?: Maybe<string>, trips?: Maybe<number>, points?: Maybe<number>, carCostPerDay?: Maybe<number>, destination?: Maybe<{ __typename?: 'Destination', id: number, destinationName: string }> }> }> };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type HostCarMutationVariables = Exact<{
  options: CreatePostType;
}>;


export type HostCarMutation = { __typename?: 'Mutation', createPost: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logout: boolean };

export type RatePostMutationVariables = Exact<{
  userRating: Scalars['Float'];
  postId: Scalars['Float'];
  bookingId: Scalars['Float'];
}>;


export type RatePostMutation = { __typename?: 'Mutation', ratePost: boolean };

export type RazorpayPaymentMutationVariables = Exact<{
  razorpaypaymentUserToDate: Scalars['DateTime'];
  razorpaypaymentUserFromDate: Scalars['DateTime'];
  carId: Scalars['Float'];
}>;


export type RazorpayPaymentMutation = { __typename?: 'Mutation', razorpaypayment: { __typename?: 'RazorpayResponse', errors?: Maybe<string>, paymentResponse?: Maybe<{ __typename?: 'RazorpayFields', id?: Maybe<string>, amount_paid?: Maybe<number>, amount?: Maybe<number>, status?: Maybe<string>, receipt?: Maybe<string>, currency?: Maybe<string>, created_at?: Maybe<number>, attempts?: Maybe<number>, amount_due?: Maybe<number>, entity?: Maybe<string> }> } };

export type RegisterMutationVariables = Exact<{
  registerOptions: UsernamePasswordRegistrationInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<{ __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> }> };

export type AllStarHostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllStarHostsQuery = { __typename?: 'Query', allStarReviews?: Maybe<Array<{ __typename?: 'Post', id?: Maybe<number>, trips?: Maybe<number>, points?: Maybe<number>, createdAt?: Maybe<string>, creator?: Maybe<{ __typename?: 'User', id: number, username: string }>, bookings?: Maybe<Array<{ __typename?: 'Bookings', id: number, comment?: Maybe<Array<{ __typename?: 'Comment', commentText?: Maybe<string>, commentTitle?: Maybe<string> }>> }>> }>> };

export type DestinationsQueryVariables = Exact<{ [key: string]: never; }>;


export type DestinationsQuery = { __typename?: 'Query', browseByDestination: Array<{ __typename?: 'Destination', destinationImage?: Maybe<string>, destinationName: string, id: number }> };

export type FilterPostQueryVariables = Exact<{
  filterCategory: Scalars['String'];
  filterCriteria: Scalars['String'];
}>;


export type FilterPostQuery = { __typename?: 'Query', filterPost: Array<{ __typename?: 'Post', id?: Maybe<number>, carMake?: Maybe<string>, carModel?: Maybe<string>, imageUrl?: Maybe<Array<string>>, carYear?: Maybe<string>, carCostPerDay?: Maybe<number>, trips?: Maybe<number>, points?: Maybe<number>, destination?: Maybe<{ __typename?: 'Destination', id: number, destinationName: string }> }> };

export type FindCarsQueryVariables = Exact<{
  findCarsLimit: Scalars['Int'];
  findCarsSkipVariable: Scalars['Int'];
  carMake?: Maybe<Scalars['String']>;
  carYear?: Maybe<Scalars['String']>;
  carModel?: Maybe<Scalars['String']>;
}>;


export type FindCarsQuery = { __typename?: 'Query', findCars?: Maybe<{ __typename?: 'PaginatedPosts', total: number, posts: Array<{ __typename?: 'Post', id?: Maybe<number>, carMake?: Maybe<string>, carModel?: Maybe<string>, imageUrl?: Maybe<Array<string>>, carYear?: Maybe<string>, trips?: Maybe<number>, points?: Maybe<number>, carCostPerDay?: Maybe<number>, destination?: Maybe<{ __typename?: 'Destination', id: number, destinationName: string }> }> }> };

export type GetReviewsQueryVariables = Exact<{
  carId: Scalars['Float'];
}>;


export type GetReviewsQuery = { __typename?: 'Query', experienceReviews: Array<{ __typename?: 'Comment', commentText?: Maybe<string>, id?: Maybe<number> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> };

export type PaymentStatusQueryVariables = Exact<{
  orderId: Scalars['String'];
}>;


export type PaymentStatusQuery = { __typename?: 'Query', paymentstatus: { __typename?: 'PaymentStatus', status: boolean } };

export type PostQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', id?: Maybe<number>, carMake?: Maybe<string>, carModel?: Maybe<string>, imageUrl?: Maybe<Array<string>>, carYear?: Maybe<string>, trips?: Maybe<number>, points?: Maybe<number>, carCostPerDay?: Maybe<number>, destination?: Maybe<{ __typename?: 'Destination', destinationName: string }>, creator?: Maybe<{ __typename?: 'User', username: string, createdAt: any }>, carDetails: { __typename?: 'CarDetails', condition?: Maybe<string>, description?: Maybe<string>, doors?: Maybe<number>, fuelType?: Maybe<string>, mediaSystem?: Maybe<Array<string>>, mileage?: Maybe<number>, petSituation?: Maybe<Array<string>>, seats?: Maybe<number>, transmission?: Maybe<string>, commentId?: Maybe<number> }, bookings?: Maybe<Array<{ __typename?: 'Bookings', fromDate?: Maybe<string>, toDate?: Maybe<string> }>> }> };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', browseByCarMake: Array<{ __typename?: 'Post', id?: Maybe<number>, carMake?: Maybe<string>, carModel?: Maybe<string>, imageUrl?: Maybe<Array<string>>, carYear?: Maybe<string>, trips?: Maybe<number>, points?: Maybe<number>, destination?: Maybe<{ __typename?: 'Destination', id: number, destinationName: string }> }> };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, bookings?: Maybe<Array<{ __typename?: 'Bookings', id: number, carId?: Maybe<number>, fromDate?: Maybe<string>, toDate?: Maybe<string>, ratingStatus?: Maybe<boolean>, bookingStatus?: Maybe<string>, comment?: Maybe<Array<{ __typename?: 'Comment', commentText?: Maybe<string>, id?: Maybe<number> }>> }>>, posts?: Maybe<Array<{ __typename?: 'Post', id?: Maybe<number>, carMake?: Maybe<string>, carModel?: Maybe<string>, carYear?: Maybe<string> }>> }> };

export type SearchQueryVariables = Exact<{
  searchToDate: Scalars['DateTime'];
  searchFromDate: Scalars['DateTime'];
  searchDestinationId: Scalars['Float'];
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'Post', carMake?: Maybe<string>, carModel?: Maybe<string>, id?: Maybe<number>, carYear?: Maybe<string>, imageUrl?: Maybe<Array<string>>, trips?: Maybe<number>, points?: Maybe<number> }> };

export const RegularErrorsFragmentDoc = gql`
    fragment RegularErrors on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
}
    `;
export const AddReviewDocument = gql`
    mutation AddReview($addReviewCommentText: String!, $addReviewBookingId: Float!, $addReviewCommentTitle: String!) {
  addReview(
    commentText: $addReviewCommentText
    bookingId: $addReviewBookingId
    commentTitle: $addReviewCommentTitle
  )
}
    `;
export type AddReviewMutationFn = Apollo.MutationFunction<AddReviewMutation, AddReviewMutationVariables>;

/**
 * __useAddReviewMutation__
 *
 * To run a mutation, you first call `useAddReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReviewMutation, { data, loading, error }] = useAddReviewMutation({
 *   variables: {
 *      addReviewCommentText: // value for 'addReviewCommentText'
 *      addReviewBookingId: // value for 'addReviewBookingId'
 *      addReviewCommentTitle: // value for 'addReviewCommentTitle'
 *   },
 * });
 */
export function useAddReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddReviewMutation, AddReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReviewMutation, AddReviewMutationVariables>(AddReviewDocument, options);
      }
export type AddReviewMutationHookResult = ReturnType<typeof useAddReviewMutation>;
export type AddReviewMutationResult = Apollo.MutationResult<AddReviewMutation>;
export type AddReviewMutationOptions = Apollo.BaseMutationOptions<AddReviewMutation, AddReviewMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      ...RegularErrors
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorsFragmentDoc}
${RegularUserFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const FilterCarsDocument = gql`
    mutation FilterCars($findCarsLimit: Int!, $findCarsSkipVariable: Int!, $carMake: String, $carYear: String, $carModel: String) {
  filterCars(
    limit: $findCarsLimit
    skipVariable: $findCarsSkipVariable
    carMake: $carMake
    carYear: $carYear
    carModel: $carModel
  ) {
    posts {
      id
      carMake
      carModel
      imageUrl
      carYear
      trips
      points
      carCostPerDay
      destination {
        id
        destinationName
      }
    }
    total
  }
}
    `;
export type FilterCarsMutationFn = Apollo.MutationFunction<FilterCarsMutation, FilterCarsMutationVariables>;

/**
 * __useFilterCarsMutation__
 *
 * To run a mutation, you first call `useFilterCarsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFilterCarsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [filterCarsMutation, { data, loading, error }] = useFilterCarsMutation({
 *   variables: {
 *      findCarsLimit: // value for 'findCarsLimit'
 *      findCarsSkipVariable: // value for 'findCarsSkipVariable'
 *      carMake: // value for 'carMake'
 *      carYear: // value for 'carYear'
 *      carModel: // value for 'carModel'
 *   },
 * });
 */
export function useFilterCarsMutation(baseOptions?: Apollo.MutationHookOptions<FilterCarsMutation, FilterCarsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FilterCarsMutation, FilterCarsMutationVariables>(FilterCarsDocument, options);
      }
export type FilterCarsMutationHookResult = ReturnType<typeof useFilterCarsMutation>;
export type FilterCarsMutationResult = Apollo.MutationResult<FilterCarsMutation>;
export type FilterCarsMutationOptions = Apollo.BaseMutationOptions<FilterCarsMutation, FilterCarsMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const HostCarDocument = gql`
    mutation HostCar($options: CreatePostType!) {
  createPost(options: $options)
}
    `;
export type HostCarMutationFn = Apollo.MutationFunction<HostCarMutation, HostCarMutationVariables>;

/**
 * __useHostCarMutation__
 *
 * To run a mutation, you first call `useHostCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHostCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hostCarMutation, { data, loading, error }] = useHostCarMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useHostCarMutation(baseOptions?: Apollo.MutationHookOptions<HostCarMutation, HostCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HostCarMutation, HostCarMutationVariables>(HostCarDocument, options);
      }
export type HostCarMutationHookResult = ReturnType<typeof useHostCarMutation>;
export type HostCarMutationResult = Apollo.MutationResult<HostCarMutation>;
export type HostCarMutationOptions = Apollo.BaseMutationOptions<HostCarMutation, HostCarMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logout
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const RatePostDocument = gql`
    mutation RatePost($userRating: Float!, $postId: Float!, $bookingId: Float!) {
  ratePost(userpoints: $userRating, id: $postId, bookingId: $bookingId)
}
    `;
export type RatePostMutationFn = Apollo.MutationFunction<RatePostMutation, RatePostMutationVariables>;

/**
 * __useRatePostMutation__
 *
 * To run a mutation, you first call `useRatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratePostMutation, { data, loading, error }] = useRatePostMutation({
 *   variables: {
 *      userRating: // value for 'userRating'
 *      postId: // value for 'postId'
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useRatePostMutation(baseOptions?: Apollo.MutationHookOptions<RatePostMutation, RatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RatePostMutation, RatePostMutationVariables>(RatePostDocument, options);
      }
export type RatePostMutationHookResult = ReturnType<typeof useRatePostMutation>;
export type RatePostMutationResult = Apollo.MutationResult<RatePostMutation>;
export type RatePostMutationOptions = Apollo.BaseMutationOptions<RatePostMutation, RatePostMutationVariables>;
export const RazorpayPaymentDocument = gql`
    mutation RazorpayPayment($razorpaypaymentUserToDate: DateTime!, $razorpaypaymentUserFromDate: DateTime!, $carId: Float!) {
  razorpaypayment(
    userToDate: $razorpaypaymentUserToDate
    userFromDate: $razorpaypaymentUserFromDate
    id: $carId
  ) {
    errors
    paymentResponse {
      id
      amount_paid
      amount
      status
      receipt
      currency
      created_at
      attempts
      amount_due
      entity
    }
  }
}
    `;
export type RazorpayPaymentMutationFn = Apollo.MutationFunction<RazorpayPaymentMutation, RazorpayPaymentMutationVariables>;

/**
 * __useRazorpayPaymentMutation__
 *
 * To run a mutation, you first call `useRazorpayPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRazorpayPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [razorpayPaymentMutation, { data, loading, error }] = useRazorpayPaymentMutation({
 *   variables: {
 *      razorpaypaymentUserToDate: // value for 'razorpaypaymentUserToDate'
 *      razorpaypaymentUserFromDate: // value for 'razorpaypaymentUserFromDate'
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useRazorpayPaymentMutation(baseOptions?: Apollo.MutationHookOptions<RazorpayPaymentMutation, RazorpayPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RazorpayPaymentMutation, RazorpayPaymentMutationVariables>(RazorpayPaymentDocument, options);
      }
export type RazorpayPaymentMutationHookResult = ReturnType<typeof useRazorpayPaymentMutation>;
export type RazorpayPaymentMutationResult = Apollo.MutationResult<RazorpayPaymentMutation>;
export type RazorpayPaymentMutationOptions = Apollo.BaseMutationOptions<RazorpayPaymentMutation, RazorpayPaymentMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerOptions: UsernamePasswordRegistrationInput!) {
  register(options: $registerOptions) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerOptions: // value for 'registerOptions'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AllStarHostsDocument = gql`
    query AllStarHosts {
  allStarReviews {
    id
    trips
    points
    createdAt
    creator {
      id
      username
    }
    bookings {
      id
      comment {
        commentText
        commentTitle
      }
    }
  }
}
    `;

/**
 * __useAllStarHostsQuery__
 *
 * To run a query within a React component, call `useAllStarHostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllStarHostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllStarHostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllStarHostsQuery(baseOptions?: Apollo.QueryHookOptions<AllStarHostsQuery, AllStarHostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllStarHostsQuery, AllStarHostsQueryVariables>(AllStarHostsDocument, options);
      }
export function useAllStarHostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllStarHostsQuery, AllStarHostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllStarHostsQuery, AllStarHostsQueryVariables>(AllStarHostsDocument, options);
        }
export type AllStarHostsQueryHookResult = ReturnType<typeof useAllStarHostsQuery>;
export type AllStarHostsLazyQueryHookResult = ReturnType<typeof useAllStarHostsLazyQuery>;
export type AllStarHostsQueryResult = Apollo.QueryResult<AllStarHostsQuery, AllStarHostsQueryVariables>;
export const DestinationsDocument = gql`
    query Destinations {
  browseByDestination {
    destinationImage
    destinationName
    id
  }
}
    `;

/**
 * __useDestinationsQuery__
 *
 * To run a query within a React component, call `useDestinationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDestinationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDestinationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDestinationsQuery(baseOptions?: Apollo.QueryHookOptions<DestinationsQuery, DestinationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DestinationsQuery, DestinationsQueryVariables>(DestinationsDocument, options);
      }
export function useDestinationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DestinationsQuery, DestinationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DestinationsQuery, DestinationsQueryVariables>(DestinationsDocument, options);
        }
export type DestinationsQueryHookResult = ReturnType<typeof useDestinationsQuery>;
export type DestinationsLazyQueryHookResult = ReturnType<typeof useDestinationsLazyQuery>;
export type DestinationsQueryResult = Apollo.QueryResult<DestinationsQuery, DestinationsQueryVariables>;
export const FilterPostDocument = gql`
    query filterPost($filterCategory: String!, $filterCriteria: String!) {
  filterPost(filterCategory: $filterCategory, filterCriteria: $filterCriteria) {
    id
    carMake
    carModel
    imageUrl
    carYear
    carCostPerDay
    trips
    points
    destination {
      id
      destinationName
    }
  }
}
    `;

/**
 * __useFilterPostQuery__
 *
 * To run a query within a React component, call `useFilterPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterPostQuery({
 *   variables: {
 *      filterCategory: // value for 'filterCategory'
 *      filterCriteria: // value for 'filterCriteria'
 *   },
 * });
 */
export function useFilterPostQuery(baseOptions: Apollo.QueryHookOptions<FilterPostQuery, FilterPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilterPostQuery, FilterPostQueryVariables>(FilterPostDocument, options);
      }
export function useFilterPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilterPostQuery, FilterPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilterPostQuery, FilterPostQueryVariables>(FilterPostDocument, options);
        }
export type FilterPostQueryHookResult = ReturnType<typeof useFilterPostQuery>;
export type FilterPostLazyQueryHookResult = ReturnType<typeof useFilterPostLazyQuery>;
export type FilterPostQueryResult = Apollo.QueryResult<FilterPostQuery, FilterPostQueryVariables>;
export const FindCarsDocument = gql`
    query FindCars($findCarsLimit: Int!, $findCarsSkipVariable: Int!, $carMake: String, $carYear: String, $carModel: String) {
  findCars(
    limit: $findCarsLimit
    skipVariable: $findCarsSkipVariable
    carMake: $carMake
    carYear: $carYear
    carModel: $carModel
  ) {
    posts {
      id
      carMake
      carModel
      imageUrl
      carYear
      trips
      points
      carCostPerDay
      destination {
        id
        destinationName
      }
    }
    total
  }
}
    `;

/**
 * __useFindCarsQuery__
 *
 * To run a query within a React component, call `useFindCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCarsQuery({
 *   variables: {
 *      findCarsLimit: // value for 'findCarsLimit'
 *      findCarsSkipVariable: // value for 'findCarsSkipVariable'
 *      carMake: // value for 'carMake'
 *      carYear: // value for 'carYear'
 *      carModel: // value for 'carModel'
 *   },
 * });
 */
export function useFindCarsQuery(baseOptions: Apollo.QueryHookOptions<FindCarsQuery, FindCarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCarsQuery, FindCarsQueryVariables>(FindCarsDocument, options);
      }
export function useFindCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCarsQuery, FindCarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCarsQuery, FindCarsQueryVariables>(FindCarsDocument, options);
        }
export type FindCarsQueryHookResult = ReturnType<typeof useFindCarsQuery>;
export type FindCarsLazyQueryHookResult = ReturnType<typeof useFindCarsLazyQuery>;
export type FindCarsQueryResult = Apollo.QueryResult<FindCarsQuery, FindCarsQueryVariables>;
export const GetReviewsDocument = gql`
    query GetReviews($carId: Float!) {
  experienceReviews(carId: $carId) {
    commentText
    id
  }
}
    `;

/**
 * __useGetReviewsQuery__
 *
 * To run a query within a React component, call `useGetReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsQuery({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useGetReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
      }
export function useGetReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
        }
export type GetReviewsQueryHookResult = ReturnType<typeof useGetReviewsQuery>;
export type GetReviewsLazyQueryHookResult = ReturnType<typeof useGetReviewsLazyQuery>;
export type GetReviewsQueryResult = Apollo.QueryResult<GetReviewsQuery, GetReviewsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PaymentStatusDocument = gql`
    query PaymentStatus($orderId: String!) {
  paymentstatus(orderId: $orderId) {
    status
  }
}
    `;

/**
 * __usePaymentStatusQuery__
 *
 * To run a query within a React component, call `usePaymentStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentStatusQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function usePaymentStatusQuery(baseOptions: Apollo.QueryHookOptions<PaymentStatusQuery, PaymentStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentStatusQuery, PaymentStatusQueryVariables>(PaymentStatusDocument, options);
      }
export function usePaymentStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentStatusQuery, PaymentStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentStatusQuery, PaymentStatusQueryVariables>(PaymentStatusDocument, options);
        }
export type PaymentStatusQueryHookResult = ReturnType<typeof usePaymentStatusQuery>;
export type PaymentStatusLazyQueryHookResult = ReturnType<typeof usePaymentStatusLazyQuery>;
export type PaymentStatusQueryResult = Apollo.QueryResult<PaymentStatusQuery, PaymentStatusQueryVariables>;
export const PostDocument = gql`
    query Post($postId: Float!) {
  post(id: $postId) {
    id
    carMake
    carModel
    imageUrl
    carYear
    trips
    points
    destination {
      destinationName
    }
    creator {
      username
      createdAt
    }
    carCostPerDay
    carDetails {
      condition
      description
      doors
      fuelType
      mediaSystem
      mileage
      petSituation
      seats
      transmission
      commentId
    }
    bookings {
      fromDate
      toDate
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  browseByCarMake {
    id
    carMake
    carModel
    imageUrl
    carYear
    trips
    points
    destination {
      id
      destinationName
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  me {
    ...RegularUser
    bookings {
      id
      carId
      fromDate
      toDate
      ratingStatus
      bookingStatus
      comment {
        commentText
        id
      }
    }
    posts {
      id
      carMake
      carModel
      carYear
    }
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const SearchDocument = gql`
    query Search($searchToDate: DateTime!, $searchFromDate: DateTime!, $searchDestinationId: Float!) {
  search(
    toDate: $searchToDate
    fromDate: $searchFromDate
    destinationId: $searchDestinationId
  ) {
    carMake
    carModel
    id
    carYear
    imageUrl
    trips
    points
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      searchToDate: // value for 'searchToDate'
 *      searchFromDate: // value for 'searchFromDate'
 *      searchDestinationId: // value for 'searchDestinationId'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
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

export type CreatePostType = {
  Doors: Scalars['Float'];
  Mileage: Scalars['Float'];
  Miles: Scalars['Float'];
  Seats: Scalars['Float'];
  Transmission: Scalars['String'];
  carCondition: Scalars['String'];
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
  changePassword: UserResponse;
  createPost: Scalars['Boolean'];
  createpost: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  razorpaypayment: RazorpayResponse;
  register?: Maybe<UserResponse>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  options: CreatePostType;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameoremail: Scalars['String'];
};


export type MutationRazorpaypaymentArgs = {
  id: Scalars['Float'];
  userFromDate: Scalars['DateTime'];
  userToDate: Scalars['DateTime'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordRegistrationInput;
};

export type PaymentStatus = {
  __typename?: 'PaymentStatus';
  status: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  carCostPerDay?: Maybe<Scalars['Float']>;
  carMake: Scalars['String'];
  carModel?: Maybe<Scalars['String']>;
  carVin?: Maybe<Scalars['String']>;
  carYear?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  creator?: Maybe<User>;
  destination?: Maybe<Destination>;
  id: Scalars['Int'];
  imageUrl?: Maybe<Array<Scalars['String']>>;
  points?: Maybe<Scalars['Float']>;
  trips?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  browseByCarMake: Array<Post>;
  browseByDestination: Array<Destination>;
  filterPost: Array<Post>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  paymentstatus: PaymentStatus;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  search: Array<Post>;
};


export type QueryFilterPostArgs = {
  filterCategory: Scalars['String'];
  filterCriteria: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  posts: Array<Post>;
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
  role: Scalars['String'];
  username: Scalars['String'];
};

export type RegularErrorsFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string }> } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type HostCarMutationVariables = Exact<{
  options: CreatePostType;
}>;


export type HostCarMutation = { __typename?: 'Mutation', createPost: boolean };

export type LoginMutationVariables = Exact<{
  loginPassword: Scalars['String'];
  loginUsernameoremail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, role: string }> } };

export type RazorpayPaymentMutationVariables = Exact<{
  razorpaypaymentUserToDate: Scalars['DateTime'];
  razorpaypaymentUserFromDate: Scalars['DateTime'];
  carId: Scalars['Float'];
}>;


export type RazorpayPaymentMutation = { __typename?: 'Mutation', razorpaypayment: { __typename?: 'RazorpayResponse', errors?: Maybe<string>, paymentResponse?: Maybe<{ __typename?: 'RazorpayFields', id?: Maybe<string>, amount_paid?: Maybe<number>, amount?: Maybe<number>, status?: Maybe<string>, receipt?: Maybe<string>, currency?: Maybe<string>, created_at?: Maybe<number>, attempts?: Maybe<number>, amount_due?: Maybe<number>, entity?: Maybe<string> }> } };

export type RegisterMutationVariables = Exact<{
  registerOptions: UsernamePasswordRegistrationInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<{ __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, username: string }> }> };

export type DestinationsQueryVariables = Exact<{ [key: string]: never; }>;


export type DestinationsQuery = { __typename?: 'Query', browseByDestination: Array<{ __typename?: 'Destination', destinationImage?: Maybe<string>, destinationName: string, id: number }> };

export type FilterPostQueryVariables = Exact<{
  filterCategory: Scalars['String'];
  filterCriteria: Scalars['String'];
}>;


export type FilterPostQuery = { __typename?: 'Query', filterPost: Array<{ __typename?: 'Post', id: number, carMake: string, carModel?: Maybe<string>, imageUrl?: Maybe<Array<string>>, carYear?: Maybe<string>, trips?: Maybe<number>, points?: Maybe<number>, destination?: Maybe<{ __typename?: 'Destination', id: number, destinationName: string }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, role: string }> };

export type PaymentStatusQueryVariables = Exact<{
  orderId: Scalars['String'];
}>;


export type PaymentStatusQuery = { __typename?: 'Query', paymentstatus: { __typename?: 'PaymentStatus', status: boolean } };

export type PostQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', id: number, carMake: string, carModel?: Maybe<string>, imageUrl?: Maybe<Array<string>>, carYear?: Maybe<string>, trips?: Maybe<number>, points?: Maybe<number>, carCostPerDay?: Maybe<number>, destination?: Maybe<{ __typename?: 'Destination', destinationName: string }>, creator?: Maybe<{ __typename?: 'User', username: string }> }> };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', browseByCarMake: Array<{ __typename?: 'Post', id: number, carMake: string, carModel?: Maybe<string>, imageUrl?: Maybe<Array<string>>, carYear?: Maybe<string>, trips?: Maybe<number>, points?: Maybe<number>, destination?: Maybe<{ __typename?: 'Destination', id: number, destinationName: string }> }> };

export type SearchQueryVariables = Exact<{
  searchToDate: Scalars['DateTime'];
  searchFromDate: Scalars['DateTime'];
  searchDestinationId: Scalars['Float'];
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'Post', carMake: string, carModel?: Maybe<string>, id: number, carYear?: Maybe<string>, imageUrl?: Maybe<Array<string>>, trips?: Maybe<number>, points?: Maybe<number> }> };

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
}
    `;
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
    mutation Login($loginPassword: String!, $loginUsernameoremail: String!) {
  login(password: $loginPassword, usernameoremail: $loginUsernameoremail) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      role
    }
  }
}
    `;
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
 *      loginPassword: // value for 'loginPassword'
 *      loginUsernameoremail: // value for 'loginUsernameoremail'
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
      id
      email
      username
    }
  }
}
    `;
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
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    role
  }
}
    `;

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
    }
    carCostPerDay
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
import argon2 from "argon2";
import { randomUUID } from "crypto";
import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { validateRegister } from "../utils/validateRegister";
import { UsernamePasswordRegistrationInput } from "./usernamePasswordRegistrationInput";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class RazorpayFields {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  entity: string;

  @Field({ nullable: true })
  amount: number;

  @Field({ nullable: true })
  // eslint-disable-next-line camelcase
  amount_paid: number;

  @Field({ nullable: true })
  // eslint-disable-next-line camelcase
  amount_due: number;

  @Field({ nullable: true })
  currency: string;

  @Field({ nullable: true })
  receipt: string;

  @Field({ nullable: true })
  // eslint-disable-next-line camelcase
  offer_id: string;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  attempts: number;

  // @Field({ nullable: true })
  // notes: string[];

  @Field({ nullable: true })
  // eslint-disable-next-line camelcase
  created_at: number;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class RazorpayResponse {
  @Field(() => String, { nullable: true })
  errors?: string;

  @Field(() => RazorpayFields, { nullable: true })
  paymentResponse?: RazorpayFields;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    return await User.findOne({ id: req.session.userId });
  }

  @Mutation(() => UserResponse, { nullable: true })
  async register(
    @Arg("options") options: UsernamePasswordRegistrationInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const errors = validateRegister(options);

    if (errors) {
      return { errors };
    }

    // Hash the password before storing in the DB
    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      user = await User.create({
        username: options.username,
        password: hashedPassword,
        email: options.email,
        role: options.role,
      }).save();
    } catch (err) {
      console.log(err);
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already exists.",
            },
          ],
        };
      }
    }

    if (user) {
      req.session.userId = user.id;
    }
    return { user };
  }

  @Query(() => User, { nullable: true })
  async login(
    @Arg("usernameoremail") userNameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext,
  ): Promise<User | null> {
    // Find if user is present in DB
    const user = await User.findOne(
      userNameOrEmail.includes("@")
        ? { where: { email: userNameOrEmail } }
        : { where: { username: userNameOrEmail } },
    );

    if (!user) {
      // throw error
      return null;
    }

    const verifiedPassword = await argon2.verify(user?.password, password);

    if (!verifiedPassword) {
      console.log("Incorrect password");
      return null;
    }

    //Set the session
    req.session.userId = user.id;

    return user;
  }

  @Mutation(() => RazorpayResponse)
  async razorpaypayment(
    @Arg("id") carId: number,
    @Ctx() { razorpay }: MyContext,
  ): Promise<RazorpayResponse> {
    const car = await Post.findOne(carId);

    if (!car) {
      return { errors: "Car not found with the ID , please retry afer sometime !" };
    }

    const options = {
      amount: car.carCostPerDay * 100,
      currency: "INR",
      receipt: randomUUID(),
      payment_capture: 1,
    };

    let response;
    try {
      response = await razorpay.orders.create(options);
    } catch (err) {
      return { errors: err };
    }
    console.log(response);
    return { paymentResponse: response };
  }
}

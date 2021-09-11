import argon2 from "argon2";
import { MyContext } from "src/types";
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
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
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
}

import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User, UserRoleType } from "../entities/User";
import argon2 from "argon2";

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  role: UserRoleType;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: MyContext): Promise<User | undefined> {
    return await User.findOne({ id: 1 });
  }

  @Mutation(() => User)
  async register(@Arg("options") options: UsernamePasswordInput): Promise<User> {
    // Hash the password before storing in the DB
    const hashedPassword = await argon2.hash(options.password);
    const newUser = await User.create({
      username: options.username,
      password: hashedPassword,
      email: options.email,
      role: options.role,
    }).save();

    return newUser;
  }
}

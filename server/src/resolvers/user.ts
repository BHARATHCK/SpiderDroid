import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  role: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: MyContext): Promise<User | undefined> {
    return await User.findOne({ id: 1 });
  }

  @Mutation(() => Boolean)
  async register(@Arg("options") options: UsernamePasswordInput): Promise<boolean> {
    const userCreated = await User.create({
      username: options.username,
      password: options.password,
      email: options.email,
      role: options.role,
    }).save();

    if (userCreated.id) {
      return true;
    }

    return false;
  }
}

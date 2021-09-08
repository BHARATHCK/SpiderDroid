import { User } from "../entities/User";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: MyContext): Promise<User | undefined> {
    return await User.findOne({ id: 1 });
  }
}

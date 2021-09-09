import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User, UserRoleType } from "../entities/User";
import argon2 from "argon2";
import { MyContext } from "src/types";

@InputType()
export class UsernamePasswordRegistrationInput {
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
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    return await User.findOne({ id: req.session.userId });
  }

  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("options") options: UsernamePasswordRegistrationInput,
    @Ctx() { req }: MyContext,
  ): Promise<User | null> {
    // Hash the password before storing in the DB
    const hashedPassword = await argon2.hash(options.password);
    const newUser = await User.create({
      username: options.username,
      password: hashedPassword,
      email: options.email,
      role: options.role,
    }).save();

    if (newUser) {
      req.session.userId = newUser.id;

      return newUser;
    }

    return null;
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

import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User, UserRoleType } from "../entities/User";
import argon2 from "argon2";

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
  async user(): Promise<User | undefined> {
    return await User.findOne({ id: 1 });
  }

  @Mutation(() => User)
  async register(@Arg("options") options: UsernamePasswordRegistrationInput): Promise<User> {
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

  @Query(() => User, { nullable: true })
  async login(
    @Arg("usernameoremail") userNameOrEmail: string,
    @Arg("password") password: string,
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

    return user;
  }
}

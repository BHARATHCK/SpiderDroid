import { UserRoleType } from "src/entities/User";
import { InputType, Field } from "type-graphql";

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

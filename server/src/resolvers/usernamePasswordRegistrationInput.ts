import { Field, InputType } from "type-graphql";

@InputType()
export class UsernamePasswordRegistrationInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

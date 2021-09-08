import { Post } from "../entities/Post";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts(): Promise<Post[]> {
    return await Post.find();
  }
}

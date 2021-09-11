import { Post } from "../entities/Post";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts(): Promise<Post[]> {
    const posts = await Post.find();
    return posts;
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | undefined> {
    return await Post.findOne({ where: { id: id } });
  }
}

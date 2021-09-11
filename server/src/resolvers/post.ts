/* eslint-disable quotes */
import { Destination } from "../entities/Destination";
import { Arg, createUnionType, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";

const BrowseByResult = createUnionType({
  name: "BrowseBy", // the name of the GraphQL union
  types: () => [Post, Destination] as const, // function that returns tuple of object types classes
});

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts(): Promise<Post[]> {
    return await Post.createQueryBuilder()
      .select(['"carMake"', "id", '"imageUrl"'])
      .distinctOn(['"carMake"'])
      .getRawMany();
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | undefined> {
    return await Post.findOne({ where: { id: id } });
  }

  @Query(() => [Destination])
  async browseByDestination(): Promise<Destination[]> {
    return await Destination.find();
  }

  @Query(() => [Post])
  async browseByCarMake(): Promise<Post[]> {
    return await Post.createQueryBuilder()
      .select(['"carMake"', "id", '"imageUrl"'])
      .distinctOn(['"carMake"'])
      .getRawMany();
  }
}

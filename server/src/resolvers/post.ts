/* eslint-disable quotes */
import { DomainDump } from "../entities/DomainDump";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Destination } from "../entities/Destination";
import { Post } from "../entities/Post";
import { User } from "../entities/User";

@InputType()
class CreatePostType {
  @Field()
  carMake: string;

  @Field()
  carModel!: string;

  @Field()
  carYear!: string;

  @Field()
  category: string;

  @Field()
  carVin: string;
}

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts(): Promise<Post[]> {
    const posts = await Post.find({ relations: ["destination"] });

    return posts;
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | undefined> {
    return await Post.findOne(id, { relations: ["creator", "destination"] });
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

  @Query(() => [Post])
  async filterPost(
    @Arg("filterCategory") filterCategory: string,
    @Arg("filterCriteria") filterCriteria: string,
  ): Promise<Post[] | undefined> {
    console.log("FILTER POST INVOKED *************");
    console.log("ARGS -----------> ", filterCategory, "   --  ", filterCriteria);
    if (filterCategory.includes("carMake")) {
      return await Post.find({ where: { carMake: filterCriteria } });
    } else if (filterCategory.includes("destination")) {
      return await Post.find({ where: { destinationId: parseInt(filterCriteria) } });
    } else {
      return undefined;
    }
  }

  @Mutation(() => Boolean)
  async createPost(
    @Arg("options") options: CreatePostType,
    @Arg("imageurl", (type) => [String]) imageurl: string[],
  ): Promise<boolean> {
    const post = Post.create({
      ...options,
      creator: await User.findOne({ where: { id: 3 } }),
      imageUrl: imageurl,
    }).save();

    post.then((p) => {
      console.log(p.id);
    });

    return true;
  }
}

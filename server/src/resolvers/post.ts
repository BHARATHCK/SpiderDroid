/* eslint-disable quotes */
import { CarDetails } from "../entities/CarDetails";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Destination } from "../entities/Destination";
import { Post } from "../entities/Post";
import { MyContext } from "src/types";
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

  @Field(() => String)
  description: string;

  @Field(() => String)
  Transmission: string;

  @Field()
  Miles: number;

  @Field()
  Mileage: number;

  @Field()
  Doors: number;

  @Field()
  Seats: number;

  @Field(() => [String])
  mediaSystem: string[];

  @Field(() => String)
  carCondition: string;

  @Field(() => String)
  conditionDescription: string;

  @Field(() => [String])
  petSituation: string[];

  @Field(() => String)
  fuelType: string;

  @Field(() => [String])
  imageUrl?: string[];

  @Field(() => String)
  destination: string;
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
    if (filterCategory.includes("carMake")) {
      return await Post.find({ where: { carMake: filterCriteria } });
    } else if (filterCategory.includes("destination")) {
      return await Post.find({ where: { id: parseInt(filterCriteria) } });
    } else {
      return undefined;
    }
  }

  @Mutation(() => Boolean)
  async createPost(
    @Arg("options") options: CreatePostType,
    @Ctx() { req }: MyContext,
  ): Promise<boolean> {
    console.log("OPTIONS RECEIVED ****************** : ");
    console.log(options);

    let creationStatus = true;

    try {
      const post = await Post.create({
        carCostPerDay: 0,
        carMake: options.carMake,
        carModel: options.carModel,
        carVin: options.carVin,
        carYear: options.carYear,
        category: options.category,
        destination: await Destination.findOne(parseInt(options.destination)),
        imageUrl: options.imageUrl,
        points: 0,
        creator: await User.findOne(req.session.userId),
      }).save();

      await CarDetails.create({
        additionalFAQ: [""],
        availableTo: new Date(),
        availableFrom: new Date(),
        condition: options.carCondition,
        description: options.description,
        doors: options.Doors,
        mediaSystem: options.mediaSystem,
        mileage: options.Mileage,
        fuelType: options.fuelType,
        petSituation: options.petSituation,
        seats: options.Seats,
        carId: post.id,
        car: post,
        transmission: options.Transmission,
      }).save();
    } catch (error) {
      creationStatus = false;
      console.log(error);
    }

    return creationStatus;
  }

  @Mutation(() => Boolean)
  async createpost(): Promise<boolean> {
    const creationStatus = false;

    return creationStatus;
  }
}

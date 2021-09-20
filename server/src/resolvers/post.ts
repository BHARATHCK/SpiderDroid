/* eslint-disable quotes */
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { CarDetails } from "../entities/CarDetails";
import { Destination } from "../entities/Destination";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { MyContext } from "../types";

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

  @Field(() => Int)
  carCostPerDay: number;
}

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts(): Promise<Post[]> {
    const posts = await Post.find({ relations: ["destination"] });
    console.log("STARTED *****************");
    posts.forEach(async (post, index) => {
      const carDetail = await CarDetails.findOne(index);
      if (carDetail) {
        post.carDetails = carDetail;
        await Post.update(post.id, post);
        console.log("UPDATED ");
      }
    });

    return posts; //await Post.find({ relations: ["destination"] });
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | undefined> {
    return await Post.findOne(id, { relations: ["creator", "destination", "carDetails"] });
  }

  @Query(() => [Destination])
  async browseByDestination(): Promise<Destination[]> {
    return await Destination.find();
  }

  @Query(() => [Post])
  async search(
    @Arg("destinationId") destinationId: number,
    @Arg("fromDate") fromDate: Date,
    @Arg("toDate") toDate: Date,
  ): Promise<Post[]> {
    // fromDate -> toDate and rentedFrom -> rentedUntil
    // fromDate <= rentedUntil AND rentedFrom <= toDate
    const posts = await getConnection().query(`
        SELECT post."createdAt", post."updatedAt", post.points, post."creatorId", post."carMake", post."carModel", post."carYear", post.trips, post.category, post."carVin", post."imageUrl", post."destinationId", post.id, post."carCostPerDay", post."rentedFrom", post."rentedUntil" FROM public.post INNER JOIN public.bookings on post.id = bookings."carId" where 
        (('${fromDate
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}' NOT BETWEEN bookings."fromDate" AND bookings."toDate") AND ('${toDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}' NOT BETWEEN bookings."fromDate" AND bookings."toDate"))
        AND post."destinationId" = ${destinationId} 
        UNION
        select post."createdAt", post."updatedAt", post.points, post."creatorId", post."carMake", post."carModel", post."carYear", post.trips, post.category, post."carVin", post."imageUrl", post."destinationId", post.id, post."carCostPerDay", post."rentedFrom", post."rentedUntil" from public.post where post."destinationId" = ${destinationId} AND post.id NOT IN (select bookings."carId" from public.bookings)
    `);

    return posts;
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
    console.log("CAR MAKE TRIGGERRED : ", filterCategory);
    if (filterCategory.includes("carMake")) {
      return await getConnection().query(`
        SELECT post."createdAt", post."updatedAt", post.points, post."creatorId", post."carMake", post."carModel", post."carYear", post.trips, post.category, post."carVin", post."imageUrl", post."destinationId", post.id, post."carCostPerDay", post."rentedFrom", post."rentedUntil" FROM public.post INNER JOIN public.bookings on post.id = bookings."carId" where 
        (('${new Date()
          .toISOString()
          .slice(0, 19)
          .replace(
            "T",
            " ",
          )}' NOT BETWEEN bookings."fromDate" AND bookings."toDate") AND ('${new Date(
        new Date().getDate() + 2,
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}' NOT BETWEEN bookings."fromDate" AND bookings."toDate"))
        AND post."carMake" = '${filterCriteria}'
        UNION
        select post."createdAt", post."updatedAt", post.points, post."creatorId", post."carMake", post."carModel", post."carYear", post.trips, post.category, post."carVin", post."imageUrl", post."destinationId", post.id, post."carCostPerDay", post."rentedFrom", post."rentedUntil" from public.post where post."carMake" = '${filterCriteria}' AND  post.id NOT IN (select bookings."carId" from public.bookings)
    `);
    } else if (filterCategory.includes("destination")) {
      return await getConnection().query(`
        SELECT post."createdAt", post."updatedAt", post.points, post."creatorId", post."carMake", post."carModel", post."carYear", post.trips, post.category, post."carVin", post."imageUrl", post."destinationId", post.id, post."carCostPerDay", post."rentedFrom", post."rentedUntil" FROM public.post INNER JOIN public.bookings on post.id = bookings."carId" where 
        (('${new Date()
          .toISOString()
          .slice(0, 19)
          .replace(
            "T",
            " ",
          )}' NOT BETWEEN bookings."fromDate" AND bookings."toDate") AND ('${new Date(
        new Date().getDate() + 2,
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}' NOT BETWEEN bookings."fromDate" AND bookings."toDate"))
        AND post."destinationId" = '${filterCriteria}' 
        UNION
        select post."createdAt", post."updatedAt", post.points, post."creatorId", post."carMake", post."carModel", post."carYear", post.trips, post.category, post."carVin", post."imageUrl", post."destinationId", post.id, post."carCostPerDay", post."rentedFrom", post."rentedUntil" from public.post where post."destinationId" = '${filterCriteria}' AND post.id NOT IN (select bookings."carId" from public.bookings)
    `);
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
      const carDetails = await CarDetails.create({
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
        transmission: options.Transmission,
      }).save();

      await Post.create({
        carCostPerDay: options.carCostPerDay,
        carMake: options.carMake,
        carModel: options.carModel,
        carVin: options.carVin,
        carYear: options.carYear,
        category: options.category,
        destination: await Destination.findOne(parseInt(options.destination)),
        imageUrl: options.imageUrl,
        points: 0,
        creator: await User.findOne(req.session.userId),
        carDetails: carDetails,
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

/* eslint-disable quotes */
import { Comment } from "../entities/Comment";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection, MoreThan } from "typeorm";
import { Bookings } from "../entities/Bookings";
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

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];

  @Field()
  total: number;
}

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts(): Promise<Post[]> {
    const posts = await Post.find({ relations: ["destination"] });
    return posts;
  }

  @Query(() => [Post], { nullable: true })
  async allStarReviews(): Promise<Post[]> {
    const posts = await Post.find({
      where: { points: MoreThan(4) },
      relations: ["creator", "bookings", "bookings.comment"],
    });
    return posts;
  }

  @Query(() => PaginatedPosts, { nullable: true })
  async findCars(
    @Arg("limit", () => Int) limit: number,
    @Arg("skipVariable", () => Int) skipNumber: number,
    @Arg("carMake", () => String, { nullable: true }) carMake: string,
    @Arg("carModel", () => String, { nullable: true }) carModel: string,
    @Arg("carYear", () => String, { nullable: true }) carYear: string,
    @Arg("host", () => String, { nullable: true }) host: string,
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    let creatorId;

    if (host) {
      const tempUser = await User.findOne({ where: { username: host } });
      creatorId = tempUser?.id;
    }

    const query = Post.createQueryBuilder("post").where(`id is NOT NULL`);
    if (carMake) {
      query.andWhere(`LOWER("carMake") LIKE LOWER('%${carMake}%')`);
    }
    if (carYear) {
      query.andWhere(`"carYear" LIKE '%${carYear}%'`);
    }
    if (carModel) {
      query.andWhere(`LOWER("carModel") LIKE LOWER('%${carModel}%')`);
    }
    if (creatorId) {
      query.andWhere(`"creatorId" = ${creatorId}`);
    }

    query.skip(skipNumber).take(realLimit);
    console.log("QUERY ************ ");
    console.log(query);
    const posts = await query.getManyAndCount();

    return { posts: posts[0], total: posts[1] };
  }

  @Mutation(() => PaginatedPosts, { nullable: true })
  async filterCars(
    @Arg("limit", () => Int) limit: number,
    @Arg("skipVariable", () => Int) skipNumber: number,
    @Arg("carMake", () => String, { nullable: true }) carMake: string,
    @Arg("carModel", () => String, { nullable: true }) carModel: string,
    @Arg("carYear", () => String, { nullable: true }) carYear: string,
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);

    const query = Post.createQueryBuilder("post").where(`id is NOT NULL`);
    if (carMake) {
      query.andWhere(`LOWER("carMake") LIKE LOWER('%${carMake}%')`);
    }
    if (carYear) {
      query.andWhere(`"carYear" LIKE '%${carYear}%'`);
    }
    if (carModel) {
      query.andWhere(`LOWER("carModel") LIKE LOWER('%${carModel}%')`);
    }

    query.skip(skipNumber).take(realLimit);

    const posts = await query.getManyAndCount();

    return { posts: posts[0], total: posts[1] };
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | undefined> {
    // return post based on id if and only if the car is not booked
    return await Post.findOne(id, {
      relations: ["creator", "destination", "carDetails", "bookings"],
    });
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
    const today = new Date();
    const afterDate = new Date(today);
    afterDate.setDate(afterDate.getDate() + 2);

    if (filterCategory.includes("carMake")) {
      return await getConnection().query(`
        SELECT post."createdAt", post."updatedAt", post.points, post."creatorId", post."carMake", post."carModel", post."carYear", post.trips, post.category, post."carVin", post."imageUrl", post."destinationId", post.id, post."carCostPerDay", post."rentedFrom", post."rentedUntil" FROM public.post INNER JOIN public.bookings on post.id = bookings."carId" where 
        ((DATE('${new Date()
          .toISOString()
          .slice(0, 19)
          .replace(
            "T",
            " ",
          )}') NOT BETWEEN DATE(bookings."fromDate") AND DATE(bookings."toDate")) AND (DATE('${afterDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}') NOT BETWEEN DATE(bookings."fromDate") AND DATE(bookings."toDate")))
        AND post."carMake" = '${filterCriteria}'
        UNION
        select post."createdAt", post."updatedAt", post.points, post."creatorId", post."carMake", post."carModel", post."carYear", post.trips, post.category, post."carVin", post."imageUrl", post."destinationId", post.id, post."carCostPerDay", post."rentedFrom", post."rentedUntil" from public.post where post."carMake" = '${filterCriteria}' AND  post.id NOT IN (select bookings."carId" from public.bookings)
    `);
    } else if (filterCategory.includes("destination")) {
      return await getConnection().query(`
        SELECT post."createdAt", post."updatedAt", post.points, post."creatorId", post."carMake", post."carModel", post."carYear", post.trips, post.category, post."carVin", post."imageUrl", post."destinationId", post.id, post."carCostPerDay", post."rentedFrom", post."rentedUntil" FROM public.post INNER JOIN public.bookings on post.id = bookings."carId" where 
        ((DATE('${new Date()
          .toISOString()
          .slice(0, 19)
          .replace(
            "T",
            " ",
          )}') NOT BETWEEN DATE(bookings."fromDate") AND DATE(bookings."toDate")) AND (DATE('${afterDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}') NOT BETWEEN DATE(bookings."fromDate") AND DATE(bookings."toDate")))
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

  @Mutation(() => Boolean)
  async ratePost(
    @Arg("id") id: number,
    @Arg("userpoints") userpoints: number,
    @Arg("bookingId") bookingId: number,
  ): Promise<boolean> {
    let ratingSubmitted = false;

    try {
      const post = await Post.findOne(id);

      if (post) {
        const totalPoints = post.points + userpoints;
        if (post.usersRated === 0) {
          post.points = totalPoints;
        } else {
          post.points = Math.ceil(totalPoints / post.usersRated);
        }
        post.usersRated += 1;
        await Post.update(post.id, post);

        ratingSubmitted = true;
      }

      if (ratingSubmitted) {
        // If rating updated successfully, then update reting status to rated.
        const booking = await Bookings.findOne(bookingId);

        if (booking) {
          booking.ratingStatus = true;
          await Bookings.update(booking.id, booking);
        }
      }
    } catch (error) {
      ratingSubmitted = false;
      console.log("Updating user rating : ", error);
    }

    return ratingSubmitted;
  }

  @Mutation(() => Boolean)
  async addReview(
    @Arg("bookingId") bookingId: number,
    @Arg("commentText") commentText: string,
    @Arg("commentTitle") commentTitle: string,
  ): Promise<boolean> {
    let commentSaved = false;
    try {
      await Comment.create({
        bookings: await Bookings.findOne(bookingId),
        commentText: commentText,
        commentTitle: commentTitle,
      }).save();
      commentSaved = true;
    } catch (error) {
      commentSaved = false;
    }
    return commentSaved;
  }

  @Query(() => [Comment])
  async experienceReviews(@Arg("carId") carId: number): Promise<Comment[]> {
    const bookings = await Bookings.find({ where: { carId: carId, bookingStatus: "Success" } });

    console.log("Bookings ********** ", bookings);
    const commentsArray: Comment[] = [];

    for (const booking of bookings) {
      console.log("Nookings Arrray : ", booking);
      const comment = await Comment.findOne({ where: { bookings: booking.id } });
      if (comment?.id) {
        commentsArray.push(comment);
      }
    }

    return commentsArray;
  }

  @Mutation(() => Boolean)
  async updatePost(
    @Arg("postID") postID: number,
    @Arg("carDetailsId") carDetailsId: number,
    @Arg("options") options: CreatePostType,
  ): Promise<boolean> {
    console.log("DATA RECEIVED ****************** ");
    console.log(postID);
    console.log("Options: ", options);
    let updatedResult = false;

    const post = await Post.findOne(postID);
    console.log("POST FOUND : ", post);
    console.log("IF CHECK ^^^^^^^^^^ ", post?.id);
    if (post?.id) {
      console.log("tyring Updation !!!!!!!!!!!!");
      try {
        const destinationData = await Destination.findOne({
          where: { destinationName: options.destination },
        });
        console.log("UPDATION POST ****** ", postID);
        const post = await Post.findOne(postID);
        console.log(post);

        await getConnection()
          .createQueryBuilder()
          .update(Post)
          .set({
            destination: destinationData,
            carCostPerDay: options.carCostPerDay,
            carMake: options.carMake,
            carModel: options.carModel,
            carVin: options.carVin,
            carYear: options.carYear,
            category: options.category,
            imageUrl: options.imageUrl,
          })
          .where("id = :id", { id: postID })
          .execute();

        // Update carDetails
        await getConnection()
          .createQueryBuilder()
          .update(CarDetails)
          .set({
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
          })
          .where("id = :id", { id: carDetailsId })
          .execute();

        updatedResult = true;
      } catch (error) {
        console.log(error);
        updatedResult = false;
      }
    }

    return updatedResult;
  }
}

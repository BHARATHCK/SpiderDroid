import { Destination } from "../entities/Destination";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class DestinationResolver {
  @Query(() => [Destination])
  async destinations(): Promise<Destination[]> {
    return await Destination.find({});
  }
}

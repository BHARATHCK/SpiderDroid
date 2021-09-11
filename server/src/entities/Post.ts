import { GraphQLScalarType } from "graphql";
import { stringify } from "querystring";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  carMake!: string;

  @Field()
  @Column()
  carModel!: string;

  @Field()
  @Column()
  carYear!: string;

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  imageUrl?: string[];

  @Field()
  @Column({ default: 0, type: "int" })
  points: number;

  @Field()
  @Column({ default: 0, type: "int" })
  trips: number;

  @Field()
  @Column()
  creatorId: number;

  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  category: string;

  @Field()
  @Column({ nullable: true })
  carVin: string;
}

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
import { Bookings } from "./Bookings";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Column()
  commentText: string;

  @Field(() => Bookings, { nullable: true })
  @ManyToOne(() => Bookings, (bookings) => bookings.comment)
  bookings: Bookings;
}

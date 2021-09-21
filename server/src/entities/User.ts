import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Bookings } from "./Bookings";
import { Payment } from "./Payment";
import { Post } from "./Post";

export type UserRoleType = "browse" | "host";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({
    type: "enum",
    enum: ["browse", "host"],
    default: "browse",
  })
  role: UserRoleType;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @CreateDateColumn()
  updatedAt: Date;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Payment, (payment) => payment.orderBy)
  payments: Payment[];

  @Field(() => [Bookings], { nullable: true })
  @OneToMany(() => Bookings, (bookings) => bookings.user)
  bookings: Bookings[];
}

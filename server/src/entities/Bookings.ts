import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class Bookings extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone", nullable: true })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp with time zone", nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column()
  carId: number;

  @Field(() => String, { nullable: true })
  @Column()
  orderId: string;

  @Field(() => Date, { nullable: true })
  @Column()
  fromDate: Date;

  @Field(() => Date, { nullable: true })
  @Column()
  toDate: Date;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  ratingStatus: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  bookingStatus: string;

  // Relations
  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.bookings)
  post: Post;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.bookings)
  comment: Comment[];
}

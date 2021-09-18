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

@ObjectType()
@Entity()
export class Bookings extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  carId: number;

  @Field(() => String, { nullable: true })
  @Column()
  orderId: string;

  @Field(() => String, { nullable: true })
  @Column()
  fromDate: Date;

  @Field(() => String, { nullable: true })
  @Column()
  toDate: Date;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  ratingStatus: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  bookingStatus: string;

  // Relations
  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @OneToMany(() => Post, (post) => post.bookings)
  car: Post;
}

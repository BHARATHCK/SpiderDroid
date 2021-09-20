import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Bookings } from "./Bookings";
import { CarDetails } from "./CarDetails";
import { Destination } from "./Destination";
import { User } from "./User";

@ObjectType()
@Entity({ name: "post" })
export class Post extends BaseEntity {
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
  carMake!: string;

  @Field({ nullable: true })
  @Column()
  carModel!: string;

  @Field({ nullable: true })
  @Column()
  carYear!: string;

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  imageUrl?: string[];

  @Field({ nullable: true })
  @Column({ default: 0, type: "int" })
  points: number;

  @Field({ nullable: true })
  @Column({ default: 0, type: "int" })
  trips: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  category: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  carVin: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 0 })
  carCostPerDay: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rentedFrom: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rentedUntil: Date;

  // Relations
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @Field(() => Destination, { nullable: true })
  @ManyToOne(() => Destination, (destination) => destination.posts)
  destination: Destination;

  @Field(() => CarDetails)
  @OneToOne(() => CarDetails)
  @JoinColumn()
  carDetails: CarDetails;

  @OneToMany(() => Bookings, (booking) => booking.car)
  bookings: Bookings[];
}

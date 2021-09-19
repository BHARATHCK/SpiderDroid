import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class CarDetails extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  transmission: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  mileage: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  condition: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  doors: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  seats: number;

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  mediaSystem: string[];

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  petSituation: string[];

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  fuelType: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  commentId: number;

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  additionalFAQ: string[];

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  availableFrom: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  availableTo: Date;
}

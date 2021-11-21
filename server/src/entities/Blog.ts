import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Blog extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone", nullable: true })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp with time zone", nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Column()
  blogData: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn()
  creator: User;
}

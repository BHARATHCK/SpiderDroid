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
export class Payment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column()
  orderId: string;

  @Field(() => Int)
  @Column()
  amount: number;

  @Field(() => Int)
  @Column()
  amountPaid: number;

  @Field(() => Int)
  @Column()
  amountDue: number;

  @Field(() => String)
  @Column()
  receipt: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  offerId: string;

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  attempts: number;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  verificationStatus: boolean;

  // Relations
  @ManyToOne(() => User, (user) => user.payments)
  orderBy: User;
}

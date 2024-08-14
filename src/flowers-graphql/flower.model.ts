import { Field, Float, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class FlowerModel {
    @Field()
    id: number

    @Field()
    name: string

    @Field()
    description: string

    @Field(() => Float)
    price: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
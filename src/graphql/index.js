import gql from "graphql-tag";

import { helloSchema } from "./schemas/hello.js";
import { helloResolvers } from "./resolvers/hello.js";

const rootTypeDefs = gql`
    type Query {
        _: String
    }

    type Mutation {
        _: String
    }
`;

export const typeDefs = [rootTypeDefs, helloSchema];

export const resolvers = [helloResolvers];
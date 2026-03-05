export const schema = `#graphql


type User{
    id:ID!
    userName:String!
    email:String!
    password:String!
}

type Category {
  id: ID!
  category: String!
  default_expiry: Int
}

type Template {
  id: ID!
  category_id:Category!
  title: String!
  description: String!
  created_by: Int!
  modified_by: Int
}

type Message {
  id: ID!
  template_id: Template!
  schedule_type: Int!
  sent_time: String
  created_by: User!
  modified_by: Int
}

"mutation ----------------------------->"
input AddMessageInput {
  category_id: Int!
#   template_id: Int!          # For message table
  schedule_type: Int!      # For message table
  sent_time: String        # Optional for message table
  title: String!           # for template table
  description: String!    # for template table
  created_by: Int!         # for both table 

}


type AddMessageResponse {
  status: Int
  message: String
  template_id:Int,
  messageId:Int
}

type GetAllMessages{
  id:ID!
  message_id:Message!,
  user_id:Int!,
  status:Int!,
  expire_on:String!,
  sent_on:String!,
}


type Query{
    User:User!
    GetAllMessages(limit:Int! , page:Int!):[GetAllMessages!]!
    Template:[Template!]!
}

type Mutation {
  addMessage(input: AddMessageInput!): AddMessageResponse
}


`;

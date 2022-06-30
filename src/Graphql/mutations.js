import { gql } from "@apollo/client";

export const ADD_MEETING = gql`
  mutation AddMeeting(
    $id: Int!
    $title: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $meetingRoomId: Int!
  ) {
    Meeting(
      id: $id
      title: $title
      date: $date
      startTime: $startTime
      endTime: $endTime
      meetingRoomId: $meetingRoomId
    ) {
      id
      title
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_BUILDINGS = gql`
  {
    Buildings {
      id
      name
    }
  }
`;

export const GET_MEETING_ROOMS = gql`
  {
    MeetingRooms {
      id
      name
      floor
      building {
        id
        name
      }
      meetings {
        id
        title
        date
        startTime
        endTime
      }
    }
  }
`;

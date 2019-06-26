import { ANALYZE } from '../actions'

export default function(state = {}, action) {
  switch (action.type) {
    case ANALYZE:
      console.log(action)
      return action.payload.data;
    default:
      return state;
  }
}

import activitiesActionTypes from "./activities.types";

const INITIAL_STATE = {
  activities: null,
  isFetchingActivities: false,
  isCreatingNewActivity: false
};

const activitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case activitiesActionTypes.GET_ALL_ACTIVITIES_START:
      return { ...state, isFetchingActivities: true, activities: null };
    case activitiesActionTypes.GET_ALL_ACTIVITIES_SUCCESS:
      return {
        ...state,
        isFetchingActivities: false,
        activities: action.payload
      };

    case activitiesActionTypes.GET_ALL_ACTIVITIES_FAILURE:
      return {
        ...state,
        isFetchingActivities: false,
        activities: null
      };

    case activitiesActionTypes.CREATE_NEW_ACTIVITY_START:
      return { ...state, isCreatingNewActivity: true };
    case activitiesActionTypes.CREATE_NEW_ACTIVITY_SUCCESS:
      return {
        ...state,
        isCreatingNewActivity: false,
        activities: [...state.activities, action.payload]
      };
    case activitiesActionTypes.CREATE_NEW_ACTIVITY_FAILURE:
      return {
        ...state,
        isCreatingNewActivity: false
      };
    default:
      return { ...state };
  }
};

export default activitiesReducer;

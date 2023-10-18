import { SET_EMAIL_SENT, SET_ERRORS, SET_LOADING, SET_RESEND, SET_RESEND_FAILURE, SET_RESEND_LOADING, SET_RESEND_SUCCESS, SET_VALID, SET_VERIFIED } from "../types";


const initialState = {
  errors:{},
  isLoading: false,
  emailSent: false,
  isValid: false,
  isVerified: false,
  isResend: false,
  isResendSuccess: false,
  isResendFailure: false,
  isResendLoading: false,
 

};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_EMAIL_SENT:
        return {
            ...state,
            emailSent: action.payload,
        }
    case SET_VALID:
        return {
            ...state,
            isValid: action.payload,
        }
    case SET_VERIFIED:
        return {
            ...state,
            isVerified: action.payload,
        }
    case SET_RESEND:
        return {
            ...state,
            isResend: action.payload,
        }
    case SET_RESEND_SUCCESS:
        return {
            ...state,
            isResendSuccess: action.payload,
        }
    case SET_RESEND_FAILURE:
        return {
            ...state,
            isResendFailure: action.payload,
        }
    case SET_RESEND_LOADING:
        return {
            ...state,
            isResendLoading: action.payload,
        }

    default:
      return state;
  }
}
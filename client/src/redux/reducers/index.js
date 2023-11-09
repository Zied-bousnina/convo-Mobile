// contains all Redux reducers
import {combineReducers} from 'redux'
import  authReducer  from "./authReducers";
import  errorsReducer  from "./errorReducers";
import profileReducers from './profile.reducers';
import mailReducers from './mailReducers';
import demandesReducer from './demandesReducer';
import RequestReducers from './Request.reducers';
import accessReducers from './accessReducers';
import binReducers from './binReducers';
import AccessListReducers from './AccessListReducers';
import LoadingReducer from './LoadingReducer';
import CleaningServicesReducer from './CleaningServicesReducer';
import requestSentsuccesReducer from './requestSentsuccesReducer';
import ListOfUsersSameAccessReducer from './ListOfUsersSameAccess.reducer';
import NotSuccessReducer from './NotSuccess.reducer';
import mailSentReducer from './mailSent.reducer';
import fetchBinsReducer from './fetchBins.reducer';
import BinListByMunicipalReducer from './BinListByMunicipal.reducer';
import ScoreReducer from './ScoreReducer';
import FindDriverReducer from './FindDriverReducer';
import ModeDriverPassengerReducer from './ModeDriverPassengerReducer';
import DemandeDriverRedicers from './DemandeDriver.redicers';


export default  combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    profile: profileReducers,
    mail: mailReducers,
    demandesMunicipal: demandesReducer,
    request: RequestReducers,
    access: accessReducers,
    bins: binReducers,
    accessListUser: AccessListReducers,
    isLoading: LoadingReducer,
    cleaningService:CleaningServicesReducer,
    success:requestSentsuccesReducer,
    someAccessUsersList : ListOfUsersSameAccessReducer,
    NotSuccess: NotSuccessReducer,
    mailSent : mailSentReducer,
    fetchBins : fetchBinsReducer,
    fetchBinByMunicipal : BinListByMunicipalReducer,
    scores : ScoreReducer,
    ReqestFindDriver : FindDriverReducer,
    DriverMode : ModeDriverPassengerReducer,
    DemandeDriver : DemandeDriverRedicers,



})
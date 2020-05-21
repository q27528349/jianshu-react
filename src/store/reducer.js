import {combineReducers}  from 'redux-immutable';
import {reducer as headerReducers} from '../common/header/store';
import {reducer as homeReducers} from '../pages/home/store';
import {reducer as detailReducers} from '../pages/detail/store'
import {reducer as login} from '../pages/login/store'



const reducer =combineReducers({
    header:headerReducers,
    home:homeReducers,
    detail:detailReducers,
    login:login
})
export default reducer;
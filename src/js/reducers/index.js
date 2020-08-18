import { ADD_ARTICLE, ADD_STAT, DELETE_STAT } from '../constants/action-types';
const initialState = { //will have to get this from database somewhere
    teamName: 'Nebraska',
    players: [
        'Spencer Schwellenbach',
        'Adrian Martinez',
        'Jaxon Hallmark',
        'Eminem Meminem',
        'Andrew Carnegie',
        'Julio Jones',
        'Tom Brady',
        'Philip Rivers',
    ],
    statCategories: [
        'Throwing',
        'Fielding',
        'Diving',
        'Competitive',
        'Catching',
        'Hustle',
    ],
    stats: [],
    articles: [],
}

function rootReducer(state = initialState, action) {
    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
        });
    } else if (action.type === ADD_STAT) {
        return Object.assign({}, state, {
            stats: state.stats.concat(action.payload)
        });
    } else if (action.type === DELETE_STAT) {
        return Object.assign({}, state, {
            stats: state.stats.filter(x => {
                return parseInt(x.stat.statId) !== parseInt(action.payload)
            })
        });
    }
    return state;
}

export default rootReducer;
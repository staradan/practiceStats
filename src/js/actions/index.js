import { ADD_ARTICLE, ADD_STAT, DELETE_STAT } from '../constants/action-types';

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
}

export function addStat(payload) {
    return { type: ADD_STAT, payload }
}

export function deleteStat(payload) {
    return { type: DELETE_STAT, payload }
}
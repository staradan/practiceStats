import { ADD_ARTICLE, ADD_STAT, DELETE_STAT, ADD_PLAYER, DELETE_PLAYER } from '../constants/action-types';

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
}

export function addStat(payload) {
    return { type: ADD_STAT, payload }
}

export function deleteStat(payload) {
    return { type: DELETE_STAT, payload }
}

export function addPlayer(payload) {
    return { type: ADD_PLAYER, payload }
}

export function deletePlayer(payload) {
    return { type: DELETE_PLAYER, payload }
}
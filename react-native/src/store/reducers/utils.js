/**
 * Create reducer from map of action types to reducer functions
 *
 * @param map
 * @param initialState
 *
 * @returns {function(...[*]=)}
 */
export const fromMap = (map, initialState) => {
    return (state = initialState, action) => {
        return map.hasOwnProperty(action.type) ? map[action.type](state, action) : state;
    }
};

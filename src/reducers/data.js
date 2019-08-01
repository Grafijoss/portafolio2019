function data (state, action) {
	switch (action.type) {
		case 'ANIMATE_STEP':
			return {
				...state,
				aniStep: action.step
			}
		case 'OPEN_RIGHT':
			return {
				...state,
				openRight: action.open
			}
		default:
			return state
	}
} 

export default data
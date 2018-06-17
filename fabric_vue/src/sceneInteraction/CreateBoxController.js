import UserInteraction from './UserInteractionController'

export default class CreateBox extends UserInteraction {

		constructor(identifier, startCallback, updateCallback, endCallback) {
			super(identifier, startCallback, updateCallback, endCallback)
			console.log("CreateBox constructor called")
		}
}
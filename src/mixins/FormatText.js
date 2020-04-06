import _ from 'lodash'
export default {
	methods: {
		formatText (text) {
			return _.replace (_.capitalize (text), [/-/], ' ')
		}
	}
}
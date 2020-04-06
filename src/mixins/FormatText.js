import _ from 'lodash'
export default {
	methods: {
		formatText (
			text,
			replaceChar = /-/g,
			replaceWith = ' '	
		) {
			return _.replace (_.capitalize (text), replaceChar, replaceWith)
		}
	}
}
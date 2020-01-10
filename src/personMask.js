export const mascara = {
	/**
	 * mask: (String | required | default '')
	 * the mask pattern
	 * 9 - accept digit.
	 * A - accept alpha.
	 * S - accept alphanumeric.
	 * * - accept all, EXCEPT white space.
	*/
	mask: '999*AAA',

	/**
	 * validator: (Function | optional | defaults returns true)
	 * use this funcion to inform if the inputed value is a valid value (for invalid phone numbers, for example). The isValid method use this validator.
	*/
	validator: function(value, settings) {
		return true
	},
	/**
	 * getRawValue: (Function | optional | defaults return current masked value)
	 * use this function to parse and return values to use what you want.
	 * for example, if you want to create a phone number mask (999) 999-99-99 but want to get only
	 * the numbers for value, use this method for this parse step.
	*/
	getRawValue: function(value, settings) {
		return 'my converted value';
	},
	/**
	 * translation: (Object | optional | defaults 9, A, S, *)
	 * the dictionary that translate mask and value.
	 * you can change defaults by simple override the key (9, A, S, *) or create some new.
	*/
	translation: {
		// this is a custom translation. The others (9, A, S, *) still works.
		// this translation will be merged and turns into 9, A, S, *, #.
		'#': function(val) {
			if (val === ' ') {
				return val;
			}

			// if returns null, undefined or '' (empty string), the value will be ignored.
			return null;
		},
		// in this case, we will override build-in * translation (allow all characters)
		// and set this to allow only blank spaces and some special characters.
		'*': function(val) {
			return [' ', '#', ',', '.', '!'].indexOf(val) >= 0 ? val : null;
		}
	}
}
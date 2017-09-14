const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('Custom Rules', function() {

	describe('regex', function() {

	    it('should return true', async () => {



	    	let v = new Validator(r, 
	    		{number:'abc'}, {number: "regex:[abc]"});
	    	
	    	let matched = await v.check();

	    	assert.equal(matched, true);
	      	

	    });

	     it('should return false', async () => {



	    	let v = new Validator(r, 
	    		{number:'xyz'}, {number: "regex:[abc]"});
	    	
	    	let matched = await v.check();

	    	assert.equal(matched, false);
	      	

	    });
	});

	describe('custom', function() {

	    it('should return true', async () => {


	    	let v = new Validator(r, 
	    		{remember:'yes'}, {remember: 'custom'});

	    	v.rules.validateCustom = async (field, value, message)  => {
	    	
		        if( value === 'yes' || value === 'on' ){
		            return true;
		        }else{
		            this.validator.addError(field, 'custom', message || 'The value of the field needs to be  yes or no');
		            return false;
		        }
    
	    	};

	    	let matched = await v.check();

	    	assert.equal(matched, true);
	      	

	    });
	     
	     it('should return false', async () => {


	    	let v = new Validator(r, 
	    		{remember:'1'}, {remember: 'custom'});

	    	v.rules.validateCustom = async (field, value, message)  => {
	    	
		        if( value === 'yes' || value === 'on' ){
		            return true;
		        }else{
		            v.addError(field, 'custom', message || 'The value of the field needs to be  yes or no');
		            return false;
		        }
    
	    	};

	    	let matched = await v.check();

	    	assert.equal(matched, false);
	      	

	    });
	     

	});
});
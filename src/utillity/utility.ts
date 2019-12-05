export const isEmail = (email:String)=> {
	var emailRegex = /^[a-z0-9\-._]+@[a-z0-9]+(\.[a-z]+)+$/;
    
	if(!emailRegex.test(email.toLowerCase())){
       return false;
		
	}
	return true;
};

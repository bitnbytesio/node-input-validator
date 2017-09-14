class File {

	constructor(Validator){
		
        this.validator = Validator;
    }

	fetchByteSize(size){
        size = size.toString().toLowerCase();
        if(size.includes('gb') || size.includes('g')){
            return parseInt(size.replace('gb','').replace('g','')) * 1024 * 1024 * 1024;
        }else if(size.includes('mb') || size.includes('m')){
            return parseInt(size.replace('mb','').replace('m','')) * 1024 * 1024;
        }else if(size.includes('kb') || size.includes('k')){
            return parseInt(size.replace('kb','').replace('k','')) * 1024;
        }else if(size.includes('b')){
            return parseInt(size.replace('b',''));
        }else{
            return parseInt(size) * 1024;
        }
    }

	async validateSize(field, file, args, message){



        let success =  true;

        let max, min;

        if(args && Array.isArray(args)){
                         
            max = this.fetchByteSize(args[0]);
             if (args.length >=2) {
                min = this.fetchByteSize(args[1]);
             }         
        } else {
            max = this.fetchByteSize(args);
        }  

        console.log(min);
        console.log(max);

        if(!max){
            //this.validator.addError(field, 'size', 'Max or Min properties have not been provided');
            success = false;
        }else{
            if(max && file.size >= max){
                //this.validator.addError(field, 'size', message || 'The file size exceeds the max size provided');
                success = false;
            }

            if(min && file.size <= min){
                //this.validator.addError(field, 'size', message || 'The file size is lower than the min size stated');
                success = false;
            }
        }
        

        if(!success){
            
            /*if(file.path && (await fs.exists(file.path))){
                await fs.remove(file.path);
            }*/           

            return false;
        }else{
            return true;
        }
    }

    async validateMime(field, file, args, message){
        let success = true;

        if(Array.isArray(args)){
            for(var i = 0; i < args.length; ++i){
                if(mime.lookup(args[i]) !== file.type){
                    success = false;
                }else{
                    success = true;
                    break;
                }
            }
        }else{
            if(mime.lookup(args) !== file.type){
                success = false;
            }
        }

        if(!success){
            //this.validator.addError(field, 'mime', message || 'The mime type mentioned does not match with the file type');
           
            if(file.path && (await fs.exists(file.path))){
                await fs.remove(file.path);
            }
            
            return false;
        }else{
            return true;
        }
    }

}

module.exports = File;
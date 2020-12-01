var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var doctorSchema = mongoose.Schema({
    email:{
		type:String,
		default: null
    },
    firstname: {
        type: String,
        default : null
    },
    lastname:{
        type:String,
	    default: null
    },
    password:{
		type:String,
		default: null
    },
    
    phone:{
        type:String,
		default: null
    },
    speciality:{
        type:String,
		default: null
    }


});

var prescriptionSchema = mongoose.Schema({
    patientid:{
		type:String,
		default: null
    },
    doctorid: {
        type: String,
        default : null
    },
    date:{
        type:String,
	    default: null
    },
    information:{
        type:String,
	    default: null
    },
})

var patientSchema = mongoose.Schema({
    email:{
		type:String,
		default: null
    },
    firstname: {
        type: String,
        default : null
    },
    lastname:{
        type:String,
	    default: null
    },
   
    phone:{
        type:String,
		default: null
    },
    gender:{
        type:String,
		default: null
    },
    bloodgroup:{
        type:String,
		default: null
    },
    livelihood:{
        type:String,
		default: null
    },
    rf_id:{
        type:String,
		default: null
    }
    
    


});





doctorSchema.methods.encryptPassword=function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}

doctorSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password,this.password);
}


var obj = {};
obj.prescription = mongoose.model('prescription',prescriptionSchema);
obj.patient = mongoose.model('patient',patientSchema);
obj.doctor = mongoose.model('user',doctorSchema);

module.exports = obj;
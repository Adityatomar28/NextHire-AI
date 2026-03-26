const mongoose = require('mongoose');


/**
 *  SCHEMA
 * -job description Schema:String.  -> This mandotory which required
 * -Resume Text:String
 * -Self description:String
 * 
 * -MatchScore:Number
 * 
 * -Technical Question:[{
 *      question:"",
 *      intention:"",
 *      answer:"" ,
 *  }]
 * Behavioral Question:[{
 *      question:"",
 *      intention:"",
 *      answer:"" ,
 * 
 * }]
 * -Skill gaps:[{
 *   skill:"",
 *   severity:{
 *   type:String,
 *   enum:["low","medium","high"]
 * 
 *  }
 * }]
 * -preparation plan:[{
 *  day:Number,
 *  Focus:string,
 *  task:[String]
 * }]
 * 
 */


const PreparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Task is Required"]
    }]

    
},{
    _id:false
})


const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]
    }
},{
    _id:false
})

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intension is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is Required"]
    }

    
},{
    _id:false
})

const BehavioralQuestion = new mongoose.Schema({
    Question:{
    type:String,
    required:[true,"Behavioral Question is required"]
    },
    intention:{
    type:String,
    required:[true,"Technical question is required"]
    },
    answer:{
    type:String,
    required:[true,"Answer is Required"]
    }
},{
    _id: false
})


const InterviewReportSchema = new mongoose.Schema({

    jobDescription:{
        type:String,

    },
    selfDescriptions:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestion:[technicalQuestionSchema],
    BehavioralQuestions:[BehavioralQuestion],
    skillGapSchema:[skillGapSchema],
    PreparationPlan:[PreparationPlanSchema]
},{
    timestamps:true
})


const interviewReportModel = mongoose.model("InterviewReport",InterviewReportSchema);

module.exports = interviewReportModel;
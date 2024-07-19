

export class Therapist{
    constructor(uid,name,phone,gender,city,registration_No,therapy_center,profile,registration_year,qualification,college,experience,patients){
        this.name=name;
        this.uid=uid
        this.phone=phone;
        this.gender=gender;
        this.city=city;
        this.registration_No=registration_No;
        this.therapy_center=therapy_center;
        this.profile=profile;
        this.registration_year=registration_year;
        this.qualification=qualification;
        this.college=college;
        this.experience=experience
        this.patients=patients

    }
    static fromFireStore(doc){
        const data=doc.data()
        return new Therapist(doc.id,data.name,data.phone,data.gender,data.city,data.registration_No,data.therapy_center,data.profile,data.registration_year,data.qualification,data.college,data.experience,data.patients)
    }
}

export class Patient{
    constructor(uid,name,dob,doj,address,remarks,parentPhone,parentNames,profile,batch,time){
        this.name=name
        this.dob=dob
        this.uid=uid
        this.doj=doj
        this.address=address
        this.remarks=remarks
        this.parentNames=parentNames
        this.parentPhone=parentPhone
        this.profile=profile
        this.batch=batch
        this.time=time

    }
    static fromFireStore(doc){
        const data=doc.data()
        return new Patient(doc.id,data.name,data.dob,data.doj,data.address,data.remarks,data.parentPhone,data.parentNames,data.profile,data.batch,data.time)
    }
}

export class TherapyCenter{
    constructor(uid,name,patients,therapists){
        this.uid=uid
        this.name=name
        this.patients=patients
        this.therapists=therapists
    }

    static fromFireStore(doc){
        const data=doc.data()
        return new TherapyCenter(doc.id,data.name,data.patients,data.therapists)
    }
}
export class Fee{
    constructor(uid,for_month,date,amount,patient){
        this.uid=uid
        this.for_month=for_month
        this.date=date
        this.amount=amount
        this.patient=patient
    }
    static fromFireStore(doc){
        const data=doc.data()
        return new Fee(doc.id,data.for_month,data.date,data.amount,data.patient)
    }
}

export class Excercise{
    constructor(uid,level,level_desc,excercise,remarks,description,file,content_type){
        this.uid=uid
        this.level=level
        this.level_desc=level_desc
        this.excercise=excercise
        this.remarks=remarks
        this.description=description
        this.file=file
        this.content_type=content_type
    }
    static fromFireStore(doc){
        const data=doc.data()
        return new Excercise(doc.id,data.level,data.level_desc,data.excercise,data.remarks,data.description,data.file,data.content_type)
    }
}
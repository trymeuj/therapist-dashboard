

export class Therapist{
    constructor(uid,name,phone,gender,city,registration_No,therapist_center,profile,registration_year,qualification,college,experience,patients){
        this.name=name;
        this.uid=uid
        this.phone=phone;
        this.gender=gender;
        this.city=city;
        this.registration_No=registration_No;
        this.therapist_center=therapist_center;
        this.profile=profile;
        this.registration_year=registration_year;
        this.qualification=qualification;
        this.college=college;
        this.experience=experience
        this.patients=patients

    }
    static fromFireStore(doc){
        const data=doc.data()
        return new Therapist(doc.id,data.name,data.phone,data.gender,data.city,data.registration_No,data.therapist_center,data.profile,data.registration_year,data.qualification,data.college,data.experience,data.patients)
    }
}

export class Patient{
    constructor(uid,name,dob,doj,address,remarks,parentPhone,parentNames,profile){
        this.name=name
        this.dob=dob
        this.uid=uid
        this.doj=doj
        this.address=address
        this.remarks=remarks
        this.parentNames=parentNames
        this.parentPhone=parentPhone
        this.profile=profile
    }
    static fromFireStore(doc){
        const data=doc.data()
        return new Patient(doc.id,data.name,data.dob,data.doj,data.address,data.remarks,data.parentPhone,data.parentNames,data.profile)
    }
}

export class Fee{
    constructor(){

    }
}

import { auth, db } from "../firebase";  // Import Firestore
import { collection, getDocs, addDoc, doc, getDoc, setDoc, query, where, updateDoc, arrayUnion } from 'firebase/firestore';
import { Excercise, Fee, Patient, Therapist } from "./models";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



export const findTherapists=async()=>{
    try {
        const querySnapshot = await getDocs(collection(db, 'therapists'));
        const data = querySnapshot.docs.map((doc)=>Therapist.fromFireStore(doc))

        return data;

    } catch (error) {
        return []
    }
}

export const findTherapistById=async (id)=>{
    try {
        const docRef=doc(db,'therapists',id)
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
                const t=Therapist.fromFireStore(docSnap)
                return t;
        }
    } catch (error) {
        
    }
}

export const getPatientById =async (id)=>{
    try {
        const docRef=doc(db,'patientinfo',id)
        const docSnap=await getDoc(docRef)
        
        if(docSnap.exists()){
                const t=Patient.fromFireStore(docSnap)
                return t;
        }
        return null
    } catch (error) {
        return null
    }
}

export const getPatientsByIds=async (ids)=>{
    try {
        
        const patients = await Promise.all(ids.map(async (id) => {
            return await getPatientById(id);
          }));
        return patients || []
    } catch (error) {
        return []
    }
}

export const addPatient=async (newPatient) =>{
    try {
        await addDoc(collection(db, 'patientinfo'), newPatient);
    } 
    
     catch (error) {
        
    }
}



export async function signUp(data,email,password){
    try {
        const userCredential=await createUserWithEmailAndPassword(auth,email,password)
        if(userCredential){

            const uid=userCredential.user.uid
            await setDoc(doc(db,"therapists",uid),{...data,uid:uid})
        }
    } catch (error) {
        
    }
}

export async function signIn(email,password){
    try {
        const userCredential=await signInWithEmailAndPassword(auth,email,password);
        if(userCredential){
            const t=await findTherapistById(userCredential.user.uid)
            return t
        }
    } catch (error) {
        
    }
}

export async function getPatientsOfTherapyCenter(therapy_centerId){
    try {
        const docRef = doc(db, 'therapy_centers', therapy_centerId);
        const docSnap = await getDoc(docRef);
    
        if (!docSnap.exists()) {
          throw new Error("Therapy center not found");
        }
    
        const ids = docSnap.data().patients;
        const patients = await Promise.all(ids.map(async (id) => {
          return await getPatientById(id);
        }));
    
        return patients;
        
    } catch (error) {
        console.log(error)
    }
}

export const getTherapistsOfTherapyCenter=async(therapy_centerId)=>{

    try {
        const docRef = doc(db, 'therapy_centers', therapy_centerId);
        const docSnap = await getDoc(docRef);
    
        if (!docSnap.exists()) {
          throw new Error("Therapy center not found");
        }
    
        const ids = docSnap.data().therapists;
        const therapists = await Promise.all(ids.map(async (id) => {
          return await findTherapistById(id);
        }));
    
        return therapists;
        
    } catch (error) {
        console.log(error)
    }
}

export async function getFeeInfoOfPatient(patient){
    try {
        const ref=collection(db,"fees")
        const q=query(ref,where('patient','==',patient))
        const querySnapshot=await getDocs(q)
        const fees=querySnapshot.docs.map((doc)=>Fee.fromFireStore(doc))
        return fees;
    } catch (error) {
        return []
    }
    
        
}

export const findExcercises=async()=>{
    try {
        const querySnapshot = await getDocs(collection(db, 'excercises'));
        const data = querySnapshot.docs.map((doc)=>Excercise.fromFireStore(doc))

        return data;

    } catch (error) {
        return []
    }
}

export async function addExercise(newExercise){
    try {
        const docRef = await addDoc(collection(db, 'exercises'), newExercise);
        const docId = docRef.id;
        // Update the newExercise object with the docId
        newExercise.uid = docId;
        // Save the newExercise object again with the docId
        await setDoc(docRef, newExercise);
    } 
    
     catch (error) {
        
    }
}

export async function getPatientsOfTherapist(therapistId){
    try {
        const docRef=doc(db,'therapists',therapistId)
        const docSnap=await getDoc(docRef)
        const ids=docSnap.patients
        const patients=[]
        ids.forEach(id => {
            const p=getPatientById(id)
            patients.push(p)
        });
        return patients
        
    } catch (error) {
        return []
    }
}

export async function assignBatch(id,batch){
    try {
        const docRef = doc(db, "patientinfo", id);
        await updateDoc(docRef, {
          "batch": batch
        });
        console.log(`Document with ID ${id} updated successfully`);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
}

export async function assignTherapistToPatient(patientId,therapistId){
    try {
        const docRef = doc(db, 'patientinfo', patientId);
        await updateDoc(docRef, {
          "therapist": therapistId
        });
        const docr=doc(db,'therapists',therapistId)
        await updateDoc(docr,{
            "patients":arrayUnion(patientId)
        })
        console.log(`Document with ID ${patientId} updated successfully`);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
}

export async function assignTherapistToTherapyCenter(therapy_centerId,therapistId){
    try {
        const docRef = doc(db, 'therapy_centers', therapy_centerId);
        await updateDoc(docRef, {
          "therapists": arrayUnion(therapistId)
        });
        console.log(`Document with ID ${therapy_centerId} updated successfully`);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
}

export async function assignPatientToTherapyCenter(therapy_centerId,patientId){
    try {
        const docRef = doc(db, 'therapy_centers', therapy_centerId);
        await updateDoc(docRef, {
          "patients": arrayUnion(patientId)
        });
        console.log(`Document with ID ${therapy_centerId} updated successfully`);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
}

export async function configureBatch(batch,therapistId,days,time){
    try {
        const docRef = doc(db, 'therapists', therapistId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      let batches = data.batches || {};

      if(batches[batch]){
        
        batches[batch] = { ...batches[batch],days,time:time?time:[] };
      }else{
        batches[batch]={days,time}
      }
      
      await updateDoc(docRef, { batches });

      
    } else {
      console.log("No such document!");
    }

      } catch (error) {
        console.error("Error updating document: ", error);
      }
}

export async function addNewBatch(batch,therapistId){
    try {
        const docRef = doc(db, 'therapists', therapistId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      let batches = data.batches || {};
      batches[batch]={days:[],time:[]}
      await updateDoc(docRef, { batches });

      
    } else {
      console.log("No such document!");
    }

      } catch (error) {
        console.error("Error updating document: ", error);
      }
}




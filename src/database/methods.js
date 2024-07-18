
import { auth, db } from "../firebase";  // Import Firestore
import { collection, getDocs, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { Patient, Therapist } from "./models";
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
                const t=Therapist.fromFireStore(doc)
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
                const t=Patient.fromFireStore(doc)
                return t;
        }
        return null
    } catch (error) {
        return null
    }
}

export const getPatientsByIds=async (ids)=>{
    try {
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

export const addPatient=async (newPatient) =>{
    try {
        await addDoc(collection(db, 'patientinfo'), newPatient);
    } 
    
     catch (error) {
        
    }
}



export async function signUp(name,email,password){
    try {
        const userCredential=await createUserWithEmailAndPassword(auth,email,password)
        if(userCredential){

            const uid=userCredential.user.uid
            await setDoc(doc(db,"therapists",uid),{
                email:email,
                password:password,
                name:name
    
            })
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

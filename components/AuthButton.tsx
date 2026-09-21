"use client";
import {useEffect,useState} from "react";
import {GoogleAuthProvider,onAuthStateChanged,signInWithPopup,signOut} from "firebase/auth";
import {auth} from "@/lib/firebase";

const provider=new GoogleAuthProvider();
provider.setCustomParameters({prompt:"select_account"});

export default function AuthButton(){
  const [user,setUser]=useState<string|null>(null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");

  useEffect(()=>onAuthStateChanged(auth,u=>setUser(u?.email??null)),[]);

  async function continueWithGoogle(){
    setBusy(true);
    setError("");
    try{
      await signInWithPopup(auth,provider);
    }catch(err:any){
      const code=String(err?.code||"");
      if(code.includes("operation-not-allowed")){
        setError("Google sign-in needs to be enabled in Firebase Authentication.");
      }else if(!code.includes("popup-closed-by-user")){
        setError("Google sign-in could not be completed. Please try again.");
      }
    }finally{
      setBusy(false);
    }
  }

  if(user)return <button className="navAuth" onClick={()=>signOut(auth)}>Sign out</button>;

  return <div className="googleAuthWrap">
    <button className="navAuth googleAuth" onClick={continueWithGoogle} disabled={busy}>
      <span className="googleMark" aria-hidden="true">G</span>
      {busy?"Opening Google…":"Continue with Google"}
    </button>
    {error&&<span className="authError" role="alert">{error}</span>}
  </div>
}

"use client";
import {useEffect,useState} from "react";
import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signOut
} from "firebase/auth";
import {auth} from "@/lib/firebase";

const provider=new GoogleAuthProvider();
provider.setCustomParameters({prompt:"select_account"});

function messageForAuthError(err:any){
  const code=String(err?.code||"");
  if(code.includes("unauthorized-domain")){
    return "This Vercel domain is not authorized in Firebase yet.";
  }
  if(code.includes("operation-not-allowed")){
    return "Google sign-in is not enabled in Firebase Authentication yet.";
  }
  if(code.includes("network-request-failed")){
    return "Google sign-in could not reach Firebase. Check your connection and try again.";
  }
  if(code.includes("web-storage-unsupported")){
    return "This browser blocks the storage Google sign-in needs. Open the site in Safari or Chrome and try again.";
  }
  return "Google sign-in could not be completed. Open the site in Safari or Chrome and try again.";
}

export default function AuthButton(){
  const [user,setUser]=useState<string|null>(null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");

  useEffect(()=>{
    let alive=true;
    getRedirectResult(auth)
      .catch(err=>{if(alive)setError(messageForAuthError(err));})
      .finally(()=>{if(alive)setBusy(false);});
    const unsub=onAuthStateChanged(auth,u=>{
      if(!alive)return;
      setUser(u?.email??null);
      if(u)setError("");
    });
    return ()=>{alive=false;unsub();};
  },[]);

  async function continueWithGoogle(){
    setBusy(true);
    setError("");
    try{
      await signInWithRedirect(auth,provider);
    }catch(err:any){
      setError(messageForAuthError(err));
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

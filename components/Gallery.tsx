"use client";
import {useState} from "react";

const media=[
  ["image","/media/book-cover.webp","10 African Folktales book cover"],
  ["image","/media/lion-tortoise.webp","Crowned lion and tortoise illustration"],
  ["video","/media/book-preview.mp4","10 African Folktales preview video"],
  ["image","/media/etsy-hardcover-1.jpg","Hardcover listing"],
  ["image","/media/walmart-paperback.jpg","Paperback listing"],
  ["image","/media/etsy-hardcover-2.jpg","Hardcover listing detail"]
] as const;

export default function Gallery(){
  const [i,setI]=useState(0);
  const m=media[i];
  const move=(d:number)=>setI(x=>(x+d+media.length)%media.length);
  return <div className="gallery">
    <div className="thumbRail" aria-label="Book media">
      {media.map((x,n)=><button key={x[1]} onClick={()=>setI(n)} className={`thumb ${n===i?"active":""}`} aria-label={`View media ${n+1}`}>
        {x[0]==="video"?<><video src={x[1]} muted preload="metadata"/><span>▶</span></>:<img src={x[1]} alt=""/>}
      </button>)}
    </div>
    <div className="mainMedia">
      {m[0]==="video"
        ?<video src={m[1]} controls playsInline preload="metadata" aria-label={m[2]}/>
        :<img src={m[1]} alt={m[2]}/>}
      <button className="arrow left" onClick={()=>move(-1)} aria-label="Previous media">‹</button>
      <button className="arrow right" onClick={()=>move(1)} aria-label="Next media">›</button>
      <b className="count">{i+1} / {media.length}</b>
    </div>
  </div>
}

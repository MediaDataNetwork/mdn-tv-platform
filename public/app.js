const DEMOS=[
{num:1,name:"Media Data Network AI News",show:"MDN AI News Today",episode:"Welcome to MDN AI News",file:"channel-1-ai-news.mp4",type:"AI News",desc:"Original AI news network introduction."},
{num:2,name:"MDN AI Talks & Podcasts",show:"MDN AI Conversations",episode:"AI Conversations: Questions Worth Asking",file:"channel-2-ai-talks.mp4",type:"Talks & Podcasts",desc:"Sample discussion format."},
{num:3,name:"MDN AI Past, Present & Future",show:"AI Through Time",episode:"AI Through Time: A Short Introduction",file:"channel-3-ai-history.mp4",type:"AI History",desc:"Original AI past, present and future overview."},
{num:4,name:"MDN AI Applications & Learning",show:"AI Tools in Practice",episode:"AI Tools in Practice: A Simple Workflow",file:"channel-4-ai-learning.mp4",type:"AI Learning",desc:"Practical AI workflows with oversight."}
];
const FEED_URL="https://jofpkbiughfbdbxbmcvc.supabase.co/functions/v1/mdn-tv-public-feed";
const byId=id=>document.getElementById(id);
const safe=s=>String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
let shows=[...DEMOS], selected=0, approved=false;
function render(){
 byId("channels").innerHTML=shows.map((s,i)=>`<button type="button" class="channel-btn" data-channel="${i}" aria-pressed="${i===selected}">CH ${s.num} · ${safe(s.name)}<small>${approved?"Approved programming":"Demonstration channel"}</small></button>`).join("");
 byId("episode-list").innerHTML=shows.map((s,i)=>`<article class="entry"><span class="chip">${safe(s.name)}</span><h3>${safe(s.episode)}</h3><p>${safe(s.show)}</p><p>${safe(s.desc)}</p><button type="button" data-watch="${i}">Watch episode</button></article>`).join("");
 byId("rights-list").innerHTML=shows.map(s=>`<article class="entry"><h3>${safe(s.episode)}</h3><p>${approved?"Approved, published programming returned by the public feed.":"Demonstration asset. Production rights must be verified separately."}</p></article>`).join("");
 selectChannel(Math.min(selected,shows.length-1));
}
function selectChannel(i,autoplay=false){
 if(!shows[i])return;
 selected=i;const s=shows[i],v=byId("player");v.pause();v.src=s.file;v.load();
 byId("playing-title").textContent=`Channel ${s.num} — ${s.name}`;
 byId("episode-title").textContent=s.episode;byId("description").textContent=s.desc;
 byId("category").textContent=s.type;byId("video-length").textContent=s.length||"Video";
 document.querySelectorAll("[data-channel]").forEach((b,n)=>{b.classList.toggle("active",n===i);b.setAttribute("aria-pressed",String(n===i));});
 if(autoplay){setTab("watch");v.play().catch(()=>{});}
}
function setTab(id){
 ["watch","episodes","schedule","rights"].forEach(t=>{byId(t).hidden=t!==id;const b=document.querySelector(`[data-tab="${t}"]`);b.classList.toggle("active",t===id);if(t===id)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current");});
}
byId("channels").addEventListener("click",e=>{const b=e.target.closest("[data-channel]");if(b){selectChannel(Number(b.dataset.channel));setTab("watch")}});
byId("episode-list").addEventListener("click",e=>{const b=e.target.closest("[data-watch]");if(b)selectChannel(Number(b.dataset.watch),true)});
byId("tabs").addEventListener("click",e=>{const b=e.target.closest("[data-tab]");if(b)setTab(b.dataset.tab)});
function renderSchedule(rows){byId("schedule-rows").innerHTML=rows.length?rows.map(r=>`<tr><td>${safe(r.when)}</td><td>${safe(r.channel)}</td><td>${safe(r.episode)}</td></tr>`).join(""):'<tr><td colspan="3">No approved scheduled broadcasts yet.</td></tr>';}
render();renderSchedule(DEMOS.map((s,i)=>({when:`Sample block ${i+1}`,channel:s.name,episode:s.episode})));
async function refreshApprovedProgramming(){
 const status=byId("feed-status");
 try{
  const response=await fetch(FEED_URL,{headers:{accept:"application/json"},cache:"no-store"});
  if(!response.ok)throw Error("Feed unavailable");
  const data=await response.json();
  if(!Array.isArray(data.channels))throw Error("Invalid feed");
  const episodes=data.channels.flatMap(c=>(c.shows||[]).flatMap(s=>(s.episodes||[]).filter(e=>typeof e.media_url==="string"&&e.media_url.startsWith("https://")).map(e=>({id:e.id,num:0,name:c.name,show:s.title,episode:e.title,file:e.media_url,type:"Approved programming",desc:e.description||"",length:e.duration_seconds?`${Math.floor(e.duration_seconds/60)}:${String(e.duration_seconds%60).padStart(2,"0")}`:"Video"}))));
  if(!episodes.length){status.textContent="Network connected. No approved published episodes yet; showing demonstration channels.";return;}
  const order=[...new Set(episodes.map(e=>e.name))];
  shows=episodes.map(e=>({...e,num:order.indexOf(e.name)+1}));selected=0;approved=true;render();
  const byEpisode=new Map(episodes.map(e=>[e.id,e]));
  renderSchedule((data.schedule||[]).filter(x=>byEpisode.has(x.episode_id)).map(x=>({when:new Date(x.starts_at).toLocaleString(),channel:byEpisode.get(x.episode_id).name,episode:byEpisode.get(x.episode_id).episode})));
  status.textContent="Showing approved, published programming from Media Data Network TV.";
 }catch{status.textContent="Live programming feed unavailable. Demonstration channel information shown instead.";}
}
refreshApprovedProgramming();

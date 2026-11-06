import {SUPABASE_URL,SUPABASE_ANON_KEY} from './supabase-config.js?v=3';

const connection=()=>({url:localStorage.getItem('paper-english-supabase-url')||SUPABASE_URL,key:localStorage.getItem('paper-english-supabase-key')||SUPABASE_ANON_KEY});
const configured=()=>{let {url,key}=connection();return url.startsWith('https://')&&key.length>20};
const headers=(token,extra={})=>({'apikey':connection().key,...(token?{Authorization:`Bearer ${token}`}:{}) ,'Content-Type':'application/json',...extra});
const request=async(path,options={})=>{let r=await fetch(`${connection().url}${path}`,options),body=await r.json().catch(()=>null);if(!r.ok)throw Error(body?.msg||body?.message||'Không thể kết nối Supabase.');return body};
export const cloud={
 configured,
 configure(url,key){url=url.trim().replace(/\/$/,'');if(!url.startsWith('https://')||key.trim().length<20)throw Error('Supabase URL hoặc Publishable/anon key chưa hợp lệ.');localStorage.setItem('paper-english-supabase-url',url);localStorage.setItem('paper-english-supabase-key',key.trim());this.storeSession(null)},
 session(){try{return JSON.parse(localStorage.getItem('paper-english-supabase-session')||'null')}catch{return null}},
 storeSession(session){if(session)localStorage.setItem('paper-english-supabase-session',JSON.stringify(session));else localStorage.removeItem('paper-english-supabase-session')},
 async signUp(email,password){return request('/auth/v1/signup',{method:'POST',headers:headers(),body:JSON.stringify({email,password})})},
 async signIn(email,password){return request('/auth/v1/token?grant_type=password',{method:'POST',headers:headers(),body:JSON.stringify({email,password})})},
 async resetPassword(email,redirectTo){return request('/auth/v1/recover',{method:'POST',headers:headers(),body:JSON.stringify({email,redirect_to:redirectTo})})},
 async updatePassword(password,token){return request('/auth/v1/user',{method:'PUT',headers:headers(token),body:JSON.stringify({password})})},
 async refresh(refreshToken){return request('/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:headers(),body:JSON.stringify({refresh_token:refreshToken})})},
 async signOut(token){try{await request('/auth/v1/logout',{method:'POST',headers:headers(token)})}finally{this.storeSession(null)}},
 async load(userId,token){let rows=await request(`/rest/v1/app_data?user_id=eq.${encodeURIComponent(userId)}&select=data`,{headers:headers(token)});return rows[0]?.data||null},
 async save(userId,data,token){await request('/rest/v1/app_data?on_conflict=user_id',{method:'POST',headers:headers(token,{Prefer:'resolution=merge-duplicates,return=minimal'}),body:JSON.stringify({user_id:userId,data,updated_at:new Date().toISOString()})})}
};

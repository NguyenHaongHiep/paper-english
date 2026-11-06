export const audioDefaults={enabled:true,accent:'en-US',voice:'',rate:1,autoPlay:false};
export function audioSettings(settings){return {...audioDefaults,...(settings?.audio||{})}}
export function selectVoice(voices,accent='en-US',preferred=''){
  const english=voices.filter(v=>/^en(?:[-_]|$)/i.test(v.lang||''));
  const exact=english.filter(v=>(v.lang||'').replace('_','-').toLowerCase()===accent.toLowerCase());
  const voice=exact.find(v=>v.voiceURI===preferred)||exact[0]||english.find(v=>v.voiceURI===preferred)||english[0]||null;
  return {voice,fallback:!voice?'default':exact.includes(voice)?'none':'english'};
}
export function cleanSpeech(text){return String(text||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&quot;/gi,'"').replace(/&#39;/gi,"'").replace(/_{2,}|\.{3,}/g,', ').replace(/\s+/g,' ').trim()}
export class EnglishTts {
  constructor({synthesis,Utterance,onChange=()=>{},timeoutMs=12000}={}){
    this.synthesis=synthesis;this.Utterance=Utterance;this.onChange=onChange;this.timeoutMs=timeoutMs;this.voices=[];this.status='idle';this.error='';this.current=null;this.generation=0;this.timer=null;this.supported=!!(synthesis&&Utterance&&typeof synthesis.speak==='function');
    this.handleVoices=()=>{this.refreshVoices();this.notify()};
    if(this.supported){this.refreshVoices();if(synthesis.addEventListener)synthesis.addEventListener('voiceschanged',this.handleVoices);else synthesis.onvoiceschanged=this.handleVoices}
  }
  notify(){this.onChange(this)}
  refreshVoices(){try{this.voices=this.synthesis?.getVoices?.()||[]}catch{this.voices=[]}}
  stop(){this.generation++;clearTimeout(this.timer);this.timer=null;this.current=null;if(this.supported){try{this.synthesis.cancel()}catch{}}this.status='idle';this.notify()}
  speak(text,settings=audioDefaults){
    this.stop();this.error='';let clean=cleanSpeech(text);
    if(!this.supported){this.error='Trình duyệt chưa hỗ trợ phát âm.';this.notify();return false}
    if(!settings.enabled){this.error='Tính năng phát âm đang tắt trong Cài đặt.';this.notify();return false}
    if(!clean){this.error='Chưa có nội dung để phát âm.';this.notify();return false}
    try{this.refreshVoices();const chosen=selectVoice(this.voices,settings.accent,settings.voice);let u=new this.Utterance(clean),generation=++this.generation;this.current=u;u.lang=chosen.voice?.lang||settings.accent||'en-US';if(chosen.voice)u.voice=chosen.voice;u.rate=Number(settings.rate)||1;this.status='loading';
      const finish=(status,error='')=>{if(generation!==this.generation)return;clearTimeout(this.timer);this.timer=null;this.current=null;this.status=status;this.error=error;this.notify()};
      const timedOut=message=>{if(generation!==this.generation)return;this.stop();this.error=message;this.notify()};u.onstart=()=>{if(generation!==this.generation)return;clearTimeout(this.timer);this.timer=setTimeout(()=>timedOut('Phát âm bị gián đoạn. Hãy thử lại.'),Math.min(120000,Math.max(20000,clean.length*500)));this.status='speaking';this.notify()};u.onend=()=>finish('idle');u.onerror=e=>finish('idle',e?.error==='not-allowed'?'Trình duyệt chặn phát âm. Hãy nhấn Nghe để thử lại.':'Không thể phát âm. Hãy thử lại hoặc chọn giọng khác.');
      this.timer=setTimeout(()=>timedOut('Không thể bắt đầu phát âm. Hãy nhấn Nghe để thử lại.'),this.timeoutMs);this.notify();this.synthesis.speak(u);return true;
    }catch{this.current=null;clearTimeout(this.timer);this.timer=null;this.status='idle';this.error='Không thể phát âm. Hãy thử lại hoặc chọn giọng khác.';this.notify();return false}
  }
  destroy(){this.stop();if(this.supported){if(this.synthesis.removeEventListener)this.synthesis.removeEventListener('voiceschanged',this.handleVoices);else if(this.synthesis.onvoiceschanged===this.handleVoices)this.synthesis.onvoiceschanged=null}this.onChange=()=>{}}
}

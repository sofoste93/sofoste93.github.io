const $ = (selector) => document.querySelector(selector);
const picker = $('#color-picker');
const hexInput = $('#hex-input');
const historyKey = 'sofoste-color-lab-history-v3';
let mode = 'analogous';
let seed = '#7C5CFF';

const normalizeHex = (value) => {
  const clean = value.trim().replace('#', '');
  if (/^[0-9a-f]{3}$/i.test(clean)) return `#${clean.split('').map((c) => c + c).join('').toUpperCase()}`;
  return /^[0-9a-f]{6}$/i.test(clean) ? `#${clean.toUpperCase()}` : null;
};
const hexToRgb = (hex) => { const n = parseInt(hex.slice(1), 16); return { r: n >> 16, g: (n >> 8) & 255, b: n & 255 }; };
const rgbToHex = ({r,g,b}) => `#${[r,g,b].map((v) => Math.round(v).toString(16).padStart(2,'0')).join('').toUpperCase()}`;
function rgbToHsl({r,g,b}) { r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h=0,s=0;const l=(max+min)/2;if(max!==min){const d=max-min;s=l>.5?d/(2-max-min):d/(max+min);if(max===r)h=(g-b)/d+(g<b?6:0);else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;h*=60;}return {h:Math.round(h),s:Math.round(s*100),l:Math.round(l*100)};}
function hslToRgb(h,s,l){s/=100;l/=100;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let r=0,g=0,b=0;if(h<60)[r,g,b]=[c,x,0];else if(h<120)[r,g,b]=[x,c,0];else if(h<180)[r,g,b]=[0,c,x];else if(h<240)[r,g,b]=[0,x,c];else if(h<300)[r,g,b]=[x,0,c];else [r,g,b]=[c,0,x];return {r:(r+m)*255,g:(g+m)*255,b:(b+m)*255};}
const hslHex = (h,s,l) => rgbToHex(hslToRgb((h+360)%360,Math.max(0,Math.min(100,s)),Math.max(0,Math.min(100,l))));
const luminance = (hex) => { const {r,g,b}=hexToRgb(hex); const channels=[r,g,b].map(v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4;}); return .2126*channels[0]+.7152*channels[1]+.0722*channels[2]; };
const contrast = (a,b) => { const [hi,lo]=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (hi+.05)/(lo+.05); };
function paletteFor(hex){const {h,s,l}=rgbToHsl(hexToRgb(hex));if(mode==='complementary')return [hslHex(h,s,Math.min(88,l+22)),hex,hslHex(h+180,s,l),hslHex(h+180,s,Math.max(18,l-20)),hslHex(h,s,Math.max(16,l-28))];if(mode==='triadic')return [hslHex(h,s,Math.min(86,l+20)),hex,hslHex(h+120,s,l),hslHex(h+240,s,l),hslHex(h,Math.max(25,s-20),Math.max(16,l-27))];if(mode==='monochrome')return [hslHex(h,s,92),hslHex(h,s,77),hex,hslHex(h,s,42),hslHex(h,s,20)];return [hslHex(h-42,s,Math.min(86,l+18)),hslHex(h-22,s,l),hex,hslHex(h+22,s,l),hslHex(h+42,s,Math.max(20,l-18))];}
function announce(message){const toast=$('#toast');toast.textContent=message;clearTimeout(announce.timer);announce.timer=setTimeout(()=>toast.textContent='READY',1800);}
async function copy(text){try{await navigator.clipboard.writeText(text);}catch{const area=document.createElement('textarea');area.value=text;document.body.append(area);area.select();document.execCommand('copy');area.remove();}announce(`COPIED ${text}`);}
function saveHistory(hex){let items=JSON.parse(localStorage.getItem(historyKey)||'[]');items=[hex,...items.filter(item=>item!==hex)].slice(0,10);localStorage.setItem(historyKey,JSON.stringify(items));renderHistory();}
function renderHistory(){const items=JSON.parse(localStorage.getItem(historyKey)||'[]');$('#color-history').innerHTML='';$('#empty-history').classList.toggle('hidden',items.length>0);items.forEach(hex=>{const button=document.createElement('button');button.style.background=hex;button.innerHTML=`<span>${hex}</span>`;button.title=`Use ${hex}`;button.onclick=()=>setColor(hex,true);$('#color-history').append(button);});}
function renderPalette(){const colors=paletteFor(seed);$('#palette').innerHTML='';colors.forEach(hex=>{const swatch=document.createElement('button');swatch.className='swatch';swatch.style.background=hex;swatch.innerHTML=`<span>${hex}</span>`;swatch.onclick=()=>copy(hex);swatch.setAttribute('aria-label',`Copy ${hex}`);$('#palette').append(swatch);});}
function updateContrast(){const fg=normalizeHex($('#foreground').value),bg=normalizeHex($('#background').value);if(!fg||!bg)return;const ratio=contrast(fg,bg);$('#contrast-preview').style.color=fg;$('#contrast-preview').style.background=bg;$('#foreground-chip').style.background=fg;$('#background-chip').style.background=bg;$('#contrast-ratio').textContent=`${ratio.toFixed(2)}:1`;$('#aa-badge').textContent=ratio>=4.5?'AA PASS':'AA FAIL';$('#aaa-badge').textContent=ratio>=7?'AAA PASS':'AAA FAIL';$('#aa-badge').classList.toggle('fail',ratio<4.5);$('#aaa-badge').classList.toggle('fail',ratio<7);}
function setColor(value,remember=false){const hex=normalizeHex(value);if(!hex)return false;seed=hex;picker.value=hex;hexInput.value=hex;$('#stage-hex').textContent=hex;$('#hex-value').textContent=hex;const rgb=hexToRgb(hex),hsl=rgbToHsl(rgb);$('#rgb-value').textContent=`${rgb.r}, ${rgb.g}, ${rgb.b}`;$('#hsl-value').textContent=`${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;$('#color-stage').style.background=hex;document.documentElement.style.setProperty('--accent',hex);$('#background').value=hex;renderPalette();updateContrast();if(remember)saveHistory(hex);return true;}
picker.addEventListener('input',()=>setColor(picker.value));picker.addEventListener('change',()=>saveHistory(seed));hexInput.addEventListener('change',()=>{if(setColor(hexInput.value,true))return;hexInput.value=seed;announce('INVALID HEX');});
$('.copy-value[data-format="hex"]').onclick=()=>copy($('#hex-value').textContent);$('.copy-value[data-format="rgb"]').onclick=()=>copy(`rgb(${$('#rgb-value').textContent})`);$('.copy-value[data-format="hsl"]').onclick=()=>copy(`hsl(${$('#hsl-value').textContent})`);
$('#harmony-tabs').addEventListener('click',(event)=>{const button=event.target.closest('button');if(!button)return;mode=button.dataset.mode;document.querySelectorAll('#harmony-tabs button').forEach(item=>item.classList.toggle('active',item===button));renderPalette();});
$('#random-button').onclick=()=>setColor(rgbToHex({r:Math.random()*255,g:Math.random()*255,b:Math.random()*255}),true);
$('#export-button').onclick=()=>copy(paletteFor(seed).map((hex,i)=>`--color-${i+1}: ${hex};`).join('\n'));
['foreground','background'].forEach(id=>$('#'+id).addEventListener('input',updateContrast));
$('#swap-button').onclick=()=>{const fg=$('#foreground').value;$('#foreground').value=$('#background').value;$('#background').value=fg;updateContrast();};
$('#clear-history').onclick=()=>{localStorage.removeItem(historyKey);renderHistory();announce('HISTORY CLEARED');};
renderHistory();setColor(seed);

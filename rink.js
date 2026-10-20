// Draws a half-rink diagram (feet; 85 ft wide; goal at top). d = {p:[[label,x,y,'u'|'o']],k:[x,y],g:'u'|'o',c:caption}
function rinkSvg(d){const R='#c33',B='#2f5fc4',U='#f2a900',X='#8e2f4f';
 let s=`<svg class="rk" viewBox="-2 -2 89 96" role="img" aria-label="${(d.c||'Rink diagram').replace(/"/g,'')}" xmlns="http://www.w3.org/2000/svg"><rect x="-2" y="-2" width="89" height="96" fill="#1d2a36"/><rect x="0" y="0" width="85" height="200" rx="28" fill="#eef6f9"/>
<path d="M36.5 11A6 6 0 0 0 48.5 11" fill="#cfe3f7" stroke="${R}" stroke-width=".35"/><rect x="39.5" y="7" width="6" height="4" fill="#ddd" stroke="${R}" stroke-width=".4"/><line x1="0" x2="85" y1="11" y2="11" stroke="${R}" stroke-width=".3"/><line x1="0" x2="85" y1="75" y2="75" stroke="${B}" stroke-width="1.2"/><line x1="0" x2="85" y1="100" y2="100" stroke="${R}" stroke-width="1.2"/>`;
 [22.5,62.5].forEach(x=>{s+=`<circle cx="${x}" cy="31" r="15" fill="none" stroke="${R}" stroke-width=".3"/><circle cx="${x}" cy="31" r="1" fill="${R}"/><circle cx="${x}" cy="80" r=".9" fill="${R}"/>`});
 const pl=(l,x,y,t,r=3.6)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${t=='u'?U:X}" stroke="#fff" stroke-width=".6"/><text x="${x}" y="${y+1.1}" text-anchor="middle" font-size="${l.length>2?2.7:3.1}" font-weight="700" font-family="Arial,sans-serif" fill="${t=='u'?'#14212c':'#fff'}">${l}</text>`;
 if(d.g)s+=pl('G',42.5,9.5,d.g,3);
 d.p.forEach(a=>s+=pl(...a));if(d.k)s+=`<circle cx="${d.k[0]+2.8}" cy="${d.k[1]+2.4}" r="1.3" fill="#111" stroke="#fff" stroke-width=".4"/>`;
 return s+'</svg>'}

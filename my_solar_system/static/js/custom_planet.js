const canvas = document.getElementById('space-canvas');
const context = canvas.getContext('2d');

const planets = [
    { name:'Mercury', type:'Terrestrial planet', color:'#aeb5b5', glow:'#e2e6e4', orbit:0.39, period:88, diameter:'4,879 km', distance:'57.9M km', moons:'0', temperature:'167 °C', velocity:'47.4 km/s', image:'Mercury.png', description:'The smallest and fastest planet, racing around the Sun in only 88 Earth days.', size:4.5, phase:4.4 },
    { name:'Venus', type:'Terrestrial planet', color:'#d9a45b', glow:'#ffe0a1', orbit:0.72, period:224.7, diameter:'12,104 km', distance:'108.2M km', moons:'0', temperature:'464 °C', velocity:'35.0 km/s', image:'Venus.png', description:'A world wrapped in dense clouds, with the hottest surface in the planetary system.', size:7, phase:2.8 },
    { name:'Earth', type:'Terrestrial planet', color:'#2f91dc', glow:'#75d9ff', orbit:1, period:365.25, diameter:'12,742 km', distance:'149.6M km', moons:'1', temperature:'15 °C', velocity:'29.8 km/s', image:'Earth.png', description:'Our ocean world and the only known planet to support life.', size:7.5, phase:5.5 },
    { name:'Mars', type:'Terrestrial planet', color:'#c94f35', glow:'#ff8768', orbit:1.52, period:687, diameter:'6,779 km', distance:'227.9M km', moons:'2', temperature:'−65 °C', velocity:'24.1 km/s', image:'Mars.png', description:'The red planet, home to enormous volcanoes, deep canyons and signs of an ancient watery past.', size:6, phase:1.2 },
    { name:'Jupiter', type:'Gas giant', color:'#d59b6a', glow:'#ffd0a4', orbit:5.2, period:4332.6, diameter:'139,820 km', distance:'778.5M km', moons:'95', temperature:'−110 °C', velocity:'13.1 km/s', image:'Jupiter.png', description:'The largest planet, a stormy gas giant that helps shape the architecture of the Solar System.', size:14, phase:3.4 },
    { name:'Saturn', type:'Gas giant', color:'#d8bc78', glow:'#ffe4a3', orbit:9.54, period:10759, diameter:'116,460 km', distance:'1.43B km', moons:'146', temperature:'−140 °C', velocity:'9.7 km/s', image:'Saturn.png', description:'A pale gas giant encircled by the most spectacular ring system in our neighbourhood.', size:12, phase:.6, rings:true },
    { name:'Uranus', type:'Ice giant', color:'#74ced6', glow:'#a8f8ff', orbit:19.19, period:30687, diameter:'50,724 km', distance:'2.87B km', moons:'28', temperature:'−195 °C', velocity:'6.8 km/s', image:'uranus.png', description:'An ice giant rotating on its side, with faint rings and a cool cyan atmosphere.', size:9, phase:4.9 },
    { name:'Neptune', type:'Ice giant', color:'#416bd8', glow:'#749aff', orbit:30.06, period:60190, diameter:'49,244 km', distance:'4.50B km', moons:'16', temperature:'−200 °C', velocity:'5.4 km/s', image:'neptune.png', description:'A deep-blue ice giant where the fastest winds in the Solar System sweep across the atmosphere.', size:9, phase:2.1 },
    { name:'Pluto', type:'Dwarf planet', color:'#a79889', glow:'#ddd0c1', orbit:39.48, period:90560, diameter:'2,377 km', distance:'5.91B km', moons:'5', temperature:'−225 °C', velocity:'4.7 km/s', image:'pluto.png', description:'A complex dwarf planet in the Kuiper Belt, accompanied by its large companion Charon.', size:4, phase:3.8 }
];

const ui = {
    list: document.getElementById('planet-list'), search: document.getElementById('planet-search'),
    speed: document.getElementById('speed-control'), speedOutput: document.getElementById('speed-output'),
    zoom: document.getElementById('zoom-control'), zoomOutput: document.getElementById('zoom-output'),
    orbits: document.getElementById('orbit-toggle'), labels: document.getElementById('label-toggle'), grid: document.getElementById('grid-toggle'),
    pause: document.getElementById('pause-button'), pauseIcon: document.getElementById('pause-icon'), pauseLabel: document.getElementById('pause-label'),
    date: document.getElementById('simulation-date'), elapsed: document.getElementById('elapsed-days'), coordinates: document.getElementById('cursor-coordinates'),
    image: document.getElementById('planet-image'), name: document.getElementById('planet-name'), type: document.getElementById('planet-class'), index: document.getElementById('planet-index'),
    description: document.getElementById('planet-description'), distance: document.getElementById('planet-distance'), period: document.getElementById('planet-period'),
    diameter: document.getElementById('planet-diameter'), moons: document.getElementById('planet-moons'), temperature: document.getElementById('planet-temperature'), velocity: document.getElementById('planet-velocity'),
    fullscreen: document.getElementById('fullscreen-button')
};

const state = { width:0, height:0, dpr:1, elapsedDays:0, speed:32, zoom:1, paused:false, selected:2, positions:[], stars:[], lastTime:performance.now() };
const startDate = new Date();

function seededRandom(seed) {
    let value = seed % 2147483647;
    return () => ((value = value * 16807 % 2147483647) - 1) / 2147483646;
}

function createStars() {
    const random = seededRandom(930317);
    const count = Math.max(90, Math.floor(state.width * state.height / 6500));
    state.stars = Array.from({length:count}, () => ({ x:random()*state.width, y:random()*state.height, size:random()*1.4+.2, alpha:random()*.7+.15, pulse:random()*Math.PI*2 }));
}

function resizeCanvas() {
    const bounds = canvas.getBoundingClientRect();
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.width = Math.max(1, bounds.width);
    state.height = Math.max(1, bounds.height);
    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    context.setTransform(state.dpr,0,0,state.dpr,0,0);
    createStars();
}

function buildPlanetList() {
    planets.forEach((planet,index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'planet-button';
        button.style.setProperty('--planet-color',planet.color);
        button.innerHTML = '<span class="planet-dot"></span><strong>'+planet.name+'</strong><small>'+String(index+1).padStart(2,'0')+'</small>';
        button.addEventListener('click',() => selectPlanet(index));
        ui.list.appendChild(button);
    });
}

function selectPlanet(index,preserveSearch=false) {
    state.selected = index;
    if (!preserveSearch) ui.search.value = '';
    const planet = planets[index];
    [...ui.list.children].forEach((button,buttonIndex) => button.classList.toggle('active',buttonIndex===index));
    ui.image.style.opacity = '0';
    ui.image.style.transform = 'scale(.9)';
    window.setTimeout(() => {
        ui.image.src = 'static/images/'+planet.image;
        ui.image.alt = planet.name;
        ui.image.style.opacity = '1';
        ui.image.style.transform = '';
    },120);
    ui.name.textContent = planet.name;
    ui.type.textContent = planet.type.toUpperCase();
    ui.index.textContent = String(index+1).padStart(2,'0');
    ui.description.textContent = planet.description;
    ui.distance.textContent = planet.distance;
    ui.period.textContent = planet.period.toLocaleString('en-US')+' days';
    ui.diameter.textContent = planet.diameter;
    ui.moons.textContent = planet.moons;
    ui.temperature.textContent = planet.temperature;
    ui.velocity.textContent = planet.velocity;
}

function orbitRadius(planet,maxRadius) {
    const min = Math.sqrt(planets[0].orbit);
    const max = Math.sqrt(planets[planets.length-1].orbit);
    const normalized = (Math.sqrt(planet.orbit)-min)/(max-min);
    return maxRadius*(.13+normalized*.87)*state.zoom;
}

function drawGrid(centerX,centerY,time) {
    if (!ui.grid.checked) return;
    context.save();
    context.strokeStyle = 'rgba(74,133,118,.075)';
    context.lineWidth = 1;
    const gap = 48;
    const offsetX = (time*.004)%gap;
    for (let x=(centerX%gap)-gap+offsetX;x<state.width;x+=gap) { context.beginPath();context.moveTo(x,0);context.lineTo(x,state.height);context.stroke(); }
    for (let y=centerY%gap-gap;y<state.height;y+=gap) { context.beginPath();context.moveTo(0,y);context.lineTo(state.width,y);context.stroke(); }
    context.strokeStyle = 'rgba(40,226,194,.09)';
    context.beginPath();context.moveTo(centerX,0);context.lineTo(centerX,state.height);context.moveTo(0,centerY);context.lineTo(state.width,centerY);context.stroke();
    context.restore();
}

function drawSun(x,y) {
    context.save();
    context.shadowBlur = 32;context.shadowColor = '#ffbd53';
    const gradient = context.createRadialGradient(x-5,y-7,2,x,y,23);
    gradient.addColorStop(0,'#fff6c2');gradient.addColorStop(.32,'#ffc85a');gradient.addColorStop(1,'#e66b19');
    context.fillStyle = gradient;context.beginPath();context.arc(x,y,18,0,Math.PI*2);context.fill();
    context.shadowBlur = 0;context.strokeStyle='rgba(255,184,69,.24)';
    context.beginPath();context.arc(x,y,28,0,Math.PI*2);context.stroke();
    context.restore();
}

function drawPlanet(planet,x,y,index,time) {
    const selected = index===state.selected;
    context.save();
    if (selected) { context.strokeStyle='rgba(40,226,194,.75)';context.setLineDash([3,4]);context.beginPath();context.arc(x,y,planet.size+8+Math.sin(time*.003)*2,0,Math.PI*2);context.stroke();context.setLineDash([]); }
    if (planet.rings) { context.strokeStyle='rgba(232,210,158,.75)';context.lineWidth=2;context.beginPath();context.ellipse(x,y,planet.size*1.8,planet.size*.55,-.28,0,Math.PI*2);context.stroke(); }
    context.shadowBlur = selected?18:8;context.shadowColor=planet.glow;
    const gradient=context.createRadialGradient(x-planet.size*.3,y-planet.size*.35,1,x,y,planet.size);
    gradient.addColorStop(0,planet.glow);gradient.addColorStop(.42,planet.color);gradient.addColorStop(1,'#101816');
    context.fillStyle=gradient;context.beginPath();context.arc(x,y,planet.size,0,Math.PI*2);context.fill();
    context.shadowBlur=0;
    if (ui.labels.checked) { context.font='9px Consolas,monospace';context.fillStyle=selected?'#77ffe8':'#71847e';context.fillText(planet.name.toUpperCase(),x+planet.size+6,y+3); }
    context.restore();
}

function draw(time) {
    context.clearRect(0,0,state.width,state.height);
    const background=context.createRadialGradient(state.width*.5,state.height*.5,0,state.width*.5,state.height*.5,Math.max(state.width,state.height)*.7);
    background.addColorStop(0,'#081713');background.addColorStop(.5,'#030b09');background.addColorStop(1,'#010403');
    context.fillStyle=background;context.fillRect(0,0,state.width,state.height);
    state.stars.forEach(star => { context.globalAlpha=star.alpha*(.72+.28*Math.sin(time*.001+star.pulse));context.fillStyle='#d8fff7';context.fillRect(star.x,star.y,star.size,star.size); });
    context.globalAlpha=1;
    const centerX=state.width*.5,centerY=state.height*.53;
    drawGrid(centerX,centerY,time);
    const maxRadius=Math.max(130,Math.min(state.width*.44,state.height*.78));
    if (ui.orbits.checked) planets.forEach((planet,index) => { const radius=orbitRadius(planet,maxRadius);context.strokeStyle=index===state.selected?'rgba(40,226,194,.25)':'rgba(121,160,149,.12)';context.lineWidth=index===state.selected?1.4:.7;context.beginPath();context.ellipse(centerX,centerY,radius,radius*.44,0,0,Math.PI*2);context.stroke(); });
    drawSun(centerX,centerY);
    state.positions=[];
    planets.forEach((planet,index) => { const angle=planet.phase+(state.elapsedDays/planet.period)*Math.PI*2;const radius=orbitRadius(planet,maxRadius);const x=centerX+Math.cos(angle)*radius;const y=centerY+Math.sin(angle)*radius*.44;state.positions.push({x,y,radius:planet.size+10});drawPlanet(planet,x,y,index,time); });
}

function updateClock() {
    const date=new Date(startDate.getTime()+state.elapsedDays*86400000);
    ui.date.textContent=date.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase();
    ui.elapsed.textContent='T + '+state.elapsedDays.toFixed(1).padStart(6,'0')+' DAYS';
}

function animate(time) {
    const delta=Math.min((time-state.lastTime)/1000,.1);
    state.lastTime=time;
    if (!state.paused) state.elapsedDays+=delta*state.speed;
    draw(time);updateClock();requestAnimationFrame(animate);
}

function setSpeed() {
    const value=Number(ui.speed.value);
    state.speed=Math.round(Math.pow(value/100,2)*180);
    ui.speedOutput.textContent=state.speed===0?'0 d/s':state.speed+' d/s';
}

function togglePause() {
    state.paused=!state.paused;
    ui.pauseIcon.textContent=state.paused?'▶':'Ⅱ';
    ui.pauseLabel.textContent=state.paused?'Resume simulation':'Pause simulation';
}

buildPlanetList();selectPlanet(2);setSpeed();resizeCanvas();updateClock();
new ResizeObserver(resizeCanvas).observe(canvas);
ui.speed.addEventListener('input',setSpeed);
ui.zoom.addEventListener('input',() => { state.zoom=Number(ui.zoom.value)/100;ui.zoomOutput.textContent=ui.zoom.value+'%'; });
ui.pause.addEventListener('click',togglePause);
ui.search.addEventListener('input',() => { const query=ui.search.value.trim().toLowerCase();const index=planets.findIndex(planet=>planet.name.toLowerCase().startsWith(query));if(query&&index>=0) selectPlanet(index,true); });
canvas.addEventListener('mousemove',event => { const bounds=canvas.getBoundingClientRect();const x=event.clientX-bounds.left-state.width/2;const y=event.clientY-bounds.top-state.height*.53;ui.coordinates.textContent='X '+x.toFixed(2).padStart(7,'0')+' · Y '+y.toFixed(2).padStart(7,'0'); });
canvas.addEventListener('click',event => { const bounds=canvas.getBoundingClientRect();const x=event.clientX-bounds.left,y=event.clientY-bounds.top;let closest=-1,distance=Infinity;state.positions.forEach((position,index)=>{const current=Math.hypot(x-position.x,y-position.y);if(current<position.radius&&current<distance){closest=index;distance=current;}});if(closest>=0)selectPlanet(closest); });
ui.fullscreen.addEventListener('click',() => { if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();else document.exitFullscreen?.(); });
document.addEventListener('keydown',event => { if(event.code==='Space'&&event.target.tagName!=='INPUT'){event.preventDefault();togglePause();} });
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) togglePause();
requestAnimationFrame(animate);

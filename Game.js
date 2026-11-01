const $=i=>document.getElementById(i);
// nombre, torso, pantalón, calzado, piel, pelo, brillo, mochila, metal
const C=[["Agente urbano",0x161616,0x1a1a1f,0xcc2222,0xe0ac8a,0x3a2418,0xff2040],
["Corredor futurista",0x10203a,0x101828,0x1aa0ff,0xe0ac8a,0x3a2418,0x20b8ff],
["Exploradora",0x2a2a24,0x6b6a3c,0x8a6a20,0xd9a07f,0x1a1010,0,1],
["Mecánico",0x2a52b8,0x2a52b8,0x5a3a20,0xe0ac8a,0x1a2a50,0],
["Hacker",0x241a33,0x15151c,0xa040ff,0xe0ac8a,0x111111,0xb050ff],
["Policía futurista",0x1a2040,0x1a2040,0x111111,0xe0ac8a,0x111111,0x4060ff],
["Piloto",0xcc1f2a,0x15151a,0xff3030,0xe0ac8a,0xeeeeee,0],
["Superviviente",0x5c5a3a,0x4a4630,0x3a2a1a,0xd9a07f,0x3a2418,0,1],
["Robot humanoide",0xc0c8d4,0xa8b0bc,0x8892a0,0xd8e0ea,0x6fe0ff,0x40d0ff,0,1],
["Civil",0xb8b8c0,0x161616,0xeeeeee,0xe0ac8a,0x3a2418,0]];

const R=new THREE.WebGLRenderer({canvas:$('c'),antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene();S.background=new THREE.Color(0x07060f);S.fog=new THREE.Fog(0x07060f,30,150);
const cam=new THREE.PerspectiveCamera(60,1,.1,300);
S.add(new THREE.HemisphereLight(0x8070ff,0x180a30,1.1));
const dl=new THREE.DirectionalLight(0xff9de8,.6);dl.position.set(30,60,20);S.add(dl);
function rs(){R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',rs);rs();

const gr=new THREE.Mesh(new THREE.PlaneGeometry(260,260),new THREE.MeshStandardMaterial({color:0x0c0c1a,roughness:.9}));
gr.rotation.x=-Math.PI/2;S.add(gr);
const NC=[0xff2bd6,0x00e5ff,0xffd400,0x7a5cff],B=[];let seed=7;
const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++){
 const cx=i*40,cz=j*40;
 const sl=new THREE.Mesh(new THREE.BoxGeometry(27,.04,27),new THREE.MeshStandardMaterial({color:0x1a1a2e}));sl.position.set(cx,.02,cz);S.add(sl);
 if(!i&&!j)continue;
 const w=12+rnd()*10,d=12+rnd()*10,h=10+rnd()*45,col=NC[(rnd()*4)|0];
 const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:0x16162c,roughness:.5}));
 b.position.set(cx,h/2,cz);S.add(b);
 const e=new THREE.LineSegments(new THREE.EdgesGeometry(b.geometry),new THREE.LineBasicMaterial({color:col}));e.position.copy(b.position);S.add(e);
 const sm=new THREE.MeshBasicMaterial({color:new THREE.Color(col).multiplyScalar(.5)});
 for(let y=6;y<h;y+=8){const s=new THREE.Mesh(new THREE.BoxGeometry(w+.1,.5,d+.1),sm);s.position.set(cx,y,cz);S.add(s)}
 B.push({x:cx,z:cz,w:w/2,d:d/2,c:col});
}
const lm=new THREE.MeshBasicMaterial({color:0x00e5ff});
for(let k=-3;k<=2;k++){const p=k*40+20;
 let a=new THREE.Mesh(new THREE.BoxGeometry(.25,.03,230),lm);a.position.set(p,.03,0);S.add(a);
 a=new THREE.Mesh(new THREE.BoxGeometry(230,.03,.25),lm);a.position.set(0,.03,p);S.add(a)}
const ring=new THREE.Mesh(new THREE.RingGeometry(5,5.5,48),new THREE.MeshBasicMaterial({color:0xff2bd6,side:2}));
ring.rotation.x=-Math.PI/2;ring.position.y=.07;S.add(ring);
   

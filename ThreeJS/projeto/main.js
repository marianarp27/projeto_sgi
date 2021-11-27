//cena
var cena = new THREE.Scene();
cena.background = new THREE.Color( 0xffffff );

//canvas
var meuCanvas = document.getElementById( 'meuCanvas' );

//RELÓGIO
var relogio = new THREE.Clock();

//MISTURADOR
var misturador = new THREE.AnimationMixer(cena);

//Ações
var acaoBenchExtend;
var acaoLegExtend;
var acaoLeftDoor;
var acaoRightDoor;

//VARIÁVEIS PARA BOTÕES HTML
var ativar = document.getElementById('btn_play');
var pausar = document.getElementById('btn_pause');
var parar = document.getElementById('btn_stop');
var reverter = document.getElementById('btn_reverse');
var ciclo = document.getElementById('menu_loop');

//camera
var camara = new THREE.PerspectiveCamera( 70, 800 / 600, 0.1, 500 );
camara.position.x = 6;
camara.position.y = 4;
camara.position.z = 7;
camara.lookAt( 0, 0, 0 );

//renderer
var renderer = new THREE.WebGLRenderer({ canvas: meuCanvas }); //canvas
renderer.shadowMap.enabled = true;
renderer.setSize( 800, 600 );
renderer.render( cena, camara );

//orbitcontrols
var controlos = new THREE.OrbitControls( camara, renderer.domElement );

//gridHelper = grelha/chão de referência
//var grelha = new THREE.GridHelper();
//cena.add( grelha );

//função de animação
function animar() { 
    requestAnimationFrame( animar );
    misturador.update( relogio.getDelta()); //ativar misturador
    renderer.render( cena, camara ); 
    
} 

//loader de Gltf + luz
var carregador = new THREE.GLTFLoader();
carregador.load( 'workBenchM.gltf', 
function ( gltf )
 { 
    gltf.scene.traverse(function(x) { 
    if (x instanceof THREE.Light) 
    x.visible = false });
    cena.add( gltf.scene ) 
    //cena = new THREE.Mesh(stoneBenchM); - mexer para a textura
    //clipe animação BenchExtend
    clipeBenchExtend = THREE.AnimationClip.findByName( gltf.animations, 'BenchExtend' );
    acaoBenchExtend = misturador.clipAction( clipeBenchExtend ); 
    //clipe animação LegExtend
    clipeLegExtend = THREE.AnimationClip.findByName( gltf.animations, 'LegExtend' );
    acaoLegExtend = misturador.clipAction( clipeLegExtend ); 
    //clipe animação LeftDoor
    clipeLeftDoor = THREE.AnimationClip.findByName( gltf.animations, 'LeftDoor' );
    acaoLeftDoor = misturador.clipAction( clipeLeftDoor ); 
    //clipe animação RightDoor
    clipeRightDoor = THREE.AnimationClip.findByName( gltf.animations, 'RightDoor' );
    acaoRightDoor = misturador.clipAction( clipeRightDoor ); 
} );
    

//pontos luz
var luzPonto1 = new THREE.PointLight( "white" );
luzPonto1.position.set( 5, 3, 5 ); //original 5,3,5
cena.add( luzPonto1 );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
cena.add( light );

//ANIMAÇÕES DOS BOTÕES
//PLAY
function fazerplay(){
    acaoBenchExtend.play();
    acaoLegExtend.play();
    acaoLeftDoor.play();
    acaoRightDoor.play();
}
ativar.addEventListener("click", fazerplay);

//STOP
function fazerstop(){
    acaoBenchExtend.stop();
    acaoLegExtend.stop();
    acaoLeftDoor.stop();
    acaoRightDoor.stop();
}
parar.addEventListener("click",fazerstop);

//PAUSA
function fazerpausa(){
    acaoBenchExtend.paused = true;
    acaoLegExtend.paused = true;
    acaoLeftDoor.paused = true;
    acaoRightDoor.paused = true;
}
pausar.addEventListener("click", fazerpausa);

//RESET COM TIMESCALE
function reverteranimacao(){
    acaoBenchExtend.timeScale = -1;
    acaoLegExtend.timeScale = -1;
    acaoLeftDoor.timeScale = -1;
    acaoRightDoor.timeScale = -1;
}
reverter.addEventListener("click", reverteranimacao);

// ciclo setLoop
function loop(){
    if(ciclo.value == '1'){
        acaoBenchExtend.setLoop(THREE.LoopOnce);
        acaoLegExtend.setLoop(THREE.LoopOnce);
        acaoLeftDoor.setLoop(THREE.LoopOnce);
        acaoRightDoor.setLoop(THREE.LoopOnce);
    }
    if(ciclo.value == '2'){
        acaoLegExtend.setLoop(THREE.LoopRepeat);
    }
    if(ciclo.value == '3'){
        acaoBenchExtend.setLoop(THREE.LoopPingPong);
        acaoLegExtend.setLoop(THREE.LoopPingPong);
        acaoLeftDoor.setLoop(THREE.LoopPingPong);
        acaoRightDoor.setLoop(THREE.LoopPingPong);
    }
}
ciclo.addEventListener("click",loop);

//animar - sempre a última função
animar();




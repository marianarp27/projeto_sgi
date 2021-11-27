//cena
var cena = new THREE.Scene();

//canvas
var meuCanvas = document.getElementById( 'meuCanvas' );

//RELÓGIO
var relogio = new THREE.Clock();

//MISTURADOR
var misturador = new THREE.AnimationMixer(cena);

//Ações
var acaolocy;
var acaoRotz;

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
var grelha = new THREE.GridHelper();
cena.add( grelha );

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
    //clipe animação LOCY
    clipeLocy = THREE.AnimationClip.findByName( gltf.animations, 'LocY' );
    acaolocy = misturador.clipAction( clipeLocy ); 
    //acaolocy.play();//fim clipe animação LOCY - removido no ponto 4
    //clipe animação ROTZ
    clipeRotz = THREE.AnimationClip.findByName( gltf.animations, 'RotZ' );
    acaoRotz = misturador.clipAction( clipeRotz ); 
    //acaoRotz.play();//fim clipe animação ROTZ - removido no ponto 4

} );
    

//pontos luz
var luzPonto1 = new THREE.PointLight( "white" );
luzPonto1.position.set( 5, 3, 5 );
cena.add( luzPonto1 );

//ANIMAÇÕES DOS BOTÕES
//PLAY
function fazerplay(){
    acaoRotz.play();
}
ativar.addEventListener("click", fazerplay);

//STOP
function fazerstop(){
    acaoRotz.stop();
}
parar.addEventListener("click",fazerstop);

//PAUSA
function fazerpausa(){
    acaoRotz.paused = true;
}
pausar.addEventListener("click", fazerpausa);

//RESET COM TIMESCALE
function reverteranimacao(){
    acaoRotz.timeScale = -1;
}
reverter.addEventListener("click", reverteranimacao);

// ciclo setLoop
function loop(){
    if(ciclo.value == '1'){
        acaoRotz.setLoop(THREE.LoopOnce);
    }
    if(ciclo.value == '2'){
        acaoRotz.setLoop(THREE.LoopRepeat);
    }
    if(ciclo.value == '3'){
        acaoRotz.setLoop(THREE.LoopPingPong);
    }
}
ciclo.addEventListener("click",loop);

//animar - sempre a última função
animar();




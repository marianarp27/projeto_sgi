//cena
var cena = new THREE.Scene();
cena.background = new THREE.Color( 0xCFBDA6 );

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
var light = document.getElementById('btn_light');

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

//função de animação
function animar() { 
    requestAnimationFrame( animar );
    misturador.update( relogio.getDelta()); //ativar misturador
    renderer.render( cena, camara ); 
} 

//loader de Gltf + luz
var carregador = new THREE.GLTFLoader();
carregador.load( 'workBench_certo.gltf', 
function ( gltf )
 { 
    gltf.scene.traverse(function(x) { 
    /* if (x instanceof THREE.Light) 
    x.visible = false }); */
    if (x.isMesh) {
        x.castShadow = true
        x.receiveShadow = true			
    }
});
    cena.add( gltf.scene ) 
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
    //apenas repetir uma vez
    acaoBenchExtend.setLoop(THREE.LoopOnce);
    acaoLegExtend.setLoop(THREE.LoopOnce);
    acaoLeftDoor.setLoop(THREE.LoopOnce);
    acaoRightDoor.setLoop(THREE.LoopOnce);
} );
    

//pontos luz
var luzPonto1 = new THREE.PointLight( "white", 4, 0, 2);
luzPonto1.position.set( 10, 5, 10 ); //original 5,3,5, 202010
cena.add( luzPonto1 );
var luzPonto2 = new THREE.PointLight( "white", 4, 0, 2);
luzPonto2.position.set( -10, -5, -10 ); //original 5,3,5, 20,0,10
cena.add( luzPonto2 );

var luzAmbiente = new THREE.AmbientLight( "white", 1);
cena.add(luzAmbiente);

var hemilight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1)
cena.add(hemilight);
var spotLight = new THREE.SpotLight(0xFFA95C, 1)
spotLight.castShadow = true
cena.add(spotLight);


//ANIMAÇÕES DOS BOTÕES
//PLAY
function fazerplay(){
    fazerstop();
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

//LIGHT
function fazerlight(){
    var luzPonto1 = new THREE.PointLight( "white", 4,0, 2);
    luzPonto1.position.set( 10, 5, 10 ); //original 5,3,5, 202010
    cena.add( luzPonto1 );
    var luzPonto2 = new THREE.PointLight( "white", 4, 0, 2 );
    luzPonto2.position.set( -10, -5, -10 ); //original 5,3,5, 20,0,10
    cena.add( luzPonto2 );
}
light.addEventListener("click", fazerlight);

//animar - sempre a última função
animar();

//RESET COM TIMESCALE
/* function reverteranimacao(){
    acaoBenchExtend.timeScale = -1;
    acaoLegExtend.timeScale = -1;
    acaoLeftDoor.timeScale = -1;
    acaoRightDoor.timeScale = -1;
}
reverter.addEventListener("click", reverteranimacao); */

// ciclo setLoop
/* function loop(){
    if(ciclo.value == '1'){
        
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
ciclo.addEventListener("click",loop); */






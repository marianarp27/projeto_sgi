
//cena
var cena = new THREE.Scene();
cena.background = new THREE.Color( 0xE3DAC9 );

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

//Objetos
var banco = document.getElementsByName('benchExtend');
var perna = document.getElementsByName('legExtend1');
var porta1 = document.getElementsByName('door');
var porta2 = document.getElementsByName('door1');
var suporte = document.getElementsByName('workBench');

//VARIÁVEIS PARA BOTÕES HTML
var ativar = document.getElementById('btn_play');
var pausar = document.getElementById('btn_pause');
var parar = document.getElementById('btn_stop');
var light = document.getElementById('btn_light');
var btn_texture_brown = document.getElementById('Castanho_label');
var btn_texture_white = document.getElementById('Bege_label');
var btn_texture_black = document.getElementById('Preto_label');

//camera

var camara = new THREE.PerspectiveCamera( 80, 800 / 600, 0.1, 300 );
camara.position.x = -5;
camara.position.y = 8;
camara.position.z = 13;
camara.lookAt( 0, 0, 0 );


function ButtonReset() {
    camara.position.set(-5, 8, 13);
    camara.lookAt( 0, 0, 0 ); 
}

//renderer
var renderer = new THREE.WebGLRenderer({ canvas: meuCanvas }); //canvas
renderer.shadowMap.enabled = true;
renderer.setSize( 548, 415 );
renderer.render( cena, camara );

//orbitcontrols
var controlos = new THREE.OrbitControls( camara, renderer.domElement );

//função de animação 
function animar() { 
    requestAnimationFrame( animar );
    misturador.update( relogio.getDelta()); //ativar misturador
    renderer.render( cena, camara ); 
} 

var globalObject; // variavel global 
var texture_init = new THREE.TextureLoader().load( "materials/Wood051_1K_Color.png" );

//loader de Gltf + luz
var carregador = new THREE.GLTFLoader();
carregador.load( 'workBench.gltf', 
function ( gltf )
 { 
    globalObject = gltf; //store global reference to .obj --- uso na função nova_textura() 
    gltf.scene.traverse(function(x) { 
    if (x.isMesh) {
     
        x.material = new THREE.MeshPhongMaterial({
            color:     0xEDE5DD, 
            specular:  0x373737,
            shininess: 80,
            map:       texture_init,
            side:      THREE.DoubleSide
        });
        cena.getObjectByName('stoneBench').material.map = new THREE.TextureLoader().load( "materials/Marble018_1K_Color.jpg" );	
        x.castShadow = true;
        x.receiveShadow = true;
    }
    cena.add( gltf.scene );
});
    
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

// light inside table
var spotLight_inside = new THREE.SpotLight(0xB4B4B4, 0.3);
spotLight_inside.position.set( 0, 3,  0);
spotLight_inside.castShadow = true;
cena.add(spotLight_inside);


// LIGHTS
var ambientLight = new THREE.AmbientLight( 0x333333 );

var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 20, 0 );
cena.add( ambientLight, hemiLight );


var spotLight1 = new THREE.SpotLight( 0x7A7572);
spotLight1.position.set( 100, 200, 500 );

var spotLight2 = new THREE.SpotLight( 0x7A7572);
spotLight2.position.set( -100, -200, -500 );

var dirLight = new THREE.DirectionalLight( 0xBEB7B1 );
dirLight.position.set( 500, 0, 400 ); 

cena.add( spotLight1, spotLight2, dirLight ); 

// --- SpotLight para botão de ligar/desligar a luz adicional  ---
var dirLight_toggle = new THREE.DirectionalLight( 0xEFEDE9 );
dirLight_toggle.position.set( -150, 50, 100 ); 

function ButtonToggleLight() {
    var toggleLight = document.getElementById("btn_light");

    if (toggleLight.value == "ON"){ 
        toggleLight.value = "OFF";
        cena.remove( dirLight_toggle ); // remove o SpotLight

    } else if (toggleLight.value == "OFF") {
        toggleLight.value = "ON";
        cena.add( dirLight_toggle ); // adiciona o SpotLight
    }
}
/* ------------------------------------------------------------ */

//ANIMAÇÕES DOS BOTÕES
//PLAY
function fazerplay(){
    fazerstop();
    acaoBenchExtend.play();
    acaoLegExtend.play();
    acaoLeftDoor.play()
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

// função que muda a textura do objeto
function nova_textura(textura) {
    globalObject.scene.traverse( function ( x ) {   
            
        x.material = new THREE.MeshPhongMaterial({
            color:     0xEDE5DD, 
            specular:  0x373737,
            shininess: 80,
            map:       textura,
            side:      THREE.DoubleSide
        });
        cena.getObjectByName('stoneBench').material.map = new THREE.TextureLoader().load( "materials/Marble018_1K_Color.jpg" );	
    });
}

btn_texture_brown.onclick = function() { 
	var texture_opt = new THREE.TextureLoader().load( "materials/Wood051_1K_Color.png" ); // vai buscar a textura
    // uma função que irá carregar a textura
    nova_textura(texture_opt);   
    
}

btn_texture_white.onclick = function() { 
	var texture_opt = new THREE.TextureLoader().load( "materials/white_wood.png" ); // vai buscar a textura
    // uma função que irá carregar a textura
    nova_textura(texture_opt);
}

btn_texture_black.onclick = function() { 
	var texture_opt = new THREE.TextureLoader().load( "materials/black_wood.png" ); // vai buscar a textura
    // uma função que irá carregar a textura
    nova_textura(texture_opt);   
}
//animar - sempre a última função
animar();




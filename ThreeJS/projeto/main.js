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
//var light = document.getElementById('btn_light');
var colorWhite = document.getElementById('btn_white');
var btn_texture_white = document.getElementById("btn_texture_white");
var btn_texture_faia = document.getElementById("btn_texture_faia");
var btn_texture_black = document.getElementById("btn_texture_black");

//camera

var camara = new THREE.PerspectiveCamera( 80, 800 / 600, 0.1, 300 );
camara.position.x = -5;
camara.position.y = 8;
camara.position.z = 13;
camara.lookAt( 0, 0, 0 );


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

//loader de Gltf + luz
var carregador = new THREE.GLTFLoader();
carregador.load( 'workBench_certo.gltf', 
function ( gltf )
 { 
    globalObject = gltf; //store global reference to .obj --- uso na função nova_textura() 
    gltf.scene.traverse(function(x) { 
    if (x.isMesh) {
        x.castShadow = true
        x.receiveShadow = true		
    }
    cena.add( gltf.scene ) 
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
/*
//LIGHT
function addlight(){
    var luzPonto1 = new THREE.PointLight( "white", 4,0, 2);
    luzPonto1.position.set( 10, 5, 10 ); //original 5,3,5, 202010
    cena.add( luzPonto1 );
    var luzPonto2 = new THREE.PointLight( "white", 4, 0, 2 );
    luzPonto2.position.set( -10, -5, -10 ); //original 5,3,5, 20,0,10
    cena.add( luzPonto2 );
}
light.addEventListener("click", addlight);
*/
/*
function nova_textura(textura) {
    globalObject.scene.traverse( function ( x ) {        
        if (x.isMesh) {
            x.castShadow = true
            x.receiveShadow = true	
            //x.material.needsUpdate = true	
            x.material.map = textura; //x.material.texture2,map
            cena.getObjectByName('stoneBench').material.map = new THREE.TextureLoader().load( "materials/Marble018_1K_Color.jpg" );
        }
    });
}

//para o botão textura_white
btn_texture_white.onclick = function() { 
    
	var texture3 = new THREE.TextureLoader().load( "materials/Marble018_1K_Color.jpg" ); // vai buscar a textura
	//var material3 = new THREE.MeshBasicMaterial( {  color: 0xffffff, map: texture3} ); // cria uma MESH com a textura escolhida(load)


    //cena.remove(luzPonto2);
   // cena.remove(luzPonto1);
    // uma função que irá carregar a textura
    nova_textura(texture3);  

    
}

//para o botão textura_faia
btn_texture_faia.onclick = function() { 
    
	var texture2 = new THREE.TextureLoader().load( "materials/faiaWood.jpg" ); // vai buscar a textura
	//var material2 = new THREE.MeshBasicMaterial( {  color: 0xffffff, map: texture2} ); // cria uma MESH com a textura escolhida(load)

    // uma função que irá carregar a textura
    nova_textura(texture2);    
}


//para o botão textura_black
btn_texture_black.onclick = function() { 
    
	var texture4 = new THREE.TextureLoader().load( "materials/blackwood.jpg" ); // vai buscar a textura
	//var material4 = new THREE.MeshBasicMaterial( {  color: 0xffffff, map: texture4} ); // cria uma MESH com a textura escolhida(load)

    // uma função que irá carregar a textura
    nova_textura(texture4);    
}
*/
//animar - sempre a última função
animar();




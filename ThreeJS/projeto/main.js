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
//var colorWhite = document.getElementById('btn_white');
var btn_texture_brown = document.getElementById('Castanho_label');
var btn_texture_white = document.getElementById('Beje_label');
var btn_texture_black = document.getElementById('Preto_label');

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
var texture_init = new THREE.TextureLoader().load( "materials/Wood051_1K_Color.png" );

//loader de Gltf + luz
var carregador = new THREE.GLTFLoader();
carregador.load( 'workBench_certo.gltf', 
function ( gltf )
 { 
    globalObject = gltf; //store global reference to .obj --- uso na função nova_textura() 
    gltf.scene.traverse(function(x) { 
    if (x.isMesh) {
        	

        //x.material.map = texture_init;        
        x.material = new THREE.MeshPhongMaterial({
            color:     0xEDE5DD, 
            specular:  0x373737,
            shininess: 30,
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


    
//pontos luz 
/* var luzPonto1 = new THREE.PointLight( "white", 4, 0 , 2); // "white", 4, 0, 2 -- color, intensity, distance, decay
luzPonto1.position.set( 20, 5, 20 ); //original 5,3,5, 202010 -- 10 5 10
cena.add( luzPonto1 ); */
/* 
var luzPonto2 = new THREE.PointLight( "white", 4, 0, 2);
luzPonto2.position.set( -20, -5, -20 ); //original 5,3,5, 20,0,10
cena.add( luzPonto2 ); */

/* var luzAmbiente = new THREE.AmbientLight( 0xffffff );
cena.add(luzAmbiente); */

/* var hemilight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1); // 0xffeeb1, 0x080820, 1
cena.add(hemilight);
var spotLight = new THREE.SpotLight(0xFFA95C, 1);
spotLight.castShadow = true;
cena.add(spotLight);

var light1 = new THREE.PointLight( 0xffffff, 1.5, 2000 );
light1.color.setHSL( 0.55, 1, 0.95); // cor da luz
light1.position.set( 50, 10, 50 );
cena.add( light1 );


var light2 = new THREE.PointLight( 0xffffff, 1.5, 2000 );
light2.color.setHSL( 0.55, 0.9, 0.5);
light2.position.set( -50, -10, -50 );
cena.add( light2 );

var helper =  new THREE.PointLightHelper( luzPonto1 ); 
var helper2 =  new THREE.PointLightHelper( light1 ); 
var helper3 =  new THREE.PointLightHelper( light2 ); 

cena.add( helper2,  helper3); */



// LIGHTS
var ambientLight = new THREE.AmbientLight( 0x333333 );
cena.add(ambientLight); 

var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 20, 0 );
cena.add( hemiLight );



/* var pointLight1 = new THREE.PointLight( 0xEDE5DD, 1.5, 100 );
pointLight1.position.set( 20, 5, 50);
var pointLight2 = new THREE.PointLight( 0xEDE5DD, 1.5, 100 );
pointLight2.position.set( -20, -5, -50 );
cena.add( pointLight1, pointLight2); */



var spotLight1 = new THREE.SpotLight( 0xEDE5DD);
spotLight1.position.set( 100, 200, 500 );

var spotLight2 = new THREE.SpotLight( 0xEDE5DD);
spotLight2.position.set( -100, -200, -500 );


var helper3 =  new THREE.SpotLightHelper( spotLight1 ); 
var helper4 =  new THREE.SpotLightHelper( spotLight2 ); 
cena.add( spotLight1, spotLight2, helper3, helper4 );

/* var dirLight1 = new THREE.DirectionalLight( 0xffffff );
dirLight1.position.set( 100, 50, 400 ); //  30, -5, 20
cena.add( dirLight1 );

var helper5 =  new THREE.DirectionalLightHelper( dirLight1 ); 
cena.add( helper5 ); */

/* ******************************************** */
//  defenir SpotLight para butão de ligar/desligar a luz adicional 
spot_light_toggle = new THREE.SpotLight( 0xEDE5DD );
spot_light_toggle.position.set( 50, 80, 500 );    

function ButtonToggleLight() {
    var toggleLight = document.getElementById("btn_light");
    //console.log(toggleLight.value);

    if (toggleLight.value == "ON"){ 
        toggleLight.value = "OFF";
        cena.remove( spot_light_toggle ); // remove o SpotLight

    } else if (toggleLight.value == "OFF") {
        toggleLight.value = "ON";
        cena.add( spot_light_toggle ); // adiciona o SpotLight
    }
}
/* ******************************************** */



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

           

//LIGHT
/*  function addlight(){
    spot_light = new THREE.SpotLight( 0xffffff, 1 );
    spot_light.position.set( 40, 50, 200 );    

    lightHelper1 = new THREE.SpotLightHelper( spot_light );
    cena.add( spot_light, lightHelper1 );

}
light.addEventListener("click", addlight);  */




// função que muda a textura do objeto
function nova_textura(textura) {
    globalObject.scene.traverse( function ( x ) {   
            
       /*  if (x.isMesh) {
            x.castShadow = true;
            x.receiveShadow = true;	
            x.material.map = textura; //x.material.texture2,map
            cena.getObjectByName('stoneBench').material.map = new THREE.TextureLoader().load( "materials/Marble018_1K_Color.jpg" );
            //x.material.needsUpdate = true;
        } */ 
        
        x.material = new THREE.MeshPhongMaterial({
            color:     0xEDE5DD, 
            specular:  0x373737,
            shininess: 30,
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




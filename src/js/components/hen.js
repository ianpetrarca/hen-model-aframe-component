
//ASYNC REST API REQUEST
async function getTokenInfo(id){
    try {
        if(id.includes('xyz')){
          id = id.substring(32)
        }
        const res = await axios.get('https://api.better-call.dev/v1/tokens/mainnet/metadata?token_id=' + id.toString())
        return res.data[0]
    } catch (error) {
        return null
    }
  }
  
  AFRAME.registerComponent('hen-model', {
    schema: {
      url: {type:'string'}, //Hicetnunc.xyz URL or OBJKT ID input
      scale: {type:'number', default: 1}, //Scale of Model
      animated: {type:'boolean', default:true}, //Animate model
      reflection: {type:'boolean', default:true} //Animate model
    },
    init: function () {
  
      //Async Function to get IPFS Hash for OBJKT
      getTokenInfo(this.data.url).then((response) => {  
        let id = response.artifact_uri
        this.el.setAttribute('src','https://cloudflare-ipfs.com/ipfs/'+ id.slice(7,id.length))
      }).catch((response) => { 
          
      })
  
      //Turn on / off animation based on user input
      if(!this.data.animated){
        this.el.removeAttribute('animation-mixer');
      } else {
        this.el.setAttribute('animation-mixer', '')
      }

      if(!this.data.reflection){

      }else {
        this.el.setAttribute('cube-env-map', 'path: https://storage.googleapis.com/titanpointe/indoor/; extension: png; reflectivity: 1')
      }


    
      // Variables for capturing the roughness/metalness values of each material in the model
      this.metalMap = {}
      this.roughMap = {}
  
      //Functions for Material parameters
      this.prepareMap.bind(this) //Parse Materials
      this.traverseMesh.bind(this) //Apply Materials 
      
      //Loading Text
      var text = document.createElement('a-text');
      text.setAttribute('value','Loading...')
      text.setAttribute('position', {x: -.5, y: 0, z: 0});
      this.el.appendChild(text)

      //Loading Spinner Box
      var loadBox = document.createElement('a-entity')
      loadBox.setAttribute('geometry', {
        primitive: 'box',
        height: .25,
        width: .25,
        depth:.25
      });

      //Add Loadbox Animations
      loadBox.setAttribute('position', {x: 0, y: .5, z: 0});
      loadBox.setAttribute('material','wireframe','true');
      loadBox.setAttribute('animation', 'property: rotation; to: 0 360 360;loop:true;dir:alternate;dur:3000');
      this.el.appendChild(loadBox)

      this.el.addEventListener('model-loaded', evt => 
       {
        this.el.removeChild(text)
        this.el.removeChild(loadBox)
        this.scale();
        this.prepareMap()
        this.update()
      });

    },
    prepareMap: function() { //Parse Model Nodes for material information
      this.traverseMesh(node => {
          this.roughMap[node.uuid] = node.material.roughness
          this.metalMap[node.uuid] = node.material.metalness
      })
    },
    update: function () { //Traverse Mesh and apply material parameters and cubemap
      this.traverseMesh(node => {
        node.material.metalness = this.metalMap[node.uuid]
        node.material.roughness = this.roughMap[node.uuid] 
        
        if(!node.material.envMapIntensity==1){ //Check for unlit models that dont require cubemap
         this.el.removeAttribute('cube-env-map');
        }
  
      })
    },
    traverseMesh: function(func) { 
      //Traverse nodes and find actual meshes in GLTF/GLB File
      var mesh = this.el.getObject3D('mesh');
      if (!mesh) { return; }
       mesh.traverse(node => {
        if (node.isMesh) {
          func(node)
        }
      }); 
    }, 
    scale: function () {
      //Get Object Meshes
      const el = this.el;
      const span = this.data.scale;
      const mesh = el.getObject3D('mesh');
  
      if (!mesh) return;
  
      // Compute bounds.
      const bbox = new THREE.Box3().setFromObject(mesh);
  
      // Normalize scale.
      const scale = span / bbox.getSize().length();
      mesh.scale.set(scale, scale, scale);
  
      //Normalize Position
      mesh.position.set(0,0,0);
    }
  });
    
  
//Aframe Components
import './components/materialMod'
import './components/autoscale'
import './components/materials'


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
    url: {type:'string'}
  },
  init: function () {

    getTokenInfo(this.data.url).then((response) => {  
      let id = response.artifact_uri
      this.el.setAttribute('src','https://cloudflare-ipfs.com/ipfs/'+ id.slice(7,id.length))
    }).catch((response) => { 
        
    })

    this.metalMap = {}
    this.roughMap = {}

    this.prepareMap.bind(this)
    this.traverseMesh.bind(this)

    this.el.addEventListener('model-loaded', evt => 
     {
      this.prepareMap()
      this.update()
    });
  },
  prepareMap: function() {
    this.traverseMesh(node => {
        this.roughMap[node.uuid] = node.material.roughness
        this.metalMap[node.uuid] = node.material.metalness
    })
  },
  update: function () {
    this.traverseMesh(node => {
  
      node.material.metalness = this.metalMap[node.uuid]
      node.material.roughness = this.roughMap[node.uuid] 
      
      if(!node.material.envMapIntensity==1){
       this.el.removeAttribute('cube-env-map');
      }
        
    })
  },
  traverseMesh: function(func) {
    var mesh = this.el.getObject3D('mesh');
    if (!mesh) { return; }
     mesh.traverse(node => {
      if (node.isMesh) {
        func(node)
      }
    }); 
  }
});
  

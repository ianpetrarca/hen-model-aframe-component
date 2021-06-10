//Aframe Components
import './components/materialMod'
import './components/autoscale'
import './components/materials'

AFRAME.registerComponent('hen', {
  schema: {
    opacity: {type: 'number', default: 1}
  },
  init: function () {
    this.metalMap = {}
    this.roughMap = {}
    this.nameMap = {}
    this.prepareMap.bind(this)
    this.traverseMesh.bind(this)

    this.el.addEventListener('model-loaded', e=> 
     {
      console.log(e)
      console.log("model-loaded")
      this.prepareMap()
      this.update()
    });
  },
  prepareMap: function() {
    this.traverseMesh(node => {
        this.roughMap[node.uuid] = node.material.roughness
        this.metalMap[node.uuid] = node.material.metalness
        this.nameMap[node.uuid] = node.material.name
    })
  },
  update: function () {
    let cubemap = ''
    this.traverseMesh(node => {
      
      node.material.metalness = this.metalMap[node.uuid]
      node.material.roughness = this.roughMap[node.uuid] 
      
      if(node.material.envMapIntensity==1){

      } else {
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
  

AFRAME.registerComponent('autoscale', {
    schema: {type: 'number', default: 1},
    init: function () {
      this.scale();
      this.el.addEventListener('object3dset', () => this.scale());
    },
    scale: function () {
      const el = this.el;
      const span = this.data;
      const mesh = el.getObject3D('mesh');
  
      if (!mesh) return;
  
      // Compute bounds.
      const bbox = new THREE.Box3().setFromObject(mesh);
  
      // Normalize scale.
      const scale = span / bbox.getSize().length();
      mesh.scale.set(scale, scale, scale);
  
  
    }
  });
//ASYNC REST API REQUEST
async function getTokenInfo(id){
    try {
        const res = await axios.get('https://api.better-call.dev/v1/tokens/mainnet/metadata?token_id=' + id.toString())
        return res.data[0]
    } catch (error) {
        return null
    }
}

//HEN 3D MODEL COMPONENT
AFRAME.registerComponent("hen-model", {
  multiple: true,
  schema: {
      // material name
      url: {type:'string'},
      // opacity value
      opacity: { type: 'string' },
      // roughness value
      roughness: { type: 'string' },
      // metalness value
      metalness: { type: 'string' },

  },
  init: function () {

        //Get Metadata then insert API response
        getTokenInfo(this.data.url).then((response) => {  
            let id = response.artifact_uri
            this.el.setAttribute('src','https://cloudflare-ipfs.com/ipfs/'+ id.slice(7,id.length))
        }).catch((response) => { 
            
        })
      
      // binds
      this.onModelLoaded = this.onModelLoaded.bind(this);

      // maybe the model is already loaded
      var gltfcomponent = this.el.components["gltf-model"];
      this.model = gltfcomponent.model;
      if (this.model) {
          this.applyModifiers();
      } else {
          this.el.addEventListener("model-loaded", this.onModelLoaded);
      }
  },
  update: function (oldData) {
      this.changes = AFRAME.utils.diff(oldData, this.data);
      // apply changes if there are any
      if (this.changes && this.model)
          this.applyModifiers();
  },
  onModelLoaded: function () {
      this.applyModifiers();
  },
  // assume the model is loaded
  grabMaterial: function () {
      const mesh = this.el.getObject3D("mesh");
      if (!mesh) {
          console.warn("No mesh found.")
          return
      }
      this.model = mesh;
      mesh.traverse(node => {
          if (!node.material || this.material) return;
          if (this.id) {
              if (this.id.toLowerCase() === node.material.name.toLowerCase()) {
                  this.material = node.material
                   
              }
              return;
          }
          this.material = node.material;
      
      });
  },
  applyModifiers: function () {
      if (!this.changes) return;
      if (!this.material) this.grabMaterial();
      // any change that isn't empty is appliable
      for (let attribute in this.changes) {
          var value = this.changes[attribute].toString();
          if (value === "")
              continue;

          // quick hack for "color" attributes
          if (value.includes("#"))
              value = value.replace("#", "0x");
          if (value.includes("0x")) {
              this.material[attribute].setHex(value)
              continue;
          }
          // fog - three states. no changes, 'true', or 'false'
          if (attribute === "fog" && value.length) {
              this.material.fog = value.toLowerCase() === "true" ? true : false;
              continue;
          }

          // opacity goes in pair with transparency
          if (attribute === "opacity") {
              this.material.transparent = true;
          }

          // quick hack for numeric attributes
          if (!isNaN(value)) {
              var num = parseFloat(value)
              this.material[attribute] = num;
              continue;
          }
      }
      this.material.needsUpdate = true;
  },
  remove: function () {
      this.el.removeEventListener("model-loaded", this.onModelLoaded);
  }
})

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://user-images.githubusercontent.com/1003196/122152405-3d2bd680-ce2f-11eb-9937-b3951e2451ad.gif">  |  <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://user-images.githubusercontent.com/1003196/122152411-3f8e3080-ce2f-11eb-9aa5-6ba24913c7bb.gif">|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://user-images.githubusercontent.com/1003196/122152418-4321b780-ce2f-11eb-83e0-17a77191f08a.gif">|


# Hic et nunc 3D Model Aframe Component

### Use 3D Models from [hic et nunc](hicetnunc.xyz/) in your Aframe WebXR Scenes!
#### hic et nunc is a decentralized NFT marketplace built on the Tezos blockchain. This Github repo is a guide for using user-created 3D Models in WebXR experiences using [Aframe](https://aframe.io).

####

This component is added to GLTF model Aframe entity 
```html
      <a-gltf-model hen-model="scale:3;
                    animated:true;
                    reflection:true;
                    url:https://www.hicetnunc.xyz/objkt/128211" 
                    position="0 1 -3">
      </a-gltf-model>

```

#### Code Examples

- [Glitch.me Example](https://glitch.com/edit/#!/hen-model-aframe-component) 

#### Using the Component 

Axios and Regenerator Runtime are required to use the API portion of this component**

```html
<html lang="en">

  <head>
    <title>Aframe Hen Components</title>
    
    <!--  API Scripts    -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> 
    <script src="https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.7/runtime.min.js"></script>
    
    <!--  Aframe and Aframe Extras Library    -->
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.min.js"></script>
    
    <!--  Hen-Aframe Component Hosted on CDN    -->
    
    <script src="https://storage.googleapis.com/titanpointe/hen.js"></script>
    
  </head>
   
  <body>
  
    <!--  Aframe Scene with color management and high refresh rate enabled  -->
    <a-scene renderer="antialias: true;colorManagement: true;physicallyCorrectLights: true;highRefreshRate:true">
  
      <!-- Camera, Lighting and Sky -->
      <a-entity light="type: ambient; color: #BBB;intensity:1"></a-entity>
      <a-entity light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1"></a-entity>
      <a-camera position="0 1.6 0" look-controls="pointerLockEnabled:true" fov="50"></a-camera>
      <a-sky color="black"></a-sky>
      
      <!-- Hen-3D Component       -->
      <a-gltf-model hen-model="scale:3;animated:true;reflection:true;url:https://www.hicetnunc.xyz/objkt/128211" 
      position="0 1 -3"> </a-gltf-model>

      </a-scene>
      
  </body>

</html>
```

#### Component Schema
| Name | Function | Type | Default |
| :---         |     :---:      |          ---: |      ---: | 
| URL   | hic et nunc URL or OBJKT ID     | String    |       |
| Reflection     | Adds Cubemap Reflection      | Boolean      | True      |
| Scale     | Scale of Model     | Number      | 1      |
| Animated     | Enable Model Animation    | Boolean      | True      |


#### Hic et nunc Resources
- [Hic et nunc Tools](hicetnunc.tools/)
- [Hic et nunc Discord](https://discord.gg/g7VQt5pJ)
- [Hic et nunc Github](https://github.com/hicetnunc2000/)

# hic et nunc
*here and now* 

### What is Hic Et Nunc?


[Hic et nunc](hicetnunc.xyz/) is a decentralized NFT marketplace built on the Tezos blockchain. It enables users to create, sell and interact with Tezos NFTs called OBJKTS. Each OBJKT holds a single artwork containing a 3d model, image, video, html snippet, glsl shader, etc. Hic et nunc lets creators limit how many digital versions of their work are in existence.

When a user uploads their content to hic et nunc, the actual file is uploaded to [IPFS](https://ipfs.io/), a decentralized storage network. The other metadata is stored in the Tezos blockchain. 

# Contact
Created by [@ianpetrarca](https://www.twitter.com/ianpetrarca) - tz1LobSdhfUqYpMojXWHQLJPhFLEzUEd9JAn

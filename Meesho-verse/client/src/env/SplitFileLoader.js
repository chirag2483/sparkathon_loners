class SplitFileLoader {
  constructor(baseUrl, animationList, scale) {
    this.baseUrl = baseUrl;
    this.animationList = animationList;
    this.scale = scale;
    this.loader = new THREE.FBXLoader();
  }

  async reconstructFile(parts) {
    const chunks = [];
    
    // Load all parts
    for (const part of parts) {
      const response = await fetch(part);
      const arrayBuffer = await response.arrayBuffer();
      chunks.push(new Uint8Array(arrayBuffer));
    }
    
    // Calculate total size
    const totalSize = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    
    // Combine chunks
    const combined = new Uint8Array(totalSize);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }
    
    return combined.buffer;
  }

  async loadModel(modelParts) {
    try {
      // Reconstruct the original file
      const fileBuffer = await this.reconstructFile(modelParts);
      
      // Create a blob URL for the reconstructed file
      const blob = new Blob([fileBuffer]);
      const url = URL.createObjectURL(blob);
      
      // Load using FBXLoader
      return new Promise((resolve, reject) => {
        this.loader.load(url, (object) => {
          object.scale.set(this.scale, this.scale, this.scale);
          object.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          object.castShadow = true;
          object.receiveShadow = true;
          
          // Clean up the blob URL
          URL.revokeObjectURL(url);
          resolve(object);
        }, undefined, reject);
      });
    } catch (error) {
      console.error('Error loading split model:', error);
      throw error;
    }
  }

  async loadAnimations() {
    const animations = [];
    
    for (let i = 0; i < this.animationList.length; i++) {
      const animationUrl = this.animationList[i];
      try {
        const object = await new Promise((resolve, reject) => {
          this.loader.load(animationUrl, (obj) => {
            obj.scale.set(this.scale, this.scale, this.scale);
            resolve(obj);
          }, undefined, reject);
        });
        
        if (object.animations && object.animations.length > 0) {
          animations[i] = object.animations[0];
        }
      } catch (error) {
        console.warn(`Failed to load animation ${animationUrl}:`, error);
      }
    }
    
    return animations;
  }

  async getModel() {
    // Load model and animations in parallel
    const [model, animations] = await Promise.all([
      this.loadModel(this.baseUrl),
      this.loadAnimations()
    ]);
    
    // Attach animations to model
    if (animations.length > 0) {
      model.animations = animations;
    }
    
    return model;
  }
}

export default SplitFileLoader; 
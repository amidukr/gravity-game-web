# Overview

This page provides an overview for two appraoches to resolve z-fight issue

# Approaches

## Logarithm based depth


https://threejs.org/docs/#api/en/renderers/WebGLRenderer.depth


```typescript
    new GameEngineThreeJsRenderer({
            webGlRenderingParameters: {
            antialias: true,
            //preserveDrawingBuffer: true,
            logarithmicDepthBuffer: true
            },
        })
```

## Multi-frustum rendering

Render same scene multiple times with difference near/far plane settings

```typescript
new GameEngineThreeJsRenderer({
            webGlRenderingParameters: {
            antialias: true,
            preserveDrawingBuffer: true,
            //logarithmicDepthBuffer: true
            },
        })
```

```typescript
    const threeJsRenderer = this.engineRenderer.getThreeJsWebGlRenderer();

    threeJsRenderer.autoClear = false;

    const vec = threeJsRenderer.getSize(new Vector2());
    this.camera.aspect = vec.x / vec.y;


    this.scene.background = this.gameLevel.object.backhroundTexture;
    this.camera.near = 1;
    this.camera.far = 1000;
    this.camera.updateProjectionMatrix();

    threeJsRenderer.clearDepth();
    threeJsRenderer.render(this.scene, this.camera);

    this.scene.background = null;
    this.camera.near = 0.000001;
    this.camera.far = 1.1;
    this.camera.updateProjectionMatrix();

    threeJsRenderer.clearDepth()
    threeJsRenderer.render(this.scene, this.camera);
```

# Performance Test

1. Enable 
[Performance Test](./stress-load.md)

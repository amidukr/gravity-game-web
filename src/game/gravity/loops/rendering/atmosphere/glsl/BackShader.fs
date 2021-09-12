#version 300 es
precision highp float;
in vec3 cameraPosition;

out vec4 fragColor;

#define gl_FragColor  fragColor
// #cut-beffore

precision highp float;


in vec3 _position;

uniform vec3 planetCenter;
uniform float planetRadius;

uniform vec3 starPosition;

uniform float atmosphereHeight;
uniform vec3 atmosphereColor;
uniform float atmosphereInvisibleDepth;


const float sunFactorThreshold = -1.0;

//const vec3 scatteringFactorThreshold = vec3(0.0, -1.0, -2.0);
const vec3 scatteringFactorThreshold = vec3(0.0, -0.4, -2.0);
const vec3 absorbtionFactorThreshold = vec3(0.1, 0.2, 0.3);
const vec3 inverseAbsorbtionFactorThreshold = vec3(1.,1.,1.) - absorbtionFactorThreshold;

float[2] raySphereIntersect(vec3 r0, vec3 rd, vec3 s0, float sr) {
    // - r0: ray origin
    // - rd: normalized ray direction
    // - s0: sphere center
    // - sr: sphere radius
    // - Returns distance from r0 to first intersecion with sphere,
    //   or -1.0 if no intersection.
    float a = dot(rd, rd);
    vec3 s0_r0 = r0 - s0;
    float b = 2.0 * dot(rd, s0_r0);
    float c = dot(s0_r0, s0_r0) - (sr * sr);

    float det =  sqrt((b*b) - 4.0*a*c);

    return float[2]( 
        (-b - det)/(2.0*a),
        (-b + det)/(2.0*a)
    );
}

float trimFloat(float value) {
    return min(1.0, max(0.0, value));
} 

float discrete(float value) {
    return floor(value * 10.0) / 10.0;
}

vec3 discrete(vec3 value) {
    return floor(value * 10.0) / 10.0;
}

vec3 factor2rgb(float value) {
    if(value > 1.0) {
        return vec3(0., 0., 1.);
    }

    if(value < 0.0) {
        return vec3(1., 0., 0.);
    }

    return vec3(floor(value * 10.0) / 10.0);
}

vec3 colorOverbound(vec3 color) {
    if(color.r > 1.0) {
        return vec3(1.0, 0.0, 0.0);
    }

    if(color.g > 1.0) {
        return vec3(0.0, 1.0, 0.0);
    }

    if(color.g > 1.0) {
        return vec3(0.0, 0.0, 1.0);
    }

    if(color.r < 0.0) {
        return vec3(1.0, 0.0, 1.0);
    }

    if(color.g < 0.0) {
        return vec3(1.0, 1.0, 0.0);
    }

    if(color.g < 0.0) {
        return vec3(0.0, 1.0, 1.0);
    }

    return discrete(vec3( (color.r + color.g + color.b) / 3.0 ));
}

void main()	{
    
    vec3 cameraToSurface = _position - cameraPosition;
    vec3 surfaceToCore = planetCenter - _position;
    vec3 cameraToCore = cameraPosition - planetCenter;
    vec3 surfaceToStar = starPosition - _position;
    vec3 coreToStar = starPosition - planetCenter;

    vec3 cameraToSurfaceNormalized = normalize(cameraToSurface);
    vec3 surfaceToCoreNormalized = normalize(surfaceToCore);
    vec3 starToSurfaceNormalized = normalize(_position - starPosition);
    vec3 surfaceToStarNormalized = normalize(surfaceToStar);
    vec3 coreToStarNormalized = normalize(coreToStar);
    

    float distanceToSurface = length(cameraToSurface);
    float distanceToCore = length(cameraToCore);
    float cameraAltitude = distanceToCore - length(surfaceToCore);
    float[2] distance = raySphereIntersect(cameraPosition, cameraToSurfaceNormalized, planetCenter, planetRadius + atmosphereHeight);

    if(distance[0] < 0.0) {
        distance[0] = 0.0;
    }

    // atmosphere ray
    float distanceThroughAtmosphere = distance[1] - distance[0];
    //float atmosphereDensityFactor = distanceThroughAtmosphere / atmosphereHeight / 13.0;
    float atmosphereDensityFactor =  distanceThroughAtmosphere / atmosphereHeight / 13.0;

    vec3 startPoint = cameraPosition + cameraToSurfaceNormalized * distance[0];
    vec3 endPoint = cameraPosition + cameraToSurfaceNormalized * distance[1];
    vec3 middlePoint = (startPoint + endPoint) * 0.5;

    vec3 coreToMiddlePoint = middlePoint - planetCenter;
    vec3 coreToMiddlePointNormalized = normalize(coreToMiddlePoint);

    float altitude = length(middlePoint) - planetRadius;
    float altitudeFactor = trimFloat(altitude / atmosphereHeight);

    //float timeOfDay = (dot(coreToMiddlePointNormalized, coreToStarNormalized) + 1.0) / 2.0;
    const float nightAt = -0.8; 
    float timeOfDay =trimFloat((dot(coreToMiddlePointNormalized, coreToStarNormalized) - nightAt) / (1.0 - nightAt));

    // scattering
    float cameraFactor = dot(cameraToSurfaceNormalized, surfaceToStarNormalized);
    vec3 scatteringFactor = max(vec3(0.,0.,0.), (cameraFactor * vec3(1.,1.,1.) - scatteringFactorThreshold) / ( vec3(1.,1.,1.) - scatteringFactorThreshold ));
    

    float atmosphereDensityExpSteepness = 100.0;
    float atmosphereDensityFactorExp = (pow(atmosphereDensityExpSteepness, atmosphereDensityFactor) - 1.0) / (atmosphereDensityExpSteepness - 1.0);

    //float redAborbtionFactor 

    // DEBUG
    gl_FragColor.rgb = vec3(0.0, 0.0, 0.0);
    //--------

    //BEST  
    //gl_FragColor.rgb = vec3(
    //    scatteringFactor.r * timeOfDay * (1.0 - atmosphereDensityFactorExp * 0.15), 
    //    scatteringFactor.g * timeOfDay * (1.0 - atmosphereDensityFactorExp * 0.6), 
    //    scatteringFactor.b * timeOfDay * 2.0 * (1.0 - atmosphereDensityFactorExp * 0.95) 
    // );

    //gl_FragColor.rgb = factor2rgb(cameraFactor);
    //gl_FragColor.rgb = colorOverbound(cameraFactor);
    //gl_FragColor.rgb = factor2rgb(scatteringFactor.r);

    //gl_FragColor.rgb = factor2rgb(timeOfDay);
    gl_FragColor.rgb = factor2rgb(atmosphereDensityFactorExp);
    //gl_FragColor.rgb = factor2rgb(1.0 - atmosphereDensityFactor);

    //gl_FragColor.rgb = discrete(scatteringFactor * timeOfDay);
    
    //gl_FragColor.rgb = discrete(vec3(0., 0., scatteringFactor.b));

    //gl_FragColor.rgb = discrete(vec3(0.0, 0.0,scatteringFactor.b * timeOfDay * (1.0 - atmosphereDensityFactorExp * timeOfDay) ));

    //gl_FragColor.rgb = factor2rgb(scatteringFactor);

    //float startfillHorizonWithScatteringAt = 0.52;
    float startfillHorizonWithScatteringAt = 0.3;
    float densityTimeOfDay =  1.0 - max(0.0, (timeOfDay  - startfillHorizonWithScatteringAt)) / (1.0 - startfillHorizonWithScatteringAt);

    densityTimeOfDay = (pow(0.05, densityTimeOfDay) - 1.0) / (0.05 - 1.0);
    
    gl_FragColor.rgb = vec3(
        scatteringFactor.r * timeOfDay * 1.0 * (1.0 - atmosphereDensityFactor * (0.00)), 
        scatteringFactor.g * timeOfDay * 1.2 * (1.0 - atmosphereDensityFactor * 0.6), 
        scatteringFactor.b * timeOfDay * 2.0 * (1.0 - atmosphereDensityFactor * 0.95  * densityTimeOfDay )
    );

    ///gl_FragColor.a = 0.9;
    //gl_FragColor.a = min(0.9, (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) * 3.0) + atmosphereDensityFactorExp;
       
        
    gl_FragColor.a = min(0.9, (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) * 3.0);
    float maxChannel = max(max(gl_FragColor.r, gl_FragColor.g), gl_FragColor.b);
    gl_FragColor.rgb *= timeOfDay/maxChannel;

    //gl_FragColor.a = atmosphereDensityFactorExp;

    //gl_FragColor.a = atmosphereDensityFactorExp * 2.0 * (timeOfDay + 0.8) / 1.8;

    // gl_FragColor.rgb = factor2rgb(scatteringFactor.r * timeOfDay * (1.0 - atmosphereDensityFactor * 0.1));

    //gl_FragColor.a = maxChannel + atmosphereDensityFactorExp * 2.0;

    //gl_FragColor.a = 1.0;
}
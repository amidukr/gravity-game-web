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

float clampToOne(float value) {
    return clamp(value, 0.0, 1.0);
}

float expSteepness(float value, float steepness) {
    return steepness == 1.0 ? value : (pow(steepness, value) - 1.0) / (steepness - 1.0);
}

float discrete(float value) {
    return floor(value * 10.0) / 10.0;
}

vec3 discrete(vec3 value) {
    return floor(value * 10.0) / 10.0;
}

vec4 factor2rgb(float value) {
    if(value == 1.0) {
        return vec4(0.7, 0.7, 1., 0.90);
    }

    if(value == 0.0) {
        return vec4(0.15, 0.0, 0.0, 0.90);
    }

    if(value > 1.0) {
        return vec4(0., 0., 1., 0.90);
    }

    if(value < 0.0) {
        return vec4(1., 0., 0., 0.90);
    }

    vec4 result = vec4(floor(value * 10.0) / 10.0);
    result.w = 0.90;
    return result;
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

float changeScale(float value, float srcFrom, float srcTo, float dstFrom, float dstTo)  {
    return (dstTo - dstFrom) *(value - srcFrom) / (srcTo - srcFrom) + dstFrom;
}

void main()	{

    // TODO: extract to uniform and pre-compute in code
    float pra =  planetRadius + atmosphereHeight;
    float horizontalMaxDistance = 2.0 * sqrt(pra*pra - planetRadius*planetRadius);

    // CODE
    
    vec3 cameraToSurface = _position - cameraPosition;
    vec3 surfaceToCore = planetCenter - _position;
    vec3 cameraToCore = planetCenter - cameraPosition;
    vec3 surfaceToStar = starPosition - _position;
    vec3 coreToStar = starPosition - planetCenter;

    vec3 cameraToSurfaceNormalized = normalize(cameraToSurface);
    vec3 surfaceToCoreNormalized = normalize(surfaceToCore);
    vec3 starToSurfaceNormalized = normalize(_position - starPosition);
    vec3 surfaceToStarNormalized = normalize(surfaceToStar);
    vec3 coreToStarNormalized = normalize(coreToStar);
    vec3 cameraToCoreNormalized = normalize(cameraToCore);
    

    
    float innerSpeherFactor = (1.0 -dot(cameraToSurfaceNormalized, surfaceToCoreNormalized)) / 2.0;

    float lookDownUp = -dot(cameraToSurfaceNormalized, cameraToCoreNormalized);
    float lookUp = clamp(lookDownUp, 0.0, 1.0);
    //float lookDown = clamp(-lookDownUp, 0.0, 1.0;
    //float lookHorizon = abs(1.0 - lookDownUp);
    

    float distanceToSurface = length(cameraToSurface);
    float distanceToCore = length(cameraToCore);
    float cameraAltitude = distanceToCore - length(surfaceToCore);
    float[2] atmosphereDistance = raySphereIntersect(cameraPosition, cameraToSurfaceNormalized, planetCenter, planetRadius + atmosphereHeight);

    float[2] planetDistance = raySphereIntersect(cameraPosition, cameraToSurfaceNormalized, planetCenter, planetRadius);

    atmosphereDistance[0] = max(0.0, atmosphereDistance[0]);

    if(planetDistance[0] > 0.0) {
        atmosphereDistance[1] = min(atmosphereDistance[1], planetDistance[0]);
    }

    vec3 startPoint = cameraPosition + cameraToSurfaceNormalized * atmosphereDistance[0];
    vec3 endPoint = cameraPosition + cameraToSurfaceNormalized * atmosphereDistance[1];
    vec3 middlePoint = (startPoint + endPoint) * 0.5;

    vec3 coreToMiddlePoint = middlePoint - planetCenter;
    vec3 coreToMiddlePointNormalized = normalize(coreToMiddlePoint);

    float altitude = length(middlePoint) - planetRadius;
    float altitudeFactor = clampToOne(altitude / atmosphereHeight);

    // atmosphere ray
    float distanceThroughAtmosphere = atmosphereDistance[1] - atmosphereDistance[0];
    //float atmosphereDensityFactor = distanceThroughAtmosphere / atmosphereHeight / 13.0;

    float invisibleDistance = atmosphereHeight / 3.0;
    if(innerSpeherFactor < 0.5) {
        //invisibleDistance = invisibleDistance * changeScale(innerSpeherFactor, 0.5, 0.0, 1.0, 100.0); 
    }

    float atmosphereDensityFactor =  distanceThroughAtmosphere / invisibleDistance;
    if(innerSpeherFactor < 0.5) {
        atmosphereDensityFactor *= innerSpeherFactor * 0.01;
        //atmosphereDensityFactor *= innerSpeherFactor * 0.1 * min(2.0, pow(distanceToSurface/ atmosphereHeight, 0.35) ); 
    }

    atmosphereDensityFactor *= 2.0 * pow((1.0 - altitudeFactor), 2.0) * pow(10.0, 1.0);

    //float timeOfDay = (dot(coreToMiddlePointNormalized, coreToStarNormalized) + 1.0) / 2.0;
    const float nightAt = -0.8; 
    float timeOfDay = clampToOne((dot(coreToMiddlePointNormalized, coreToStarNormalized) - nightAt) / (1.0 - nightAt));

    // scattering
    float cameraFactor = dot(cameraToSurfaceNormalized, surfaceToStarNormalized);
    vec3 scatteringFactor = max(vec3(0.,0.,0.), (cameraFactor * vec3(1.,1.,1.) - scatteringFactorThreshold) / ( vec3(1.,1.,1.) - scatteringFactorThreshold ));
    

    float atmosphereDensityExpSteepness = 10.0;
    float atmosphereDensityFactorExp = (pow(atmosphereDensityExpSteepness, atmosphereDensityFactor) - 1.0) / (atmosphereDensityExpSteepness - 1.0);

    float planetDitanceFactor = 1.0;
    if(planetDistance[0] > 0.0) {
        planetDitanceFactor = max(0.0, min(1.0, planetDistance[0] / (atmosphereHeight)));
    }

    

    

    


    float horizontalDistanceFactor = clampToOne(2.0 * distanceThroughAtmosphere / horizontalMaxDistance);
    float horizontalDensityFactor = clampToOne(1.2 * (1.0 - altitudeFactor) * horizontalDistanceFactor);
    float planetDistanceFactorNonNormalized = (distanceToCore - planetRadius - atmosphereHeight)/atmosphereHeight;
    float planetDistanceFactor = clampToOne(planetDistanceFactorNonNormalized / 3.0);
    float planetDistanceFactorExp = pow(0.0001, 1.0 - planetDistanceFactor);
    float horizontalDensityFactorExp = clampToOne(expSteepness(horizontalDensityFactor, planetDistanceFactorExp));

    float alfaDistanceFactor = clampToOne( -2.0 * planetDistanceFactorNonNormalized );
    
    float alfa = horizontalDensityFactorExp * ( alfaDistanceFactor * 2.0  + 1.0 ) * timeOfDay;

    
    gl_FragColor.rgb = vec3(0., 0., 1.);
    gl_FragColor.a = alfa;
    
    // RGB Calculation

    float startfillHorizonWithScatteringAt = 0.3;
    float densityTimeOfDay =  1.0 - max(0.0, (timeOfDay  - startfillHorizonWithScatteringAt)) / (1.0 - startfillHorizonWithScatteringAt);

    densityTimeOfDay = (pow(0.05, densityTimeOfDay) - 1.0) / (0.05 - 1.0);

    scatteringFactor += densityTimeOfDay * 1.0 * pow(scatteringFactor * vec3(1.0, 0.5, 0.0), vec3(50.0));

    gl_FragColor.rgb = vec3(
        scatteringFactor.r * timeOfDay * 1.0 * (1.0 - horizontalDensityFactor * (0.15)), 
        scatteringFactor.g * timeOfDay * 1.0 * (1.0 - horizontalDensityFactor * 0.45), 
        scatteringFactor.b * timeOfDay * 2.0 * (1.0 - horizontalDensityFactor * 0.7  * densityTimeOfDay )
    );

    //gl_FragColor.a = min(0.9, (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) * 3.0);
    float maxChannel = max(max(gl_FragColor.r, gl_FragColor.g), gl_FragColor.b);
    gl_FragColor.rgb *= timeOfDay/maxChannel;

    
    //gl_FragColor = factor2rgb(horizontalDensityFactor);

    //gl_FragColor.rgb = vec3(0.);
    //gl_FragColor.rgb = mix(vec3(0., 0.0, 1.0), vec3(1.0, 0.0, 0.0), (1.0 - densityTimeOfDay) * horizontalDensityFactor*0.5);
}

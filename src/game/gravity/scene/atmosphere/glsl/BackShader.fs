#version 300 es
precision highp float;
in vec3 cameraPosition;

out vec4 fragColor;

#define gl_FragColor  fragColor

#pragma cut-beffore


precision highp float;


in vec3 _position;

uniform vec3 planetCenter;
uniform float planetRadius;

uniform vec3 starPosition;

uniform float atmosphereHeight;

const vec3 scatteringFactorThreshold = vec3(0.0, -0.4, -2.0);

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

float calculateAltitudeFactor(float atmosphereHeight, vec3 planetCenter, vec3 point) {
    vec3 coreToMiddlePoint = point - planetCenter;
    vec3 coreToMiddlePointNormalized = normalize(coreToMiddlePoint);

    float altitude = length(coreToMiddlePoint) - planetRadius;
    float altitudeFactor = clampToOne( altitude / atmosphereHeight);

    altitudeFactor = expSteepness(altitudeFactor, 0.05);

    altitudeFactor = 1.0  - altitudeFactor;

    return altitudeFactor;
}

void main()	{
    
    vec3 cameraToCore = planetCenter - cameraPosition;
    float distanceToCore = length(cameraToCore);

    float atmosphereExtraHeightFactor = distanceToCore / planetRadius;
    atmosphereExtraHeightFactor = clampToOne((atmosphereExtraHeightFactor - 8.0)/40.0);

    float atmosphereHeightAdjusted = atmosphereHeight * (7.0 * atmosphereExtraHeightFactor + 1.0);

    float pra =  planetRadius + atmosphereHeightAdjusted;
    float horizontalMaxDistance = 2.0 * sqrt(pra*pra - planetRadius*planetRadius);

    // CODE
    
    vec3 cameraToSurface = _position - cameraPosition;
    vec3 surfaceToCore = planetCenter - _position;
    
    vec3 surfaceToStar = starPosition - _position;
    vec3 coreToStar = starPosition - planetCenter;

    vec3 cameraToSurfaceNormalized = normalize(cameraToSurface);
    vec3 surfaceToStarNormalized = normalize(surfaceToStar);
    vec3 coreToStarNormalized = normalize(coreToStar);

    
    float[2] atmosphereDistance = raySphereIntersect(cameraPosition, cameraToSurfaceNormalized, planetCenter, planetRadius + atmosphereHeightAdjusted);

    atmosphereDistance[0] = max(0.0, atmosphereDistance[0]);

    vec3 startPoint = cameraPosition + cameraToSurfaceNormalized * atmosphereDistance[0];
    vec3 endPoint = cameraPosition + cameraToSurfaceNormalized * atmosphereDistance[1];
    vec3 middlePoint = (startPoint + endPoint) * 0.5;

    vec3 coreToMiddlePoint = middlePoint - planetCenter;
    vec3 coreToMiddlePointNormalized = normalize(coreToMiddlePoint);

    float altitudeSartFactor = calculateAltitudeFactor(atmosphereHeightAdjusted, planetCenter, startPoint);
    float altitudeMiddleFactor = calculateAltitudeFactor(atmosphereHeightAdjusted, planetCenter, middlePoint);
    float altitudeEndFactor = calculateAltitudeFactor(atmosphereHeightAdjusted, planetCenter, endPoint);

    float altitudeFactor = clampToOne((altitudeSartFactor + altitudeMiddleFactor + altitudeEndFactor) / 1.1);

    float distanceThroughAtmosphere = atmosphereDistance[1] - atmosphereDistance[0];
    
    const float nightAt = -0.8; 
    float timeOfDay = clampToOne((dot(coreToMiddlePointNormalized, coreToStarNormalized) - nightAt) / (1.0 - nightAt));

    // scattering
    float starFactor = dot(cameraToSurfaceNormalized, surfaceToStarNormalized);
    vec3 scatteringFactor = max(vec3(0.), (starFactor * vec3(1.) - scatteringFactorThreshold) / ( vec3(1.) - scatteringFactorThreshold ));


    float horizontalDistanceFactor = clampToOne(15.0 * distanceThroughAtmosphere / horizontalMaxDistance);
    float horizontalDensityFactor = clampToOne(altitudeFactor * horizontalDistanceFactor);
    float horizontalDensityFactorExp = horizontalDensityFactor;

    float alfa = 4.0 * horizontalDensityFactorExp * timeOfDay;

    gl_FragColor.a = alfa;

    gl_FragColor.a = clamp(gl_FragColor.a, 0., 1.) * clamp(400.5 - starFactor *400.0, 0.5, 1.0);
    
    // RGB Calculation

    float startfillHorizonWithScatteringAt = 0.3;
    float densityTimeOfDay =  1.0 - max(0.0, (timeOfDay  - startfillHorizonWithScatteringAt)) / (1.0 - startfillHorizonWithScatteringAt);

    densityTimeOfDay = (pow(0.05, densityTimeOfDay) - 1.0) / (0.05 - 1.0);

    scatteringFactor += densityTimeOfDay * 1.0 * pow(scatteringFactor * vec3(1.0, 0.5, 0.0), vec3(50.0));

    float horizontalDensityFactorForColor = expSteepness(horizontalDensityFactor*1.0 , 20.0);

    gl_FragColor.rgb = vec3(
        scatteringFactor.r * timeOfDay * 1.0 * (1.0 - horizontalDensityFactorForColor * (0.20)), 
        scatteringFactor.g * timeOfDay * 1.0 * (1.0 - horizontalDensityFactorForColor * 0.45), 
        scatteringFactor.b * timeOfDay * 2.0 * (1.0 - horizontalDensityFactorForColor * 0.7  * densityTimeOfDay )
    );
    
    float maxChannel = max(max(gl_FragColor.r, gl_FragColor.g), gl_FragColor.b);
    gl_FragColor.rgb *= 2.0 * timeOfDay/maxChannel * (1.0-(1.0 - timeOfDay));
}

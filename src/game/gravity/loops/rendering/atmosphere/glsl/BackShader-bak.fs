precision highp float;

in vec3 _position;

uniform vec3 planetCenter;
uniform float planetRadius;

uniform vec3 starPosition;

uniform float atmosphereHeight;
uniform vec3 atmosphereColor;
uniform float atmosphereInvisibleDepth;


const float sunFactorThreshold = -1.0;

const vec3 scatteringFactorThreshold = vec3(0.0, -1.0, -2.0);
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

float getFactorThroughAtmosphere(float[2] atmosphereIntersection, vec3 cameraToSurfaceNormalized) {
    float startPointDistance = atmosphereIntersection[0];
    float endPointDistance = atmosphereIntersection[1];

    if(startPointDistance < 0.0) {
        startPointDistance = 0.0;
    }

    vec3 startPoint = cameraPosition + cameraToSurfaceNormalized * startPointDistance;
    vec3 endPoint = cameraPosition + cameraToSurfaceNormalized * endPointDistance;


    float startAltitude = length(startPoint);
    float endAltitude = length(endPoint);

    //float avgAltitued = (startAltitude + endAltitude) / 2.0 - planetRadius * 1.03;
    float avgAltitued = length(0.5*(startPoint  + endPoint) - planetCenter) - planetRadius;

    //return (endPointDistance - startPointDistance);
    return max(0.0, min(1.0, (1.0 - avgAltitued / atmosphereHeight) * (endPointDistance - startPointDistance) / atmosphereInvisibleDepth));
}

void main()	{
    
    
    vec3 cameraToSurface = _position - cameraPosition;
    vec3 surfaceToCore = planetCenter - _position;
    vec3 cameraToCore = cameraPosition - planetCenter;
    vec3 surfaceToStar = starPosition - _position;

    vec3 cameraToSurfaceNormalized = normalize(cameraToSurface);
    vec3 surfaceToCoreNormalized = normalize(surfaceToCore);
    vec3 starToSurfaceNormalized = normalize(_position - starPosition);
    vec3 surfaceToStarNormalized = normalize(surfaceToStar);
    

    float distanceToSurface = length(cameraToSurface);
    float distanceToCore = length(cameraToCore);
    float cameraAltitude = distanceToCore - length(surfaceToCore);
    float[2] atmosphereIntersection = raySphereIntersect(cameraPosition, cameraToSurfaceNormalized, planetCenter, planetRadius + atmosphereHeight);

    float factorThroughAtmosphere = getFactorThroughAtmosphere(atmosphereIntersection, cameraToSurfaceNormalized);
    
    float sunFactor = dot(starToSurfaceNormalized, surfaceToCoreNormalized);
    float cameraFactor = dot(cameraToSurfaceNormalized, surfaceToStarNormalized);

    sunFactor = sunFactor - sunFactorThreshold;

    vec3 scatteringFactor = max(vec3(0.,0.,0.), (cameraFactor * vec3(1.,1.,1.) - scatteringFactorThreshold) / ( vec3(1.,1.,1.) - scatteringFactorThreshold ));
    vec3 absorbtionFactor = max(vec3(0.,0.,0.), (inverseAbsorbtionFactorThreshold - factorThroughAtmosphere * vec3(1.,1.,1.)) / inverseAbsorbtionFactorThreshold);

    float sunZenith = 1.0 - abs(dot(normalize(planetCenter - starPosition), cameraToSurfaceNormalized));
    float lookPerpendicularSun = 1.0 - abs(dot(surfaceToStarNormalized, cameraToSurfaceNormalized));


    if(sunFactor > 1.0) {
        sunFactor = 0.99;
    }

    if(sunFactor < 0.0) {
        sunFactor = 0.0;
    }

    //gl_FragColor.rgb = scatteringFactor * absorbtionFactor;

    // DEBUG
    //gl_FragColor.rgb = vec3((cameraFactor - 0.3)/0.7, 0., 1. + cameraFactor - min(1.0, factorThroughAtmosphere));
    //gl_FragColor.rgb = vec3(scatteringFactor.r * 0.3, 0., 1. + cameraFactor - min(1.0, factorThroughAtmosphere));

    //gl_FragColor.rgb = vec3(scatteringFactor.r * 0.5, 0., sunZenith*lookPerpendicularSun + (1. - factorThroughAtmosphere)  + blueFactor  );
    gl_FragColor.rgb = vec3(scatteringFactor.r * 0.5, 0., (sunZenith*lookPerpendicularSun + (1. - factorThroughAtmosphere)) * sunFactor );
    gl_FragColor.rgb = vec3(scatteringFactor.r * 0.5, 0., (sunZenith*lookPerpendicularSun  + (1. - factorThroughAtmosphere)) * scatteringFactor.g);

    //gl_FragColor.rgb = vec3(scatteringFactor.r, 0, 0);

    //gl_FragColor.rgb = scatteringFactor * sunFactor;

    //gl_FragColor.a = atmosphereDepthFactor * sunFactor;

    //gl_FragColor.a = sunFactor;

    //gl_FragColor.rgb = vec3(scatteringFactor.r, 0.,0.);
    
    //gl_FragColor.rgb = vec3(0.,0.,0.);
    //gl_FragColor.r = (absorbtionFactor * scatteringFactor).r;
    //gl_FragColor.rgb = (2.+cameraFactor) * (vec3(1., 2., 3.))/4.;
    //gl_FragColor.g = 0.;
    //gl_FragColor.b = 0.;
    //gl_FragColor.rgb = vec3(0., 0., absorbtionFactor.b);
    //gl_FragColor.rgb = vec3(factorThroughAtmosphere, factorThroughAtmosphere, factorThroughAtmosphere);
    //gl_FragColor.rgb = (absorbtionFactor * scatteringFactor);
    //gl_FragColor.rgb = scatteringFactor;
    //gl_FragColor.rgb = absorbtionFactor;
    gl_FragColor.a = 0.9;

    // DEBUG
    //gl_FragColor.a = atmosphereDepthFactor;
    //gl_FragColor = vec4(0.3 * planetRadius / length(surfaceToCore), 0., 0., 1.);

    //gl_FragColor=vec4(factorThroughAtmosphere, factorThroughAtmosphere, factorThroughAtmosphere, 1.0);
}
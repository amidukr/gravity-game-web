precision highp float;

in vec3 _position;

uniform vec3 planetCenter;
uniform float planetRadius;

uniform vec3 starPosition;

uniform float atmosphereHeight;
uniform vec3 atmosphereColor;
uniform float atmosphereInvisibleDepth;

float raySphereIntersect(vec3 r0, vec3 rd, vec3 s0, float sr) {
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
    if (b*b - 4.0*a*c < 0.0) {
        return -1.0;
    }
    return (-b - sqrt((b*b) - 4.0*a*c))/(2.0*a);
}



void main()	{
    vec3 cameraToSurface = _position - cameraPosition;
    vec3 surfaceToCore = planetCenter - _position;
    vec3 cameraToCore = cameraPosition - planetCenter;

    vec3 cameraToSurfaceNormalized = normalize(cameraToSurface);
    vec3 surfaceToCoreNormalized = normalize(surfaceToCore);
    vec3 starToSurfaceNormalized = normalize(_position - starPosition.xyz);

    float distanceToSurface = length(cameraToSurface);
    float distanceToCore = length(cameraToCore);
    float cameraAltitude = distanceToCore - length(surfaceToCore);
    float distanceToAtmosphere = raySphereIntersect(cameraPosition, cameraToSurfaceNormalized, planetCenter, planetRadius + atmosphereHeight);

    float atmosphereDepth;
    if(distanceToAtmosphere > 0.0) {
        atmosphereDepth = distanceToSurface - distanceToAtmosphere;
    }else{
        atmosphereDepth = distanceToSurface;
    }

    float atmosphereDepthFactor = atmosphereDepth / atmosphereInvisibleDepth;

    atmosphereDepthFactor = (atmosphereDepthFactor - 0.5) / 0.5;

    if(atmosphereDepthFactor < 0.0) {
        atmosphereDepthFactor = 0.0;
    }

    if(cameraAltitude < atmosphereHeight * 0.5) {
        float cameraAltitudeFactor = cameraAltitude / atmosphereHeight / 0.5;
        cameraAltitudeFactor = (cameraAltitudeFactor - 0.5) / 0.5;
        atmosphereDepthFactor *= cameraAltitudeFactor;

        if(atmosphereDepthFactor < 0.0) {
           atmosphereDepthFactor = 0.0;
        }
    }

    float sunFactor = dot(starToSurfaceNormalized, surfaceToCoreNormalized);

    if(sunFactor < 0.0) {
        sunFactor = 0.0;
    }

    gl_FragColor.rgb = atmosphereColor;
    
    gl_FragColor.a = atmosphereDepthFactor * sunFactor;

    // DEBUG
    //gl_FragColor.a = atmosphereDepthFactor;
    //gl_FragColor = vec4(0.3 * planetRadius / length(surfaceToCore), 0., 0., 1.);
}
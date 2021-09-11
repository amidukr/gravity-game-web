precision highp float;

in vec3 _position;

uniform vec3 starPosition;
uniform vec3 planetCenter;
uniform float atmosphereRadius;

void main()	{
    const vec3 color = vec3(0.3, 0.3, 1);
    const float atmosphereHeight = 300.0 * 1000.0;
    
    vec3 cameraToSurface = _position - cameraPosition;
    vec3 cameraToSurfaceNormalized = normalize(cameraToSurface);
    vec3 surfaceToCoreNormalized = normalize(planetCenter - _position);
    vec3 starToSurfaceNormalized = normalize(_position - starPosition.xyz);

    float distanceToSurface = length(cameraToSurface);
    float distanceToCore = length(cameraPosition - planetCenter);
    float cameraAltitude = distanceToCore - length(_position - planetCenter);

    float atmosphereDepthFactor = 1.0;
    if(distanceToSurface < atmosphereHeight * 3.0) {
        atmosphereDepthFactor = atmosphereDepthFactor * distanceToSurface / atmosphereHeight / 3.0;
        atmosphereDepthFactor = (atmosphereDepthFactor - 0.7) / 0.3;
        if(atmosphereDepthFactor < 0.0) {
            atmosphereDepthFactor = 0.0;
        }
    }

    if(cameraAltitude < atmosphereHeight * 3.0) {
        float cameraAltitudeFactor = cameraAltitude / atmosphereHeight / 3.0;
        cameraAltitudeFactor = (cameraAltitudeFactor - 0.2) / 0.8;
        atmosphereDepthFactor *= cameraAltitudeFactor;

        if(atmosphereDepthFactor < 0.0) {
           atmosphereDepthFactor = 0.0;
        }
    }

    

    float sunFactor = dot(starToSurfaceNormalized, surfaceToCoreNormalized);
    float cameraFactor = (1.0 - dot(cameraToSurfaceNormalized, surfaceToCoreNormalized));

    gl_FragColor.rgb = color;
    
    gl_FragColor.a =  cameraFactor * sunFactor * atmosphereDepthFactor;
    //gl_FragColor.a = atmosphereDepthFactor;
}
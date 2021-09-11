precision highp float;

in vec3 _position;

uniform vec3 starPosition;
uniform vec3 planetCenter;
uniform float atmosphereRadius;


void main()	{
    vec3 cameraToSurface = normalize(_position - cameraPosition);
    vec3 surfaceToCore = normalize(planetCenter - _position);
    vec3 starToSurface = normalize(_position - starPosition.xyz);

    gl_FragColor.rgb = vec3(0.3, 0.3, 1) * dot(starToSurface, surfaceToCore);
    
    gl_FragColor.a = 1.0 - dot(cameraToSurface, surfaceToCore);
}
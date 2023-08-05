#version 300 es

uniform mat4 modelViewMatrix;

in vec3 position;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;

precision highp float;

#pragma cut-beffore

out vec3 surfaceLocalPosition;
out vec3 surfaceWorldPosition;

void main()	{
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);

    surfaceWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    surfaceLocalPosition = position;

    gl_Position = projectionMatrix * modelViewPosition; 
}
precision highp float;

out vec3 surfaceWorldPosition;

void main()	{
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);

    surfaceWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewPosition; 
}
precision highp float;

out vec3 _position;

void main()	{
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);

    _position = (modelMatrix * vec4(position, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewPosition; 
}
#version 300 es
precision highp float;
in vec3 cameraPosition;

out vec4 fragColor;

#define gl_FragColor  fragColor

#pragma cut-beffore

in vec3 _position;

uniform float scale;
uniform float gridBlend;
uniform vec3 objectCenter;

void main()	{
    gl_FragColor.rgb = vec3(1, 1, 1);

    floor(4.0);
    mod(1.0, 1.0);

    gl_FragColor.rgb = vec3(0.0);
    
    vec2 xy = _position.xy - objectCenter.xy;

    
    vec2 grid = mod(xy * scale, 2.0);
    vec2 rounds  = vec2(1.0) * mod(length(xy) * scale, 2.0);

    gl_FragColor.rg = grid * gridBlend + rounds * (1.0 - gridBlend);

    gl_FragColor.a = 1.0;
}
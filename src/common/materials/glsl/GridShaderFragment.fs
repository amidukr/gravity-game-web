#version 300 es
precision highp float;
in vec3 cameraPosition;

out vec4 fragColor;



#define gl_FragColor  fragColor

#pragma cut-beffore

in vec3 surfaceWorldPosition;
in vec3 surfaceLocalPosition;

uniform float scale;
uniform float gridBlend;

uniform vec3 objectWorldScale;
uniform vec3 objectCenter;

void drawHorizontalLines(vec3 wp, vec3 op) {
    vec2 wo = mod(vec2(wp.y, op.y)/scale, 2.0); 

    gl_FragColor.rgb = vec3(0, 0, 0);
    gl_FragColor.r = wo.x; // from world position
    gl_FragColor.a = wo.y; // from object position
}

void drawGrid(vec3 xyz) {
    vec3  grid = mod(xyz / scale, 2.0);
    vec3 rounds  = vec3(1.0) * mod(length(xyz.xy) / scale, 2.0);

    gl_FragColor.rgb = grid * gridBlend + rounds * (1.0 - gridBlend);
}

void main()	{
    gl_FragColor.rgb = vec3(1, 1, 1);

    floor(4.0);
    mod(1.0, 1.0);

    gl_FragColor.rgb = vec3(0.0);

    vec3 wp = surfaceWorldPosition.xyz - objectCenter.xyz;
    vec3 op = surfaceLocalPosition.xyz * objectWorldScale;

    //drawGrid(op.xyz);
    //drawGrid(wp.xyz);
    drawHorizontalLines(wp, op);

    //gl_FragColor.a = 1.0;
}
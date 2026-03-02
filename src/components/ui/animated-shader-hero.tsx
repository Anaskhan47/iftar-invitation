"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedShaderHero
 * 
 * A high-performance WebGL motion system designed for persistent background layering.
 * Uses raw GLSL for maximum efficiency and cinematic fluid motion.
 */
export const AnimatedShaderHero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) return;

        // --- Shader Program ---
        const vertexSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fragmentSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      // Enhanced Color Palette
      const vec3 color0 = vec3(0.06, 0.08, 0.12); // Midnight Highlight
      const vec3 color1 = vec3(0.15, 0.14, 0.12); // Warm Slate
      const vec3 color2 = vec3(0.85, 0.70, 0.45); // Rich Gold

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        uv.x *= aspect;

        float t = u_time * 0.25;
        
        vec2 p = uv * 2.5;
        for(int i = 1; i < 5; i++) {
          p.x += 0.4 / float(i) * sin(float(i) * 2.5 * p.y + t);
          p.y += 0.4 / float(i) * sin(float(i) * 2.5 * p.x + t);
        }

        float noise = sin(p.x + p.y) * 0.5 + 0.5;
        vec3 color = mix(color0, color1, noise);
        
        float goldMask = pow(noise, 5.0);
        color = mix(color, color2, goldMask * 0.6);

        float dist = distance(uv, vec2(0.5 * aspect, 0.5));
        color *= smoothstep(2.0, 0.1, dist);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

        const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const program = gl.createProgram();
        const vShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
        const fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
        if (!program || !vShader || !fShader) return;

        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        // --- Buffers ---
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        const positionAttribute = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionAttribute);
        gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

        const timeUniform = gl.getUniformLocation(program, "u_time");
        const resolutionUniform = gl.getUniformLocation(program, "u_resolution");

        let animationFrameId: number;
        let startTime = Date.now();

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2); // Cap DPR for performance
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
        };

        const render = () => {
            gl.uniform1f(timeUniform, (Date.now() - startTime) / 1000);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener("resize", resize);
        resize();
        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
            // Free GPU memory
            gl.deleteProgram(program);
            gl.deleteShader(vShader);
            gl.deleteShader(fShader);
            gl.deleteBuffer(positionBuffer);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="bg-shader-canvas"
            className="fixed inset-0 pointer-events-none -z-50 block touch-none"
        />
    );
};

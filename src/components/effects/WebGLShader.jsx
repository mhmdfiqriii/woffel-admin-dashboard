import { useEffect, useRef } from "react"
import * as THREE from "three"

function WebGLShader() {

  const canvasRef = useRef(null)

  useEffect(() => {

    if (!canvasRef.current) return

    const canvas = canvasRef.current

    const scene =
      new THREE.Scene()

    const camera =
      new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0,
        1
      )

    const renderer =
      new THREE.WebGLRenderer({
        canvas,
        antialias: true
      })

    renderer.setPixelRatio(
      window.devicePixelRatio
    )

    const uniforms = {

      resolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight
        )
      },

      time: {
        value: 0
      },

      xScale: {
        value: 1.0
      },

      yScale: {
        value: 0.5
      },

      distortion: {
        value: 0.05
      }

    }

    const geometry =
      new THREE.PlaneGeometry(
        2,
        2
      )

    const material =
      new THREE.ShaderMaterial({

        uniforms,

        vertexShader: `
          void main() {
            gl_Position =
              vec4(position, 1.0);
          }
        `,

        fragmentShader: `
          precision highp float;

          uniform vec2 resolution;
          uniform float time;
          uniform float xScale;
          uniform float yScale;
          uniform float distortion;

          void main() {

            vec2 p =
              (
                gl_FragCoord.xy * 2.0
                - resolution
              )
              /
              min(
                resolution.x,
                resolution.y
              );

            float d =
              length(p)
              *
              distortion;

            float rx =
              p.x *
              (1.0 + d);

            float gx =
              p.x;

            float bx =
              p.x *
              (1.0 - d);

            float r =
              0.05 /
              abs(
                p.y +
                sin(
                  (rx + time)
                  *
                  xScale
                )
                *
                yScale
              );

            float g =
              0.05 /
              abs(
                p.y +
                sin(
                  (gx + time)
                  *
                  xScale
                )
                *
                yScale
              );

            float b =
              0.05 /
              abs(
                p.y +
                sin(
                  (bx + time)
                  *
                  xScale
                )
                *
                yScale
              );

            gl_FragColor =
              vec4(
                r,
                g,
                b,
                1.0
              );

          }
        `

      })

    const mesh =
      new THREE.Mesh(
        geometry,
        material
      )

    scene.add(mesh)

    const resize = () => {

      const width =
        window.innerWidth

      const height =
        window.innerHeight

      renderer.setSize(
        width,
        height,
        false
      )

      uniforms.resolution.value.set(
        width,
        height
      )

    }

    resize()

    window.addEventListener(
      "resize",
      resize
    )

    let animationFrame

    const animate = () => {

      uniforms.time.value +=
        0.01

      renderer.render(
        scene,
        camera
      )

      animationFrame =
        requestAnimationFrame(
          animate
        )

    }

    animate()

    return () => {

      cancelAnimationFrame(
        animationFrame
      )

      window.removeEventListener(
        "resize",
        resize
      )

      geometry.dispose()

      material.dispose()

      renderer.dispose()

    }

  }, [])

  return (

    <canvas
      ref={canvasRef}
      className="
        webgl-shader
      "
    />

  )

}

export default WebGLShader
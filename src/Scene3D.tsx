import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = mount.current; if (!host) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100); camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setClearColor(0x000000, 0); host.appendChild(renderer.domElement);
    const group = new THREE.Group(); scene.add(group);
    const geo = new THREE.IcosahedronGeometry(1.55, 4);
    const mat = new THREE.MeshPhysicalMaterial({ color: 0x8b7bff, metalness: .45, roughness: .25, transparent: true, opacity: .86, wireframe: true });
    group.add(new THREE.Mesh(geo, mat));
    const innerGeo = new THREE.IcosahedronGeometry(1.08, 2);
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x17182d, metalness: .6, roughness: .3, wireframe: true });
    group.add(new THREE.Mesh(innerGeo, innerMat));
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x62e5d3, transparent: true, opacity: .8 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2, .012, 8, 160), ringMat); ring.rotation.set(.9, .2, .25); group.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.28, .008, 8, 160), new THREE.MeshBasicMaterial({ color: 0x9b8cff, transparent: true, opacity: .55 })); ring2.rotation.set(1.2, .8, -.45); group.add(ring2);
    const count = 550, positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { positions[i*3] = (Math.random()-.5)*10; positions[i*3+1] = (Math.random()-.5)*8; positions[i*3+2] = (Math.random()-.5)*5; }
    const pgeo = new THREE.BufferGeometry(); pgeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(pgeo, new THREE.PointsMaterial({ color: 0x9a92ff, size: .018, transparent: true, opacity: .8 })); scene.add(particles);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2)); const light = new THREE.PointLight(0x7163ff, 24, 20); light.position.set(2.5,2,4); scene.add(light);
    const light2 = new THREE.PointLight(0x48e4d5, 14, 18); light2.position.set(-3,-2,2); scene.add(light2);
    const resize = () => { const w = host.clientWidth || 400, h = host.clientHeight || 400; renderer.setSize(w,h,false); camera.aspect = w/h; camera.updateProjectionMatrix(); };
    resize(); const observer = new ResizeObserver(resize); observer.observe(host);
    let px = 0, py = 0; const move = (e: PointerEvent) => { const r = host.getBoundingClientRect(); px = ((e.clientX-r.left)/r.width-.5)*.25; py = ((e.clientY-r.top)/r.height-.5)*.2; };
    host.addEventListener('pointermove', move); let frame = 0;
    const animate = () => { frame = requestAnimationFrame(animate); group.rotation.y += .0025; group.rotation.x += .0007; group.rotation.x += (py-group.rotation.x)*.0003; group.position.y = Math.sin(performance.now()*.0006)*.08; particles.rotation.y -= .00018; particles.rotation.x = py*.15; group.rotation.z = px*.15; renderer.render(scene,camera); };
    animate();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); host.removeEventListener('pointermove',move); geo.dispose(); mat.dispose(); innerGeo.dispose(); innerMat.dispose(); ring.geometry.dispose(); ringMat.dispose(); ring2.geometry.dispose(); (ring2.material as THREE.Material).dispose(); pgeo.dispose(); (particles.material as THREE.Material).dispose(); renderer.dispose(); host.removeChild(renderer.domElement); };
  }, []);
  return <div className="scene3d" ref={mount} role="img" aria-label="Animated 3D particle orb" />;
}

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CABLE_LAYERS_ANATOMY } from '../../data/products';
import { CableLayerAnatomy } from '../../types';
import { 
  Layers, 
  Rotate3d, 
  ZoomIn, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  Maximize2, 
  RotateCcw,
  Sliders,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CableSceneProps {
  onSelectLayer?: (layer: CableLayerAnatomy | null) => void;
  selectedLayerId?: string | null;
  className?: string;
  isHeroMode?: boolean;
}

export const CableScene: React.FC<CableSceneProps> = ({
  onSelectLayer,
  selectedLayerId,
  className = '',
  isHeroMode = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<CableLayerAnatomy>(CABLE_LAYERS_ANATOMY[0]);
  const [explosionFactor, setExplosionFactor] = useState<number>(0.25);
  const [peelProgress, setPeelProgress] = useState<number>(0.85);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSoftwareMode, setIsSoftwareMode] = useState<boolean>(false);

  // Mutable refs for Three.js animation loop to eliminate garbage collection
  const stateRef = useRef({
    explosion: 0.25,
    peel: 0.85,
    targetExplosion: 0.25,
    targetPeel: 0.85,
    selectedId: 'layer-conductor',
    isRotating: true,
    hoveredMesh: null as THREE.Mesh | null,
  });

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const initialCamPos = useRef<THREE.Vector3>(new THREE.Vector3(7.5, 4.2, 8.5));
  const sceneLayersRef = useRef<Map<string, THREE.Group | THREE.Mesh>>(new Map());

  // Synchronize internal state with props
  useEffect(() => {
    stateRef.current.targetExplosion = explosionFactor;
  }, [explosionFactor]);

  useEffect(() => {
    stateRef.current.targetPeel = peelProgress;
  }, [peelProgress]);

  useEffect(() => {
    stateRef.current.isRotating = isRotating;
  }, [isRotating]);

  useEffect(() => {
    if (selectedLayerId) {
      stateRef.current.selectedId = selectedLayerId;
      const found = CABLE_LAYERS_ANATOMY.find(l => l.id === selectedLayerId);
      if (found) setActiveLayer(found);
    }
  }, [selectedLayerId]);

  const selectLayerHandler = useCallback((layer: CableLayerAnatomy) => {
    setActiveLayer(layer);
    stateRef.current.selectedId = layer.id;
    if (onSelectLayer) onSelectLayer(layer);
  }, [onSelectLayer]);

  const resetCamera = useCallback(() => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.copy(initialCamPos.current);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL detector
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();
    setIsSoftwareMode(isSoftwareGl);

    // 2. Scene & Camera setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0d10);
    scene.fog = new THREE.FogExp2(0x0b0d10, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.copy(initialCamPos.current);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3-point Studio Rig
    const keyLight = new THREE.DirectionalLight(0xffecd6, 3.2);
    keyLight.position.set(6, 9, 7);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa5c7ff, 1.6);
    fillLight.position.set(-8, 3, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd88746, 2.8); // Copper rim
    rimLight.position.set(0, -5, -8);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0x276bff, 0x151a20, 0.85);
    scene.add(hemiLight);

    // Ground contact shadow disc
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x030406,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.4;
    scene.add(shadowMesh);

    // Subtle technical floor grid
    const gridHelper = new THREE.GridHelper(16, 24, 0xd88746, 0x1f2732);
    gridHelper.position.y = -2.39;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.22;
    scene.add(gridHelper);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controlsRef.current = controls;

    // 6. Cable Procedural Assembly
    const mainCableGroup = new THREE.Group();
    scene.add(mainCableGroup);

    // Cable Materials
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xd88746,
      metalness: 0.94,
      roughness: 0.2,
      envMapIntensity: 1.4,
    });

    const phaseColors = [
      0x5a2d0c, // Brown L1
      0x1c1e22, // Black L2
      0x6b7280, // Grey L3
      0x1d4ed8, // Blue Neutral
      0x15803d  // Green/Yellow Ground
    ];

    const beddingMat = new THREE.MeshStandardMaterial({
      color: 0x242a33,
      metalness: 0.1,
      roughness: 0.75,
    });

    const screenMat = new THREE.MeshStandardMaterial({
      color: 0xb46d32,
      metalness: 0.88,
      roughness: 0.35,
      wireframe: false,
    });

    const armorMat = new THREE.MeshStandardMaterial({
      color: 0x768291,
      metalness: 0.85,
      roughness: 0.35,
    });

    const sheathMat = new THREE.MeshStandardMaterial({
      color: 0x12161c,
      metalness: 0.15,
      roughness: 0.45,
    });

    // Helper references for animations
    const layersMap = sceneLayersRef.current;
    layersMap.clear();

    // LAYER 1: CONDUCTORS (Central 4 cores with multi-strand twist)
    const conductorsGroup = new THREE.Group();
    conductorsGroup.name = 'layer-conductor';
    const numCores = 4;
    const coreRadius = 0.36;
    const coreOrbitRadius = 0.58;
    const cableLength = 7.0;

    const coreMeshes: THREE.Group[] = [];

    for (let c = 0; c < numCores; c++) {
      const singleCoreGroup = new THREE.Group();
      const angle = (c / numCores) * Math.PI * 2 + Math.PI / 4;
      const coreX = Math.cos(angle) * coreOrbitRadius;
      const coreY = Math.sin(angle) * coreOrbitRadius;

      // 7 Strands per core (1 central + 6 surrounding)
      const strandRadius = coreRadius * 0.33;
      const strandGeo = new THREE.CylinderGeometry(strandRadius, strandRadius, cableLength * 0.95, 16);
      
      // Central strand
      const centerStrand = new THREE.Mesh(strandGeo, copperMat);
      centerStrand.castShadow = !isSoftwareGl;
      singleCoreGroup.add(centerStrand);

      // Surrounding 6 strands
      for (let s = 0; s < 6; s++) {
        const sAngle = (s / 6) * Math.PI * 2;
        const sx = Math.cos(sAngle) * (strandRadius * 1.95);
        const sy = Math.sin(sAngle) * (strandRadius * 1.95);
        const outerStrand = new THREE.Mesh(strandGeo, copperMat);
        outerStrand.position.set(sx, 0, sy);
        outerStrand.castShadow = !isSoftwareGl;
        singleCoreGroup.add(outerStrand);
      }

      singleCoreGroup.position.set(coreX, 0, coreY);
      singleCoreGroup.rotation.x = Math.PI / 2;
      singleCoreGroup.userData = { originalX: coreX, originalY: coreY, angle: angle };
      conductorsGroup.add(singleCoreGroup);
      coreMeshes.push(singleCoreGroup);
    }
    mainCableGroup.add(conductorsGroup);
    layersMap.set('layer-conductor', conductorsGroup);

    // LAYER 2: XLPE INSULATION SLEEVES (Over each core)
    const insulationGroup = new THREE.Group();
    insulationGroup.name = 'layer-insulation';
    const insSleeveLength = cableLength * 0.82;

    for (let c = 0; c < numCores; c++) {
      const insMat = new THREE.MeshStandardMaterial({
        color: phaseColors[c % phaseColors.length],
        metalness: 0.1,
        roughness: 0.35,
      });

      const sleeveGeo = new THREE.CylinderGeometry(coreRadius * 1.25, coreRadius * 1.25, insSleeveLength, 24, 1, true);
      const sleeve = new THREE.Mesh(sleeveGeo, insMat);
      sleeve.rotation.x = Math.PI / 2;
      const angle = (c / numCores) * Math.PI * 2 + Math.PI / 4;
      const coreX = Math.cos(angle) * coreOrbitRadius;
      const coreY = Math.sin(angle) * coreOrbitRadius;
      sleeve.position.set(coreX, 0, coreY);
      sleeve.userData = { originalX: coreX, originalY: coreY, angle: angle };
      sleeve.castShadow = !isSoftwareGl;
      insulationGroup.add(sleeve);
    }
    mainCableGroup.add(insulationGroup);
    layersMap.set('layer-insulation', insulationGroup);

    // LAYER 3: BEDDING / FILLER MATRIX
    const beddingRadius = 1.35;
    const beddingLength = cableLength * 0.70;
    const beddingGeo = new THREE.CylinderGeometry(beddingRadius, beddingRadius, beddingLength, 32);
    const beddingMesh = new THREE.Mesh(beddingGeo, beddingMat);
    beddingMesh.name = 'layer-bedding';
    beddingMesh.rotation.x = Math.PI / 2;
    beddingMesh.castShadow = !isSoftwareGl;
    mainCableGroup.add(beddingMesh);
    layersMap.set('layer-bedding', beddingMesh);

    // LAYER 4: METALLIC SCREEN / COPPER TAPE
    const screenRadius = 1.42;
    const screenLength = cableLength * 0.58;
    const screenGeo = new THREE.CylinderGeometry(screenRadius, screenRadius, screenLength, 32);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.name = 'layer-screen';
    screenMesh.rotation.x = Math.PI / 2;
    screenMesh.castShadow = !isSoftwareGl;
    mainCableGroup.add(screenMesh);
    layersMap.set('layer-screen', screenMesh);

    // LAYER 5: STEEL WIRE ARMOUR (SWA - Array of helical or longitudinal wires)
    const armorGroup = new THREE.Group();
    armorGroup.name = 'layer-armor';
    const armorRadius = 1.55;
    const armorLength = cableLength * 0.44;
    const wireCount = 28;
    const wireRadius = 0.055;
    const wireGeo = new THREE.CylinderGeometry(wireRadius, wireRadius, armorLength, 10);

    for (let w = 0; w < wireCount; w++) {
      const wAngle = (w / wireCount) * Math.PI * 2;
      const wx = Math.cos(wAngle) * armorRadius;
      const wy = Math.sin(wAngle) * armorRadius;
      const wireMesh = new THREE.Mesh(wireGeo, armorMat);
      wireMesh.position.set(wx, 0, wy);
      wireMesh.rotation.x = Math.PI / 2;
      wireMesh.castShadow = !isSoftwareGl;
      armorGroup.add(wireMesh);
    }
    mainCableGroup.add(armorGroup);
    layersMap.set('layer-armor', armorGroup);

    // LAYER 6: OUTER SHEATH (PVC / LSZH)
    const sheathRadius = 1.72;
    const sheathLength = cableLength * 0.32;
    const sheathGeo = new THREE.CylinderGeometry(sheathRadius, sheathRadius, sheathLength, 36);
    const sheathMesh = new THREE.Mesh(sheathGeo, sheathMat);
    sheathMesh.name = 'layer-sheath';
    sheathMesh.rotation.x = Math.PI / 2;
    sheathMesh.castShadow = !isSoftwareGl;
    mainCableGroup.add(sheathMesh);
    layersMap.set('layer-sheath', sheathMesh);

    // Orientation of the whole cable
    mainCableGroup.rotation.y = -Math.PI / 5;
    mainCableGroup.position.set(0, 0, 0);

    // Raycasting for interactive click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(mainCableGroup.children, true);

      if (intersects.length > 0) {
        let topParent: THREE.Object3D | null = intersects[0].object;
        while (topParent && topParent.parent && topParent.parent !== mainCableGroup) {
          topParent = topParent.parent;
        }

        if (topParent && topParent.name) {
          const targetAnatomy = CABLE_LAYERS_ANATOMY.find(l => l.id === topParent?.name);
          if (targetAnatomy) {
            selectLayerHandler(targetAnatomy);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    // Pre-allocate helpers outside loop
    const clock = new THREE.Clock();
    let animFrameId = 0;

    // 7. Animation Loop with smooth exponential damp
    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.1);

      // Smooth state damp
      stateRef.current.explosion = THREE.MathUtils.damp(
        stateRef.current.explosion,
        stateRef.current.targetExplosion,
        5,
        delta
      );

      stateRef.current.peel = THREE.MathUtils.damp(
        stateRef.current.peel,
        stateRef.current.targetPeel,
        4,
        delta
      );

      // Slow idle rotation
      if (stateRef.current.isRotating) {
        mainCableGroup.rotation.z += 0.25 * delta;
      }

      // Apply dynamic exploded offsets and peel displacements
      const exp = stateRef.current.explosion;
      const peel = stateRef.current.peel;

      // 1. Conductors separation
      conductorsGroup.children.forEach((child) => {
        const udata = child.userData;
        if (udata && udata.originalX !== undefined) {
          const expMult = 1 + exp * 1.8;
          child.position.x = udata.originalX * expMult;
          child.position.y = udata.originalY * expMult;
        }
      });

      // 2. Insulation sleeves separation
      insulationGroup.children.forEach((child) => {
        const udata = child.userData;
        if (udata && udata.originalX !== undefined) {
          const expMult = 1 + exp * 1.8;
          child.position.x = udata.originalX * expMult;
          child.position.y = udata.originalY * expMult;
          // axial slide
          child.position.z = -(1 - peel) * 0.4;
        }
      });

      // 3. Bedding offset
      beddingMesh.position.z = - (1.1 + (1 - peel) * 0.8) - exp * 0.3;

      // 4. Screen offset
      screenMesh.position.z = - (1.9 + (1 - peel) * 1.2) - exp * 0.6;

      // 5. Armour offset
      armorGroup.position.z = - (2.6 + (1 - peel) * 1.6) - exp * 0.9;
      armorGroup.scale.set(1 + exp * 0.15, 1 + exp * 0.15, 1);

      // 6. Sheath offset
      sheathMesh.position.z = - (3.2 + (1 - peel) * 2.0) - exp * 1.2;
      sheathMesh.scale.set(1 + exp * 0.22, 1 + exp * 0.22, 1);

      // Highlight selected layer
      const activeId = stateRef.current.selectedId;
      layersMap.forEach((obj, layerKey) => {
        const isSelected = layerKey === activeId;
        const targetScale = isSelected ? 1.04 : 1.0;
        obj.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1.0), 0.1);
      });

      controls.update();
      renderer.render(scene, camera);

      animFrameId = requestAnimationFrame(tick);
    };

    // Warm-up compile & trigger loop
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }
    setIsLoaded(true);
    animFrameId = requestAnimationFrame(tick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [selectLayerHandler]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-[#0B0D10] border border-[#26303D] shadow-2xl ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[520px] md:h-[620px] cursor-grab active:cursor-grabbing"
      />

      {/* Top Left Spec Badge & Context */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 max-w-sm pointer-events-none">
        <div className="flex items-center gap-2 bg-[#151A20]/90 border border-[#26303D] rounded-full px-3.5 py-1.5 shadow-lg backdrop-blur-sm pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D88746] shadow-[0_0_8px_#D88746]" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#F4F6F8]">
            {isHeroMode ? 'CÂBLE INDUSTRIEL 0.6/1 kV' : 'ANALYSE TECHNIQUE EN COUPE'}
          </span>
          <span className="text-[10px] font-mono-tech text-[#8B949E] border-l border-[#26303D] pl-2">
            PBR 3D
          </span>
        </div>

        {/* Selected Layer Info Overlay */}
        <div className="bg-[#151A20]/95 border border-[#26303D] rounded-xl p-3.5 shadow-xl backdrop-blur-md pointer-events-auto transition-all">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="text-[11px] font-mono-tech text-[#D88746] font-medium uppercase tracking-wide">
              Couche active :
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#276BFF]/20 text-[#548DFF] font-mono-tech border border-[#276BFF]/30">
              {activeLayer.standardRef}
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#F4F6F8] font-heading flex items-center gap-1.5">
            {activeLayer.name}
          </h4>
          <p className="text-xs text-[#8B949E] mt-1 line-clamp-2 leading-relaxed">
            {activeLayer.role}
          </p>

          <div className="mt-2.5 pt-2 border-t border-[#26303D]/60 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-[#8B949E] block text-[10px]">Matériau :</span>
              <span className="text-[#F4F6F8] font-medium truncate block">{activeLayer.material.split('(')[0]}</span>
            </div>
            <div>
              <span className="text-[#8B949E] block text-[10px]">Propriété clé :</span>
              <span className="text-[#D88746] font-mono-tech truncate block">
                {activeLayer.technicalDetails[0]?.value || 'Conforme'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Right Quick Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          title={isRotating ? 'Mettre en pause la rotation' : 'Reprendre la rotation'}
          className={`p-2.5 rounded-xl border text-xs font-medium transition-colors shadow-lg backdrop-blur-sm flex items-center gap-1.5 ${
            isRotating 
              ? 'bg-[#151A20]/90 border-[#D88746]/50 text-[#D88746]' 
              : 'bg-[#151A20]/90 border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8]'
          }`}
        >
          <Rotate3d className="w-4 h-4" />
          <span className="hidden sm:inline">{isRotating ? 'Rotation ON' : 'Rotation OFF'}</span>
        </button>

        <button
          onClick={resetCamera}
          title="Réinitialiser l'angle de vue"
          className="p-2.5 rounded-xl bg-[#151A20]/90 border border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8] hover:border-[#8B949E] transition-colors shadow-lg backdrop-blur-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Collapsible Control Dock (Per Three.js ergonomics standard) */}
      <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl transition-transform duration-300 ease-in-out ${
        isDockCollapsed ? 'translate-y-[calc(100%-38px)]' : 'translate-y-0'
      }`}>
        {/* Toggle Tab */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-t-xl bg-[#151A20] border-t border-x border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8] text-xs font-medium shadow-md transition-colors"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#D88746]" />
                <span>Afficher les commandes 3D</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#8B949E]" />
                <span>Masquer le panneau</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Surface */}
        <div className="bg-[#151A20]/95 border border-[#26303D] rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-md">
          {/* Layer Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-3 border-b border-[#26303D]/60 no-scrollbar">
            <span className="text-[11px] font-mono-tech text-[#8B949E] uppercase whitespace-nowrap mr-1">
              Couches :
            </span>
            {CABLE_LAYERS_ANATOMY.map((layer) => {
              const isCurrent = activeLayer.id === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => selectLayerHandler(layer)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    isCurrent
                      ? 'bg-[#D88746]/20 border-[#D88746] text-[#F4F6F8] shadow-[0_0_12px_rgba(216,135,70,0.3)]'
                      : 'bg-[#0B0D10]/60 border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8] hover:border-[#8B949E]/50'
                  }`}
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: layer.colorHex }}
                  />
                  <span>{layer.name.split(' ')[0]} {layer.name.split(' ')[1] || ''}</span>
                </button>
              );
            })}
          </div>

          {/* Sliders for Dynamic Inspection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Exploded View Slider */}
            <div className="flex items-center gap-3 bg-[#0B0D10]/50 p-2 rounded-xl border border-[#26303D]/60">
              <div className="flex items-center gap-1.5 text-[#D88746] font-medium min-w-[100px]">
                <Layers className="w-4 h-4" />
                <span>Vue Éclatée</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explosionFactor}
                onChange={(e) => setExplosionFactor(parseFloat(e.target.value))}
                className="w-full accent-[#D88746] h-1.5 bg-[#26303D] rounded-lg cursor-pointer"
              />
              <span className="text-[11px] font-mono-tech text-[#8B949E] min-w-[36px] text-right">
                {Math.round(explosionFactor * 100)}%
              </span>
            </div>

            {/* Peel / Cutaway Slider */}
            <div className="flex items-center gap-3 bg-[#0B0D10]/50 p-2 rounded-xl border border-[#26303D]/60">
              <div className="flex items-center gap-1.5 text-[#276BFF] font-medium min-w-[100px]">
                <Sliders className="w-4 h-4" />
                <span>Dénudage</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.01"
                value={peelProgress}
                onChange={(e) => setPeelProgress(parseFloat(e.target.value))}
                className="w-full accent-[#276BFF] h-1.5 bg-[#26303D] rounded-lg cursor-pointer"
              />
              <span className="text-[11px] font-mono-tech text-[#8B949E] min-w-[36px] text-right">
                {Math.round(peelProgress * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Software Fallback Warning if needed */}
      {isSoftwareMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#D88746]/20 border border-[#D88746]/50 text-[#D88746] text-[11px] px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
          Mode de rendu optimisé (CPU WebGL)
        </div>
      )}
    </div>
  );
};

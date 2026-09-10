import React, { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import GlassPanel from '../common/GlassPanel';
import { Layers, Maximize2, SplitSquareVertical } from 'lucide-react';

export default function GeoViewer({
  className = '',
  initialPosition = { lng: 77.2090, lat: 28.6139, height: 250000 },
  label = 'delhi ncr synchronization'
}) {
  const container3DRef = useRef(null);
  const container2DRef = useRef(null);
  const view3DRef = useRef(null);
  const view2DRef = useRef(null);
  const [activeMode, setActiveMode] = useState('split'); // 'split' | '3d' | '2d'

  useEffect(() => {
    if (!container3DRef.current || !container2DRef.current) return;

    let destroyed = false;
    const clockViewModel = new Cesium.ClockViewModel();

    container3DRef.current.innerHTML = '';
    container2DRef.current.innerHTML = '';

    const getBaseLayer = () => {
      return Cesium.ImageryLayer.fromProviderAsync(
        Cesium.TileMapServiceImageryProvider.fromUrl(
          Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
        )
      );
    };

    const options3D = {
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      clockViewModel: clockViewModel,
      baseLayer: getBaseLayer(),
      contextOptions: {
        webgl: {
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        },
      },
    };

    const options2D = {
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      clockViewModel: clockViewModel,
      sceneMode: Cesium.SceneMode.SCENE2D,
      baseLayer: getBaseLayer(),
      contextOptions: {
        webgl: {
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        },
      },
    };

    let view3D = null;
    let view2D = null;

    try {
      view3D = new Cesium.Viewer(container3DRef.current, options3D);
      view2D = new Cesium.Viewer(container2DRef.current, options2D);

      view3DRef.current = view3D;
      view2DRef.current = view2D;

      view3D.scene.backgroundColor = Cesium.Color.fromCssColorString('#020408');
      view2D.scene.backgroundColor = Cesium.Color.fromCssColorString('#020408');

      let worldPosition = Cesium.Cartesian3.fromDegrees(
        initialPosition.lng,
        initialPosition.lat,
        0
      );
      let distance = initialPosition.height;

      function sync2DView() {
        if (destroyed || !view3D || view3D.isDestroyed() || !view2D || view2D.isDestroyed()) return;

        const viewCenter = new Cesium.Cartesian2(
          Math.floor(view3D.canvas.clientWidth / 2),
          Math.floor(view3D.canvas.clientHeight / 2)
        );

        const newWorldPosition = view3D.scene.camera.pickEllipsoid(viewCenter);

        if (Cesium.defined(newWorldPosition)) {
          worldPosition = newWorldPosition;
        }

        distance = Cesium.Cartesian3.distance(
          worldPosition,
          view3D.scene.camera.positionWC
        );

        view2D.scene.camera.lookAt(
          worldPosition,
          new Cesium.Cartesian3(0.0, 0.0, distance)
        );
      }

      view3D.camera.changed.addEventListener(sync2DView);
      view3D.camera.percentageChanged = 0.01;

      // Lock 2D camera manual controls to ensure master-slave 3D synchronization
      const ctrl2D = view2D.scene.screenSpaceCameraController;
      ctrl2D.enableRotate = false;
      ctrl2D.enableTranslate = false;
      ctrl2D.enableZoom = false;
      ctrl2D.enableTilt = false;
      ctrl2D.enableLook = false;

      // Set initial viewpoint
      view3D.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          initialPosition.lng,
          initialPosition.lat,
          initialPosition.height
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-55.0),
          roll: 0.0,
        }
      });

      sync2DView();
    } catch (err) {
      console.error('[GeoViewer init error]', err);
    }

    return () => {
      destroyed = true;
      if (view3D && !view3D.isDestroyed()) {
        view3D.destroy();
        view3DRef.current = null;
      }
      if (view2D && !view2D.isDestroyed()) {
        view2D.destroy();
        view2DRef.current = null;
      }
      if (container3DRef.current) container3DRef.current.innerHTML = '';
      if (container2DRef.current) container2DRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div className={`relative w-full h-[520px] rounded-2xl overflow-hidden glass-panel border border-white/10 ${className}`}>
      {/* Top synchronized telemetry header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-gray-300 lowercase font-mono">
            3d / 2d synchronized viewer — {label}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/10 rounded-full p-1 pointer-events-auto">
          <button
            onClick={() => setActiveMode('split')}
            className={`px-3 py-1 text-xs rounded-full transition-all lowercase ${
              activeMode === 'split'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            dual split
          </button>
          <button
            onClick={() => setActiveMode('3d')}
            className={`px-3 py-1 text-xs rounded-full transition-all lowercase ${
              activeMode === '3d'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            3d perspective
          </button>
          <button
            onClick={() => setActiveMode('2d')}
            className={`px-3 py-1 text-xs rounded-full transition-all lowercase ${
              activeMode === '2d'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            2d orthographic
          </button>
        </div>
      </div>

      {/* Synchronized dual viewers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* 3D Perspective Viewer */}
        <div
          className={`relative w-full h-full ${
            activeMode === '2d' ? 'hidden' : activeMode === '3d' ? 'col-span-2' : ''
          }`}
        >
          <div ref={container3DRef} className="w-full h-full" />
          <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded bg-black/60 backdrop-blur border border-white/10 text-[11px] font-mono text-sky-300 lowercase">
            view 3d — oblique perspective (interactive master)
          </div>
        </div>

        {/* 2D Orthographic Viewer */}
        <div
          className={`relative w-full h-full ${
            activeMode === '3d' ? 'hidden' : activeMode === '2d' ? 'col-span-2' : ''
          }`}
        >
          <div ref={container2DRef} className="w-full h-full" />
          <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded bg-black/60 backdrop-blur border border-white/10 text-[11px] font-mono text-sky-300 lowercase">
            view 2d — orthographic nadir (synced slave)
          </div>
        </div>
      </div>
    </div>
  );
}

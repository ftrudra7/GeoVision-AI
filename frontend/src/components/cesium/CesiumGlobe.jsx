import React, { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// Ensure base URL is set
if (typeof window !== 'undefined' && !window.CESIUM_BASE_URL) {
  window.CESIUM_BASE_URL = '/cesium/';
}

export default function CesiumGlobe({
  className = '',
  cameraTarget = null, // { lat, lng, height, pitch, heading, duration }
  interactive = true,
  autoRotate = true,
  layers = { satellite: true, urban: false, roads: false, vegetation: false, water: false },
  onViewerReady = null,
  markers = [],
  highlightRegion = null, // { lat, lng, radius, name }
}) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const rotationListenerRef = useRef(null);
  const isInteractingRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let viewer = null;
    let isCancelled = false;

    // Clean any prior contents
    containerRef.current.innerHTML = '';

    try {
      // Use local NaturalEarthII offline texture as guaranteed base layer
      const localBaseLayer = Cesium.ImageryLayer.fromProviderAsync(
        Cesium.TileMapServiceImageryProvider.fromUrl(
          Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
        )
      );

      // Initialize Cesium Viewer with async baseLayer
      viewer = new Cesium.Viewer(containerRef.current, {
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
        navigationInstructionsInitiallyVisible: false,
        scene3DOnly: true,
        baseLayer: localBaseLayer,
        contextOptions: {
          webgl: {
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: true,
          },
        },
      });

      viewerRef.current = viewer;

      // Enhance planetary atmosphere and visual styling
      const scene = viewer.scene;
      scene.backgroundColor = Cesium.Color.fromCssColorString('#020408');
      scene.globe.baseColor = Cesium.Color.fromCssColorString('#030712');
      scene.globe.enableLighting = true;
      scene.globe.atmosphereLightIntensity = 1.6;
      scene.globe.showGroundAtmosphere = true;

      // Try loading high-resolution satellite imagery asynchronously on top
      Cesium.ArcGisMapServerImageryProvider.fromUrl(
        'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
        { enablePickFeatures: false }
      )
        .then((provider) => {
          if (!isCancelled && viewer && !viewer.isDestroyed()) {
            viewer.imageryLayers.addImageryProvider(provider);
          }
        })
        .catch(() => {
          // Keep NaturalEarthII base layer
        });

      // Disable default interaction if requested
      if (!interactive) {
        scene.screenSpaceCameraController.enableRotate = false;
        scene.screenSpaceCameraController.enableTranslate = false;
        scene.screenSpaceCameraController.enableZoom = false;
        scene.screenSpaceCameraController.enableTilt = false;
        scene.screenSpaceCameraController.enableLook = false;
      }

      // Initial default planetary camera perspective
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(78.0, 20.0, 24000000.0),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0),
          roll: 0.0,
        },
      });

      // Slow planetary rotation handler (~120s per rotation)
      if (autoRotate) {
        const rotationSpeed = 0.0003;
        let lastTime = Date.now();

        const rotateCallback = () => {
          if (!viewer || viewer.isDestroyed()) return;
          const now = Date.now();
          const delta = (now - lastTime) / 1000;
          lastTime = now;

          if (!isInteractingRef.current) {
            viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, rotationSpeed * delta);
          }
        };

        viewer.scene.postRender.addEventListener(rotateCallback);
        rotationListenerRef.current = rotateCallback;

        // Interaction listeners to pause auto-rotation
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(() => {
          isInteractingRef.current = true;
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

        handler.setInputAction(() => {
          setTimeout(() => {
            isInteractingRef.current = false;
          }, 3500);
        }, Cesium.ScreenSpaceEventType.LEFT_UP);

        handler.setInputAction(() => {
          isInteractingRef.current = true;
          setTimeout(() => {
            isInteractingRef.current = false;
          }, 3500);
        }, Cesium.ScreenSpaceEventType.WHEEL);
      }

      setIsReady(true);
      if (onViewerReady) {
        onViewerReady(viewer);
      }
    } catch (err) {
      console.error('[CesiumGlobe init error]', err);
    }

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (viewer && !viewer.isDestroyed()) {
        viewer.resize();
      }
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Strict cleanup on unmount
    return () => {
      isCancelled = true;
      resizeObserver.disconnect();

      if (rotationListenerRef.current && viewer && !viewer.isDestroyed()) {
        viewer.scene.postRender.removeEventListener(rotationListenerRef.current);
        rotationListenerRef.current = null;
      }

      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy();
      }
      viewerRef.current = null;

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [interactive, autoRotate]);

  // Smooth camera flyTo when cameraTarget prop changes
  useEffect(() => {
    if (!isReady || !viewerRef.current || viewerRef.current.isDestroyed() || !cameraTarget) return;

    const { lng, lat, height = 2000000, pitch = -45, heading = 0, duration = 2.0 } = cameraTarget;

    try {
      viewerRef.current.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lng, lat, height),
        orientation: {
          heading: Cesium.Math.toRadians(heading),
          pitch: Cesium.Math.toRadians(pitch),
          roll: 0.0,
        },
        duration: duration,
        easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
      });
    } catch (e) {
      console.warn('[Cesium camera flyTo error]', e);
    }
  }, [cameraTarget, isReady]);

  // Handle markers & highlight region
  useEffect(() => {
    if (!isReady || !viewerRef.current || viewerRef.current.isDestroyed()) return;
    const viewer = viewerRef.current;
    viewer.entities.removeAll();

    // Render markers
    markers.forEach((m) => {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(m.lng, m.lat, m.height || 0),
        point: {
          pixelSize: 8,
          color: Cesium.Color.fromCssColorString('#38bdf8'),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 1.5,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: m.title ? {
          text: m.title.toLowerCase(),
          font: '12px "Aeonik Pro", sans-serif',
          fillColor: Cesium.Color.fromCssColorString('#e2e8f0'),
          showBackground: true,
          backgroundColor: Cesium.Color.fromCssColorString('rgba(8, 14, 28, 0.85)'),
          backgroundPadding: new Cesium.Cartesian2(8, 4),
          pixelOffset: new Cesium.Cartesian2(0, -20),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        } : undefined,
      });
    });

    // Render region highlight circle
    if (highlightRegion) {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(highlightRegion.lng, highlightRegion.lat),
        ellipse: {
          semiMinorAxis: highlightRegion.radius || 45000.0,
          semiMajorAxis: highlightRegion.radius || 45000.0,
          material: Cesium.Color.fromCssColorString('rgba(56, 189, 248, 0.18)'),
          outline: true,
          outlineColor: Cesium.Color.fromCssColorString('rgba(56, 189, 248, 0.8)'),
          outlineWidth: 2,
        },
      });
    }
  }, [markers, highlightRegion, isReady]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      {/* Subtle vignette gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,4,8,0.4)_70%,rgba(2,4,8,0.9)_100%)]" />
    </div>
  );
}

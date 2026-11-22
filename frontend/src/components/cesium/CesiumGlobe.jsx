import React, { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

if (typeof window !== 'undefined' && !window.CESIUM_BASE_URL) {
  window.CESIUM_BASE_URL = '/cesium/';
}

export default function CesiumGlobe({
  className = '',
  cameraTarget = null,
  interactive = true,
  autoRotate = true,
  layers = { satellite: true, urban: false, roads: false, vegetation: false, water: false },
  onViewerReady = null,
  markers = [],
  highlightRegion = null,
}) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const rotationListenerRef = useRef(null);
  const inputHandlerRef = useRef(null);
  const interactionTimeoutRef = useRef(null);
  const isInteractingRef = useRef(false);
  const autoRotateRef = useRef(autoRotate);
  const cameraTargetRef = useRef(cameraTarget);
  const onViewerReadyRef = useRef(onViewerReady);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    cameraTargetRef.current = cameraTarget;
    onViewerReadyRef.current = onViewerReady;
  }, [cameraTarget, onViewerReady]);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    let viewer = null;
    let resizeObserver = null;
    let isCancelled = false;
    setIsReady(false);
    isInteractingRef.current = false;
    containerRef.current.replaceChildren();

    const clearInteractionTimeout = () => {
      if (interactionTimeoutRef.current !== null) {
        window.clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = null;
      }
    };

    const resumeRotationAfterInteraction = () => {
      clearInteractionTimeout();
      interactionTimeoutRef.current = window.setTimeout(() => {
        isInteractingRef.current = false;
        interactionTimeoutRef.current = null;
      }, 900);
    };

    try {
      const localBaseLayer = Cesium.ImageryLayer.fromProviderAsync(
        Cesium.TileMapServiceImageryProvider.fromUrl(
          Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
        )
      );

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
            preserveDrawingBuffer: false,
          },
        },
      });

      viewerRef.current = viewer;
      const scene = viewer.scene;
      scene.backgroundColor = Cesium.Color.fromCssColorString('#020408');
      scene.globe.baseColor = Cesium.Color.fromCssColorString('#030712');
      scene.globe.enableLighting = true;
      scene.globe.atmosphereLightIntensity = 1.6;
      scene.globe.showGroundAtmosphere = true;

      Cesium.ArcGisMapServerImageryProvider.fromUrl(
        'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
        { enablePickFeatures: false }
      ).then((provider) => {
        if (!isCancelled && viewer && !viewer.isDestroyed()) {
          viewer.imageryLayers.addImageryProvider(provider);
        }
      }).catch(() => {
        // Keep the lightweight NaturalEarthII base layer when imagery is unavailable.
      });

      if (!interactive) {
        const controller = scene.screenSpaceCameraController;
        controller.enableRotate = false;
        controller.enableTranslate = false;
        controller.enableZoom = false;
        controller.enableTilt = false;
        controller.enableLook = false;
      }

      const initialTarget = cameraTargetRef.current;
      if (initialTarget) {
        const { lng, lat, height = 2000000, pitch = -45, heading = 0 } = initialTarget;
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(lng, lat, height),
          orientation: {
            heading: Cesium.Math.toRadians(heading),
            pitch: Cesium.Math.toRadians(pitch),
            roll: 0,
          },
        });
      } else {
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(78.0, 20.0, 24000000.0),
          orientation: {
            heading: 0,
            pitch: Cesium.Math.toRadians(-90),
            roll: 0,
          },
        });
      }

      let lastFrameTime = performance.now();
      const rotateCallback = () => {
        if (!autoRotateRef.current || isInteractingRef.current || !viewer || viewer.isDestroyed()) return;
        const now = performance.now();
        const elapsedSeconds = Math.min((now - lastFrameTime) / 1000, 0.1);
        lastFrameTime = now;
        scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.0003 * elapsedSeconds);
      };
      scene.postRender.addEventListener(rotateCallback);
      rotationListenerRef.current = rotateCallback;

      if (interactive) {
        const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handler.setInputAction(() => {
          isInteractingRef.current = true;
          clearInteractionTimeout();
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        handler.setInputAction(resumeRotationAfterInteraction, Cesium.ScreenSpaceEventType.LEFT_UP);
        handler.setInputAction(() => {
          isInteractingRef.current = true;
          resumeRotationAfterInteraction();
        }, Cesium.ScreenSpaceEventType.WHEEL);
        inputHandlerRef.current = handler;
      }

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          if (viewer && !viewer.isDestroyed()) viewer.resize();
        });
        resizeObserver.observe(containerRef.current);
      }

      setIsReady(true);
      onViewerReadyRef.current?.(viewer);
    } catch (err) {
      console.error('[CesiumGlobe init error]', err);
      if (viewer && !viewer.isDestroyed()) viewer.destroy();
      viewerRef.current = null;
      return () => {
        isCancelled = true;
        clearInteractionTimeout();
      };
    }

    return () => {
      isCancelled = true;
      resizeObserver?.disconnect();
      clearInteractionTimeout();

      if (inputHandlerRef.current) {
        inputHandlerRef.current.destroy();
        inputHandlerRef.current = null;
      }
      if (rotationListenerRef.current && viewer && !viewer.isDestroyed()) {
        viewer.scene.postRender.removeEventListener(rotationListenerRef.current);
        rotationListenerRef.current = null;
      }
      if (viewer && !viewer.isDestroyed()) viewer.destroy();
      if (viewerRef.current === viewer) viewerRef.current = null;
      if (containerRef.current) containerRef.current.replaceChildren();
    };
  }, [interactive]);

  const targetLng = cameraTarget?.lng;
  const targetLat = cameraTarget?.lat;
  const targetHeight = cameraTarget?.height ?? 2000000;
  const targetPitch = cameraTarget?.pitch ?? -45;
  const targetHeading = cameraTarget?.heading ?? 0;
  const targetDuration = cameraTarget?.duration ?? 1.4;

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!isReady || !viewer || viewer.isDestroyed() || targetLng == null || targetLat == null) return undefined;

    viewer.camera.cancelFlight();
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(targetLng, targetLat, targetHeight),
      orientation: {
        heading: Cesium.Math.toRadians(targetHeading),
        pitch: Cesium.Math.toRadians(targetPitch),
        roll: 0,
      },
      duration: targetDuration,
      easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
    });

    return () => {
      if (!viewer.isDestroyed()) viewer.camera.cancelFlight();
    };
  }, [targetLng, targetLat, targetHeight, targetPitch, targetHeading, targetDuration, isReady]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!isReady || !viewer || viewer.isDestroyed()) return;

    viewer.entities.removeAll();
    markers.forEach((marker) => {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(marker.lng, marker.lat, marker.height || 0),
        point: {
          pixelSize: 8,
          color: Cesium.Color.fromCssColorString('#38bdf8'),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 1.5,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: marker.title ? {
          text: marker.title.toLowerCase(),
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

    if (highlightRegion) {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(highlightRegion.lng, highlightRegion.lat),
        ellipse: {
          semiMinorAxis: highlightRegion.radius || 45000,
          semiMajorAxis: highlightRegion.radius || 45000,
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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,4,8,0.4)_70%,rgba(2,4,8,0.9)_100%)]" />
    </div>
  );
}

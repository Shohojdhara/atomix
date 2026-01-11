import React, { memo } from 'react';
import type { DisplacementMode } from '../../lib/types/components';
import type { FragmentShaderType } from './shader-utils';
import { getDisplacementMap } from './glass-utils';
import { displacementMap, polarDisplacementMap, prominentDisplacementMap } from './utils';

interface GlassFilterProps {
  id: string;
  displacementScale: number;
  aberrationIntensity: number;
  mode: DisplacementMode;
  shaderMapUrl?: string;
  blurAmount: number;
}

/**
 * GlassFilter - SVG filter component for glass morphism effects
 * Creates chromatic aberration and edge distortion effects using SVG filters
 */
const GlassFilterComponent: React.FC<GlassFilterProps> = ({
  id,
  displacementScale,
  aberrationIntensity,
  mode,
  shaderMapUrl,
  blurAmount,
}) => (
  <svg
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      inset: 0,
    }}
    aria-hidden="true"
  >
    <defs>
      <radialGradient
        id={`${id}-edge-mask`}
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop offset="0%" stopColor="black" stopOpacity="0" />
        <stop
          offset={`${Math.max(30, 80 - aberrationIntensity * 2)}%`}
          stopColor="black"
          stopOpacity="0"
        />
        <stop offset="100%" stopColor="white" stopOpacity="1" />
      </radialGradient>
      <filter
        id={id}
        x="-35%"
        y="-35%"
        width="170%"
        height="170%"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          id={`${id}-image`}
          x="0"
          y="0"
          width="100%"
          height="100%"
          result="DISPLACEMENT_MAP"
          href={getDisplacementMap(mode, displacementMap, polarDisplacementMap, prominentDisplacementMap, shaderMapUrl)}
          preserveAspectRatio="xMidYMid slice"
        />

        <feColorMatrix
          in="DISPLACEMENT_MAP"
          type="matrix"
          values="0.3 0.3 0.3 0 0
                 0.3 0.3 0.3 0 0
                 0.3 0.3 0.3 0 0
                 0 0 0 1 0"
          result="EDGE_INTENSITY"
        />
        <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
          <feFuncA type="discrete" tableValues={`0 ${aberrationIntensity * 0.05} 1`} />
        </feComponentTransfer>

        <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          scale={displacementScale * (mode === 'shader' ? 1 : -1)}
          xChannelSelector="R"
          yChannelSelector="B"
          result="RED_DISPLACED"
        />
        <feColorMatrix
          in="RED_DISPLACED"
          type="matrix"
          values="1 0 0 0 0
                 0 0 0 0 0
                 0 0 0 0 0
                 0 0 0 1 0"
          result="RED_CHANNEL"
        />

        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          scale={displacementScale * ((mode === 'shader' ? 1 : -1) - aberrationIntensity * 0.02)}
          xChannelSelector="R"
          yChannelSelector="B"
          result="GREEN_DISPLACED"
        />
        <feColorMatrix
          in="GREEN_DISPLACED"
          type="matrix"
          values="0 0 0 0 0
                 0 1 0 0 0
                 0 0 0 0 0
                 0 0 0 1 0"
          result="GREEN_CHANNEL"
        />

        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          scale={displacementScale * ((mode === 'shader' ? 1 : -1) - aberrationIntensity * 0.03)}
          xChannelSelector="R"
          yChannelSelector="B"
          result="BLUE_DISPLACED"
        />
        <feColorMatrix
          in="BLUE_DISPLACED"
          type="matrix"
          values="0 0 0 0 0
                 0 0 0 0 0
                 0 0 1 0 0
                 0 0 0 1 0"
          result="BLUE_CHANNEL"
        />

        <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
        <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

        <feGaussianBlur
          in="RGB_COMBINED"
          result="ABERRATED_BLURRED"
          stdDeviation={blurAmount * aberrationIntensity * 0.05}
        />

        <feComposite
          in="ABERRATED_BLURRED"
          in2="EDGE_MASK"
          operator="in"
          result="EDGE_ABERRATION"
        />

        <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />

        <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
      </filter>
    </defs>
  </svg>
);

GlassFilterComponent.displayName = 'GlassFilter';

// Memoize component to prevent unnecessary re-renders
export const GlassFilter = memo(GlassFilterComponent, (prevProps, nextProps) => {
  // Custom comparison: only re-render if props actually changed
  return (
    prevProps.id === nextProps.id &&
    prevProps.displacementScale === nextProps.displacementScale &&
    prevProps.aberrationIntensity === nextProps.aberrationIntensity &&
    prevProps.mode === nextProps.mode &&
    prevProps.shaderMapUrl === nextProps.shaderMapUrl &&
    prevProps.blurAmount === nextProps.blurAmount
  );
});


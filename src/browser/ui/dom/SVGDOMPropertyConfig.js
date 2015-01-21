/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SVGDOMPropertyConfig
 */

/*jslint bitwise: true*/

'use strict';

var DOMProperty = require('DOMProperty');

var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;

var SVGDOMPropertyConfig = {
  Properties: {
    accentHeight: MUST_USE_ATTRIBUTE,
    accumulate: MUST_USE_ATTRIBUTE,
    alignmentBaseline: MUST_USE_ATTRIBUTE,
    alphabetic: MUST_USE_ATTRIBUTE,
    amplitude: MUST_USE_ATTRIBUTE,
    animate: MUST_USE_ATTRIBUTE,
    arabicForm: MUST_USE_ATTRIBUTE,
    ascent: MUST_USE_ATTRIBUTE,
    attributeType: MUST_USE_ATTRIBUTE,
    azimuth: MUST_USE_ATTRIBUTE,
    baseFrequency: MUST_USE_ATTRIBUTE,
    baseProfile: MUST_USE_ATTRIBUTE,
    baselineShift: MUST_USE_ATTRIBUTE,
    bbox: MUST_USE_ATTRIBUTE,
    bias: MUST_USE_ATTRIBUTE,
    by: MUST_USE_ATTRIBUTE,
    calcMode: MUST_USE_ATTRIBUTE,
    capHeight: MUST_USE_ATTRIBUTE,
    'class': MUST_USE_ATTRIBUTE,
    clip: MUST_USE_ATTRIBUTE,
    clipPath: MUST_USE_ATTRIBUTE,
    clipPathUnits: MUST_USE_ATTRIBUTE,
    clipRule: MUST_USE_ATTRIBUTE,
    color: MUST_USE_ATTRIBUTE,
    colorInterpolation: MUST_USE_ATTRIBUTE,
    colorInterpolationFilters: MUST_USE_ATTRIBUTE,
    colorProfile: MUST_USE_ATTRIBUTE,
    colorRendering: MUST_USE_ATTRIBUTE,
    contentScriptType: MUST_USE_ATTRIBUTE,
    contentStyleType: MUST_USE_ATTRIBUTE,
    cursor: MUST_USE_ATTRIBUTE,
    cx: MUST_USE_ATTRIBUTE,
    cy: MUST_USE_ATTRIBUTE,
    d: MUST_USE_ATTRIBUTE,
    descent: MUST_USE_ATTRIBUTE,
    diffuseConstant: MUST_USE_ATTRIBUTE,
    direction: MUST_USE_ATTRIBUTE,
    display: MUST_USE_ATTRIBUTE,
    divisor: MUST_USE_ATTRIBUTE,
    dominantBaseline: MUST_USE_ATTRIBUTE,
    dur: MUST_USE_ATTRIBUTE,
    dx: MUST_USE_ATTRIBUTE,
    dy: MUST_USE_ATTRIBUTE,
    edgeMode: MUST_USE_ATTRIBUTE,
    elevation: MUST_USE_ATTRIBUTE,
    enableBackground: MUST_USE_ATTRIBUTE,
    end: MUST_USE_ATTRIBUTE,
    exponent: MUST_USE_ATTRIBUTE,
    externalResourcesRequired: MUST_USE_ATTRIBUTE,
    feColorMatrix: MUST_USE_ATTRIBUTE,
    feComposite: MUST_USE_ATTRIBUTE,
    feGaussianBlur: MUST_USE_ATTRIBUTE,
    feMorphology: MUST_USE_ATTRIBUTE,
    feTile: MUST_USE_ATTRIBUTE,
    fill: MUST_USE_ATTRIBUTE,
    fillOpacity: MUST_USE_ATTRIBUTE,
    fillRule: MUST_USE_ATTRIBUTE,
    filter: MUST_USE_ATTRIBUTE,
    filterRes: MUST_USE_ATTRIBUTE,
    filterUnits: MUST_USE_ATTRIBUTE,
    floodColor: MUST_USE_ATTRIBUTE,
    floodOpacity: MUST_USE_ATTRIBUTE,
    fontFamily: MUST_USE_ATTRIBUTE,
    fontSize: MUST_USE_ATTRIBUTE,
    fontSizeAdjust: MUST_USE_ATTRIBUTE,
    fontStretch: MUST_USE_ATTRIBUTE,
    fontStyle: MUST_USE_ATTRIBUTE,
    fontVariant: MUST_USE_ATTRIBUTE,
    fontWeight: MUST_USE_ATTRIBUTE,
    format: MUST_USE_ATTRIBUTE,
    from: MUST_USE_ATTRIBUTE,
    fx: MUST_USE_ATTRIBUTE,
    fy: MUST_USE_ATTRIBUTE,
    g1: MUST_USE_ATTRIBUTE,
    g2: MUST_USE_ATTRIBUTE,
    glyphName: MUST_USE_ATTRIBUTE,
    glyphOrientationHorizontal: MUST_USE_ATTRIBUTE,
    glyphOrientationVertical: MUST_USE_ATTRIBUTE,
    glyphRef: MUST_USE_ATTRIBUTE,
    gradientTransform: MUST_USE_ATTRIBUTE,
    gradientUnits: MUST_USE_ATTRIBUTE,
    hanging: MUST_USE_ATTRIBUTE,
    height: MUST_USE_ATTRIBUTE,
    horizAdvX: MUST_USE_ATTRIBUTE,
    horizOriginX: MUST_USE_ATTRIBUTE,
    horizOriginY: MUST_USE_ATTRIBUTE,
    ideographic: MUST_USE_ATTRIBUTE,
    imageRendering: MUST_USE_ATTRIBUTE,
    in2: MUST_USE_ATTRIBUTE,
    'in': MUST_USE_ATTRIBUTE,
    intercept: MUST_USE_ATTRIBUTE,
    k1: MUST_USE_ATTRIBUTE,
    k2: MUST_USE_ATTRIBUTE,
    k3: MUST_USE_ATTRIBUTE,
    k4: MUST_USE_ATTRIBUTE,
    k: MUST_USE_ATTRIBUTE,
    kernelMatrix: MUST_USE_ATTRIBUTE,
    kernelUnitLength: MUST_USE_ATTRIBUTE,
    kerning: MUST_USE_ATTRIBUTE,
    keyPoints: MUST_USE_ATTRIBUTE,
    keySplines: MUST_USE_ATTRIBUTE,
    keyTimes: MUST_USE_ATTRIBUTE,
    lang: MUST_USE_ATTRIBUTE,
    lengthAdjust: MUST_USE_ATTRIBUTE,
    letterSpacing: MUST_USE_ATTRIBUTE,
    lightingColor: MUST_USE_ATTRIBUTE,
    limitingConeAngle: MUST_USE_ATTRIBUTE,
    local: MUST_USE_ATTRIBUTE,
    markerEnd: MUST_USE_ATTRIBUTE,
    markerHeight: MUST_USE_ATTRIBUTE,
    markerMid: MUST_USE_ATTRIBUTE,
    markerStart: MUST_USE_ATTRIBUTE,
    markerUnits: MUST_USE_ATTRIBUTE,
    markerWidth: MUST_USE_ATTRIBUTE,
    mask: MUST_USE_ATTRIBUTE,
    maskContentUnits: MUST_USE_ATTRIBUTE,
    maskUnits: MUST_USE_ATTRIBUTE,
    mathematical: MUST_USE_ATTRIBUTE,
    max: MUST_USE_ATTRIBUTE,
    media: MUST_USE_ATTRIBUTE,
    method: MUST_USE_ATTRIBUTE,
    min: MUST_USE_ATTRIBUTE,
    mode: MUST_USE_ATTRIBUTE,
    name: MUST_USE_ATTRIBUTE,
    numOctaves: MUST_USE_ATTRIBUTE,
    offset: MUST_USE_ATTRIBUTE,
    opacity: MUST_USE_ATTRIBUTE,
    operator: MUST_USE_ATTRIBUTE,
    order: MUST_USE_ATTRIBUTE,
    orient: MUST_USE_ATTRIBUTE,
    orientation: MUST_USE_ATTRIBUTE,
    origin: MUST_USE_ATTRIBUTE,
    overflow: MUST_USE_ATTRIBUTE,
    overlinePosition: MUST_USE_ATTRIBUTE,
    overlineThickness: MUST_USE_ATTRIBUTE,
    panose1: MUST_USE_ATTRIBUTE,
    path: MUST_USE_ATTRIBUTE,
    pathLength: MUST_USE_ATTRIBUTE,
    patternContentUnits: MUST_USE_ATTRIBUTE,
    patternTransform: MUST_USE_ATTRIBUTE,
    patternUnits: MUST_USE_ATTRIBUTE,
    pointerEvents: MUST_USE_ATTRIBUTE,
    points: MUST_USE_ATTRIBUTE,
    pointsAtX: MUST_USE_ATTRIBUTE,
    pointsAtY: MUST_USE_ATTRIBUTE,
    pointsAtZ: MUST_USE_ATTRIBUTE,
    preserveAlpha: MUST_USE_ATTRIBUTE,
    preserveAspectRatio: MUST_USE_ATTRIBUTE,
    primitiveUnits: MUST_USE_ATTRIBUTE,
    r: MUST_USE_ATTRIBUTE,
    radius: MUST_USE_ATTRIBUTE,
    refX: MUST_USE_ATTRIBUTE,
    refY: MUST_USE_ATTRIBUTE,
    renderingIntent: MUST_USE_ATTRIBUTE,
    repeatCount: MUST_USE_ATTRIBUTE,
    repeatDur: MUST_USE_ATTRIBUTE,
    requiredExtensions: MUST_USE_ATTRIBUTE,
    restart: MUST_USE_ATTRIBUTE,
    result: MUST_USE_ATTRIBUTE,
    rotate: MUST_USE_ATTRIBUTE,
    rx: MUST_USE_ATTRIBUTE,
    ry: MUST_USE_ATTRIBUTE,
    scale: MUST_USE_ATTRIBUTE,
    seed: MUST_USE_ATTRIBUTE,
    shapeRendering: MUST_USE_ATTRIBUTE,
    slope: MUST_USE_ATTRIBUTE,
    spacing: MUST_USE_ATTRIBUTE,
    specularConstant: MUST_USE_ATTRIBUTE,
    specularExponent: MUST_USE_ATTRIBUTE,
    spreadMethod: MUST_USE_ATTRIBUTE,
    startOffset: MUST_USE_ATTRIBUTE,
    stdDeviation: MUST_USE_ATTRIBUTE,
    stemh: MUST_USE_ATTRIBUTE,
    stemv: MUST_USE_ATTRIBUTE,
    stitchTiles: MUST_USE_ATTRIBUTE,
    stopColor: MUST_USE_ATTRIBUTE,
    stopOpacity: MUST_USE_ATTRIBUTE,
    strikethroughPosition: MUST_USE_ATTRIBUTE,
    strikethroughThickness: MUST_USE_ATTRIBUTE,
    stroke: MUST_USE_ATTRIBUTE,
    strokeDasharray: MUST_USE_ATTRIBUTE,
    strokeDashoffset: MUST_USE_ATTRIBUTE,
    strokeLinecap: MUST_USE_ATTRIBUTE,
    strokeLinejoin: MUST_USE_ATTRIBUTE,
    strokeMiterlimit: MUST_USE_ATTRIBUTE,
    strokeOpacity: MUST_USE_ATTRIBUTE,
    strokeWidth: MUST_USE_ATTRIBUTE,
    style: MUST_USE_ATTRIBUTE,
    surfaceScale: MUST_USE_ATTRIBUTE,
    systemLanguage: MUST_USE_ATTRIBUTE,
    tableValues: MUST_USE_ATTRIBUTE,
    target: MUST_USE_ATTRIBUTE,
    targetX: MUST_USE_ATTRIBUTE,
    targetY: MUST_USE_ATTRIBUTE,
    textAnchor: MUST_USE_ATTRIBUTE,
    textDecoration: MUST_USE_ATTRIBUTE,
    textLength: MUST_USE_ATTRIBUTE,
    textRendering: MUST_USE_ATTRIBUTE,
    title: MUST_USE_ATTRIBUTE,
    to: MUST_USE_ATTRIBUTE,
    transform: MUST_USE_ATTRIBUTE,
    type: MUST_USE_ATTRIBUTE,
    u1: MUST_USE_ATTRIBUTE,
    u2: MUST_USE_ATTRIBUTE,
    underlinePosition: MUST_USE_ATTRIBUTE,
    underlineThickness: MUST_USE_ATTRIBUTE,
    unicode: MUST_USE_ATTRIBUTE,
    unicodeBidi: MUST_USE_ATTRIBUTE,
    unicodeRange: MUST_USE_ATTRIBUTE,
    unitsPerEm: MUST_USE_ATTRIBUTE,
    vAlphabetic: MUST_USE_ATTRIBUTE,
    vHanging: MUST_USE_ATTRIBUTE,
    vIdeographic: MUST_USE_ATTRIBUTE,
    vMathematical: MUST_USE_ATTRIBUTE,
    values: MUST_USE_ATTRIBUTE,
    version: MUST_USE_ATTRIBUTE,
    vertAdvY: MUST_USE_ATTRIBUTE,
    vertOriginX: MUST_USE_ATTRIBUTE,
    vertOriginY: MUST_USE_ATTRIBUTE,
    viewBox: MUST_USE_ATTRIBUTE,
    viewTarget: MUST_USE_ATTRIBUTE,
    visibility: MUST_USE_ATTRIBUTE,
    width: MUST_USE_ATTRIBUTE,
    widths: MUST_USE_ATTRIBUTE,
    wordSpacing: MUST_USE_ATTRIBUTE,
    writingMode: MUST_USE_ATTRIBUTE,
    x1: MUST_USE_ATTRIBUTE,
    x2: MUST_USE_ATTRIBUTE,
    x: MUST_USE_ATTRIBUTE,
    xChannelSelector: MUST_USE_ATTRIBUTE,
    xHeight: MUST_USE_ATTRIBUTE,
    xmlns: MUST_USE_ATTRIBUTE,
    y1: MUST_USE_ATTRIBUTE,
    y2: MUST_USE_ATTRIBUTE,
    y: MUST_USE_ATTRIBUTE,
    yChannelSelector: MUST_USE_ATTRIBUTE,
    z: MUST_USE_ATTRIBUTE,
    zoomAndPan: MUST_USE_ATTRIBUTE
  },
  DOMAttributeNames: {
    accentHeight: 'accent-height',
    alignmentBaseline: 'alignment-baseline',
    arabicForm: 'arabic-form',
    attributeType: 'attributeType',
    baseFrequency: 'baseFrequency',
    baseProfile: 'baseProfile',
    baselineShift: 'baseline-shift',
    calcMode: 'calcMode',
    capHeight: 'cap-height',
    clipPath: 'clip-path',
    clipPathUnits: 'clipPathUnits',
    clipRule: 'clip-rule',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    contentScriptType: 'contentScriptType',
    contentStyleType: 'contentStyleType',
    diffuseConstant: 'diffuseConstant',
    dominantBaseline: 'dominant-baseline',
    edgeMode: 'edgeMode',
    enableBackground: 'enable-background',
    externalResourcesRequired: 'externalResourcesRequired',
    feColorMatrix: 'feColorMatrix',
    feComposite: 'feComposite',
    feGaussianBlur: 'feGaussianBlur',
    feMorphology: 'feMorphology',
    feTile: 'feTile',
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    filterRes: 'filterRes',
    filterUnits: 'filterUnits',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    glyphRef: 'glyphRef',
    gradientTransform: 'gradientTransform',
    gradientUnits: 'gradientUnits',
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    horizOriginY: 'horiz-origin-y',
    imageRendering: 'image-rendering',
    kernelMatrix: 'kernelMatrix',
    kernelUnitLength: 'kernelUnitLength',
    keyPoints: 'keyPoints',
    keySplines: 'keySplines',
    keyTimes: 'keyTimes',
    lengthAdjust: 'lengthAdjust',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    limitingConeAngle: 'limitingConeAngle',
    markerEnd: 'marker-end',
    markerHeight: 'markerHeight',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    markerUnits: 'markerUnits',
    markerWidth: 'markerWidth',
    maskContentUnits: 'maskContentUnits',
    maskUnits: 'maskUnits',
    numOctaves: 'numOctaves',
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    panose1: 'panose-1',
    pathLength: 'pathLength',
    patternContentUnits: 'patternContentUnits',
    patternTransform: 'patternTransform',
    patternUnits: 'patternUnits',
    pointerEvents: 'pointer-events',
    pointsAtX: 'pointsAtX',
    pointsAtY: 'pointsAtY',
    pointsAtZ: 'pointsAtZ',
    preserveAlpha: 'preserveAlpha',
    preserveAspectRatio: 'preserveAspectRatio',
    primitiveUnits: 'primitiveUnits',
    refX: 'refX',
    refY: 'refY',
    renderingIntent: 'rendering-intent',
    repeatCount: 'repeatCount',
    repeatDur: 'repeatDur',
    requiredExtensions: 'requiredExtensions',
    shapeRendering: 'shape-rendering',
    specularConstant: 'specularConstant',
    specularExponent: 'specularExponent',
    spreadMethod: 'spreadMethod',
    startOffset: 'startOffset',
    stdDeviation: 'stdDeviation',
    stitchTiles: 'stitchTiles',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    strokeDasharray: 'stroke-dasharray',
    strokeDashoffset: 'stroke-dashoffset',
    strokeLinecap: 'stroke-linecap',
    strokeLinejoin: 'stroke-linejoin',
    strokeMiterlimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    surfaceScale: 'surfaceScale',
    systemLanguage: 'systemLanguage',
    tableValues: 'tableValues',
    targetX: 'targetX',
    targetY: 'targetY',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textLength: 'textLength',
    textRendering: 'text-rendering',
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    viewBox: 'viewBox',
    viewTarget: 'viewTarget',
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    xChannelSelector: 'xChannelSelector',
    xHeight: 'x-height',
    yChannelSelector: 'yChannelSelector',
    zoomAndPan: 'zoomAndPan'
  }
};

module.exports = SVGDOMPropertyConfig;

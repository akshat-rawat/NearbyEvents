import React from 'react';
import { View, ViewProps } from 'react-native';

const MockMapView = (props: ViewProps) => <View {...props} />;
const MockMarker = (props: ViewProps) => <View {...props} />;
const MockCallout = (props: ViewProps) => <View {...props} />;

export const Marker = MockMarker;
export const Callout = MockCallout;

export default MockMapView;

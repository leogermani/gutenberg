
/**
 * External dependencies
 */
import React from 'react';
import { View } from 'react-native';
/**
 * WordPress dependencies
 */
import {
	PanelBody,
} from '@wordpress/components';

import {
	InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './editor.scss';

const getInspectorControls = () => (
	<InspectorControls>
		<PanelBody title={ __( 'SpacerSettings' ) } >
		</PanelBody>
	</InspectorControls>
);

export class SpacerEdit extends React.Component {
	render() {
		return (
			<View style={ [ styles.staticSpacer, { flex: 1 } ] }>
				{ getInspectorControls() }
			</View>
		);
	}
}

export default SpacerEdit;

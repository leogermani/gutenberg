/**
 * WordPress dependencies
 */
import { withInstanceId, compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import PostTypeSupportCheck from '../post-type-support-check';

export function PostSlugCheck( { children } ) {
	return <PostTypeSupportCheck supportKeys="slug">{ children }</PostTypeSupportCheck>;
}

export default compose( [
	withSelect( ( select ) => {
		const { getCurrentPostType } = select( 'core/editor' );
		return {
			postType: getCurrentPostType(),
		};
	} ),
	withInstanceId,
] )( PostSlugCheck );

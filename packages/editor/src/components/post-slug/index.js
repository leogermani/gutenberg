/**
 * WordPress dependencies
 */
import { withDispatch, withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { withInstanceId, compose } from '@wordpress/compose';
import { safeDecodeURIComponent } from '@wordpress/url';

/**
 * Internal dependencies
 */
import PostSlugCheck from './check';
import { cleanForSlug } from '../../utils/url';

class PostSlug extends Component {
	constructor() {
		super( ...arguments );

		this.setSlug = this.setSlug.bind( this );
	}

	setSlug( event, clean ) {
		const { onUpdateSlug } = this.props;
		const { value } = event.target;

		const editedSlug = clean ? cleanForSlug( value ) : value;

		onUpdateSlug( editedSlug );
	}

	render() {
		const { postSlug, postTitle, postID, instanceId } = this.props;

		const slug = safeDecodeURIComponent( postSlug ) || cleanForSlug( postTitle ) || postID;
		const inputId = 'post-slug-input-' + instanceId;

		return (
			<PostSlugCheck>
				<label htmlFor={ inputId }>{ __( 'Slug' ) }</label>
				<input
					type="text"
					id={ inputId }
					value={ slug }
					onChange={ ( event ) => this.setSlug( event, false ) }
					onBlur={ ( event ) => this.setSlug( event, true ) }
					className="editor-post-slug__input"
				/>
			</PostSlugCheck>
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const {
			getCurrentPost,
			getEditedPostAttribute,
		} = select( 'core/editor' );

		const { id } = getCurrentPost();
		return {
			postSlug: getEditedPostAttribute( 'slug' ),
			postTitle: getEditedPostAttribute( 'title' ),
			postID: id,
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { editPost } = dispatch( 'core/editor' );
		return {
			onUpdateSlug( slug ) {
				editPost( { slug } );
			},
		};
	} ),
	withInstanceId,
] )( PostSlug );

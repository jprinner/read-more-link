/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

import { __ } from '@wordpress/i18n';

export default function save( { attributes } ) {
  const {
    linkText,
    linkUrl,
  } = attributes;

  const blockProps = useBlockProps.save( {
    className: 'read-more-js',
  } );

  return (
    <div {...blockProps}>
      <span className="read-more-js__link"><span class="read-more-js__read-more">Read More: </span>
        <a rel="noreferrer noopener" href={linkUrl}>
          <RichText.Content value={linkText}/>
        </a>
      </span>
    </div>
  );
}

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { RichText, URLInput, URLPopover, useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { Button, IconButton } from '@wordpress/components';

import { useState } from '@wordpress/element';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, isSelected, setAttributes } ) {
  const [ showURLPopover, setPopover ] = useState( false );

  const {
    linkText,
    linkUrl,
  } = attributes;

  const blockProps = useBlockProps( {
    className: 'read-more-js',
  } );

  return (
  <div {...blockProps}>
    {isSelected && (
      <IconButton
        className="read-more-js__link-button"
        icon={'admin-links'}
        onClick={ () => setPopover( true ) }
      >
      { isSelected && showURLPopover && (
        <URLPopover
          onClose={ () => setPopover( false ) }
        >
          <form
            className="block-editor-url-popover__link-editor"
              onSubmit={ ( event ) => {
              event.preventDefault();
              setPopover( false );
            } } >
            <div className="editor-url-input block-editor-url-input">

              <URLInput
                value={ linkUrl }
                onChange={ ( linkUrl, post ) => setAttributes( { linkUrl, linkText: (post && post.title)} ) }
                placeholder={ __( 'Enter Url' ) }
              />
            </div>
            <IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
          </form>
        </URLPopover>
      )}
      </IconButton>
    )}

    <span className="read-more-js__link"><span class="read-more-js__read-more">Read More: </span>
      <RichText
        formattingControls={[]}
        placeholder={__('Select a link to display a title here')}
        tagName="span"
        value={linkText}
        onChange={linkText => setAttributes({linkText})}
      />
    </span>
  </div>
  );
}

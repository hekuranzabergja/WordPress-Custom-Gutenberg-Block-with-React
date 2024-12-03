import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, Spinner } from '@wordpress/components';

registerBlockType('custom/post-list', {
    title: 'Post List',
    category: 'widgets',
    attributes: {
        category: { type: 'string', default: null },
        heading: { type: 'string', default: '' },
        categoryName: { type: 'string', default: '' }, // To store category name
    },
    edit: ({ attributes, setAttributes }) => {
        const { category, heading, categoryName } = attributes;
    
        const categories = useSelect((select) =>
            select('core').getEntityRecords('taxonomy', 'category')
        );
    
        const posts = useSelect((select) => {
            if (!category || category === '0') return null; 
            return select('core').getEntityRecords('postType', 'post', {
                categories: category,
                per_page: 5,
            });
        });
        
    
        if (!categories) return <Spinner />;
        if (!categories.length) return <p>No categories available.</p>;
    
        const categoryOptions = [
            { label: 'Select a category', value: '' },
            ...categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
            })),
        ];
    
        const selectedCategory = categories.find((cat) => cat.id === parseInt(category));
        if (selectedCategory && selectedCategory.name !== categoryName) {
            setAttributes({ categoryName: selectedCategory.name });
        }
    
        return (
            <>
                <InspectorControls>
                    <PanelBody title="Settings">
                        <TextControl
                            label="Heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                        />
                        <SelectControl
                            label="Category"
                            value={category}
                            options={categoryOptions}
                            onChange={(value) => {
                                if (value !== category) {
                                    setAttributes({ category: value });
                                    console.log('Category updated to:', value);
                                }
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
    
                <div className="post-list-block">
                    {heading && <h2>{heading}</h2>}
                    {!category && <p>Please select a category.</p>}
    
                    {category && posts === null && <Spinner />}
                    {category && posts?.length === 0 && <p>No posts available in this category.</p>}
    
                    {posts?.length > 0 && (
                        <ul>
                            {posts.map((post) => (
                                <li key={post.id}>
                                    <h3>{post.title.rendered}</h3>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                    />
                                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                                        Read More
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </>
        );
    },
    

    save: ({ attributes }) => {
        const { heading, categoryName } = attributes;

        return (
            <div className="custom-post-list-block">
                {heading && <h2>{heading}</h2>}
                <p>Posts for category: {categoryName || 'No category selected'}</p>
            </div>
        );
    },
});


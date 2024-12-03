# WordPress-Custom-Gutenberg-Block-with-React

A custom Gutenberg block to display posts filtered by category.

## Setup Instructions

1. Place the plugin folder in the `wp-content/plugins` directory.
2. Activate the plugin from the WordPress admin dashboard.
3. Edit a page or post in the WordPress editor and add the "Post List" block.

## Features
s
- Dynamically populated category dropdown.
- Custom heading field.
- Displays post title, excerpt, and "Read More" link.
- Server-side rendering for optimized output.

## File Structure

- `custom-block.php` - Registers the block and handles server-side rendering.
- `block.js` - Defines the block using React.
- `style.css` - Frontend styles.
- `editor.css` - Editor styles.

## Validation

- Ensures a category is selected before rendering posts.
- Displays a  message if no posts are available.



 ## Install Dependencies

After placing the plugin in the `wp-content/plugins` directory, navigate to the plugin's folder in the terminal, and run the following commands to install npm dependencies:
Inside  `wp-content/plugins/custom-post-list-block`
```bash
npm init -y  # Initializes the npm project and generates a package.json file
npm install  # Installs all the required dependencies from package.json

npm run build  # Builds the plugin's block and prepares it for production

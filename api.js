// api.js
// Basic CRUD operations for Products with controlled request handling

async function getAllProducts() {
    try {
        const response = await fetch('http://localhost:8000/api/products/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
}

async function createProduct(productData) {
    try {
        const response = await fetch('http://localhost:8000/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
        return null;
    }
}

async function updateProduct(id, productData) {
    try {
        const response = await fetch(`http://localhost:8000/api/products/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/products/${id}/`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(`Product with ID ${id} was deleted successfully.`);
        return true;
    } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        return false;
    }
}

// Prevent multiple requests
let isInitialLoadComplete = false;

document.addEventListener('DOMContentLoaded', async () => {
    if (!isInitialLoadComplete) {
        try {
            // Fetch products only once
            const products = await getAllProducts();

            // Create a product only if fetch is successful and no product exists
            if (products && products.length === 0) {
                await createProduct({
                    name: 'New Product',
                    price: 19.99,
                    description: 'A sample product'
                });
            }

            isInitialLoadComplete = true;
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }
});
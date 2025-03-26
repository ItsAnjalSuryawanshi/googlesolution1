import React, { useState, useEffect } from 'react';
import './Posts.css'; // Create a Posts.css for styling

function Posts() {
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');

    useEffect(() => {
        // --- Fetch Posts ---
        const fetchPosts = async () => {
            try {
                // Replace '/api/posts' with your actual API endpoint to get posts
                const response = await fetch('/api/posts', {
                    headers: {
                        'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Include auth token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    console.error('Failed to fetch posts');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPosts();
    }, []); // Fetch posts on component mount

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleCreatePost = async () => {
        if (!image) {
            alert('Please select an image.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('caption', caption);

            // --- Create Post ---
            // Replace '/api/posts' with your actual API endpoint to create posts
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Include auth token
                    // 'Content-Type': 'multipart/form-data' -  Fetch automatically sets this
                },
                body: formData,
            });

            if (response.ok) {
                console.log('Post created successfully');
                // Optionally: Fetch posts again to update the display
                fetchPosts();
                setImage(null);
                setCaption('');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="posts-container">
            <h2>Posts</h2>

            <div className="create-post-section">
                <h3>Create Post</h3>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <textarea
                    placeholder="Add a caption..."
                    value={caption}
                    onChange={handleCaptionChange}
                />
                <button onClick={handleCreatePost}>Post</button>
            </div>

            <div className="posts-display-section">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="post">
                            {post.imageUrl && <img src={post.imageUrl} alt={post.caption} />}
                            <div className="post-caption">{post.caption}</div>
                            <div className="post-author">{post.author}</div> {/* Assuming author info is available */}
                            {/* Add other post details as needed */}
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
}

export default Posts;

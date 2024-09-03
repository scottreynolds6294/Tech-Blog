const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = document.querySelector('#post-id').value;  // Assuming you have a hidden input with the post ID

    if (comment_text) {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ comment_text, post_id }), // Include post_id in the request body
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.replace(`/post/${post_id}`);  // Redirect to the specific post page
            } else {
                alert('Failed to create comment: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the comment.');
        }
    } else {
        alert('Please enter a comment.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.new-comment-form');
    if (form) {
        form.addEventListener('submit', newCommentHandler);
    }
});

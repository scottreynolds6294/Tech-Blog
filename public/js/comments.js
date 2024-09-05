const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = document.querySelector('#post-id').value;  

    if (comment_text) {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ comment_text, post_id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.replace(`/post/${post_id}`); 
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

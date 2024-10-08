const newFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    
    if(title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
};

const editPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-post-content').value.trim();
    const postId = window.location.pathname.split('/').pop();

    if(title && content) { 
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    }
 };

 const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const postId = event.target.getAttribute('data-id');

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to delete post: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the post.');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.querySelector('.new-post-form');
    if (newPostForm) {
        newPostForm.addEventListener('submit', newFormHandler);
    }

    const editPostForm = document.querySelector('.edit-post-form');
    if (editPostForm) {
        editPostForm.addEventListener('submit', editPostHandler);
    }

    const delButton = document.querySelector('#delete-button');
    if (delButton) {
        delButton.addEventListener('click', delButtonHandler);
    }
});

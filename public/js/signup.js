const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log('Signup form submitted');

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log('Username:', username, 'Password:', password);

    if (username && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('Response:', response);

        if (response.ok) {
            console.log('Signup successful');
            document.location.replace('/');
        } else {
            console.log('Signup failed:', response.statusText);
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
// Select elements
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const addPostBtn = document.getElementById('add-post-btn');
const postsContainer = document.getElementById('posts');
const editModal = document.getElementById('editModal');
const editTitleInput = document.getElementById('editTitle');
const editContentInput = document.getElementById('editContent');
const saveEditBtn = document.getElementById('save-edit-btn');
const closeModalBtn = document.querySelector('.close');

// Retrieve posts from local storage or create an empty array
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let editingIndex = null; // To track the post being edited

// Display all posts initially
displayPosts();

// Add a new post
addPostBtn.addEventListener('click', () => {
  const title = titleInput.value;
  const content = contentInput.value;

  if (title && content) {
    const post = { title, content, likes: 0 };
    posts.push(post);

    // Save to local storage
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear form fields
    titleInput.value = '';
    contentInput.value = '';

    // Display updated posts
    displayPosts();
  }
});

// Display posts
function displayPosts() {
  postsContainer.innerHTML = '<h2>All Blog Posts</h2>';

  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="actions">
        <button onclick="editPost(${index})">Edit</button>
        <button onclick="deletePost(${index})">Delete</button>
        <button class="like-btn" onclick="likePost(${index})">Like (${post.likes})</button>
      </div>
    `;
    postsContainer.appendChild(postDiv);
  });
}

// Edit a post (open modal)
function editPost(index) {
  editingIndex = index;
  const post = posts[index];

  editTitleInput.value = post.title;
  editContentInput.value = post.content;

  editModal.style.display = 'flex'; // Show the modal
}

// Save edited post
saveEditBtn.addEventListener('click', () => {
  posts[editingIndex].title = editTitleInput.value;
  posts[editingIndex].content = editContentInput.value;

  localStorage.setItem('posts', JSON.stringify(posts));

  editModal.style.display = 'none'; // Close the modal
  displayPosts();
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  editModal.style.display = 'none';
});

// Delete a post
function deletePost(index) {
  posts.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  displayPosts();
}

// Like a post
function likePost(index) {
  posts[index].likes += 1;
  localStorage.setItem('posts', JSON.stringify(posts));
  displayPosts();
}

// Close modal if clicked outside
window.onclick = (event) => {
  if (event.target == editModal) {
    editModal.style.display = 'none';
  }
};

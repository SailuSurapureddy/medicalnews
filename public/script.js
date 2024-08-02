// document.getElementById("save").addEventListener("click", function() {
//     this.classList.toggle("fas");
//     this.classList.toggle("far");
//     this.classList.toggle("saved");
// });
document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.getElementById('like');
    const likeCountSpan = document.getElementById('like-count');
    const saveButton = document.getElementById('save');

    // Function to fetch the current like and save data
    const fetchLikeData = () => {
        fetch('/like-data')
            .then(response => response.json())
            .then(data => {
                likeCountSpan.textContent = data.count;
                if (data.liked) {
                    likeButton.classList.add('fas');
                    likeButton.classList.add('liked');
                    likeButton.classList.remove('far');
                } else {
                    likeButton.classList.add('far');
                    likeButton.classList.remove('fas');
                    likeButton.classList.remove('liked');
                }
                if (data.saved) {
                    saveButton.classList.add('fas');
                    saveButton.classList.add('saved');
                    saveButton.classList.remove('far');
                } else {
                    saveButton.classList.add('far');
                    saveButton.classList.remove('fas');
                    saveButton.classList.remove('saved');
                }
            })
            .catch(error => console.error('Error fetching like data:', error));
    };

    // Function to handle like/unlike
    const toggleLike = () => {
        if (likeButton.classList.contains('liked')) {
            fetch('/unlike', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    likeButton.classList.remove('fas');
                    likeButton.classList.add('far');
                    likeButton.classList.remove('liked');
                    likeCountSpan.textContent = data.count;
                })
                .catch(error => console.error('Error unliking:', error));
        } else {
            fetch('/like', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    likeButton.classList.remove('far');
                    likeButton.classList.add('fas');
                    likeButton.classList.add('liked');
                    likeCountSpan.textContent = data.count;
                })
                .catch(error => console.error('Error liking:', error));
        }
    };

    // Function to handle save/unsave
    const toggleSave = () => {
        if (saveButton.classList.contains('saved')) {
            fetch('/unsave', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    saveButton.classList.remove('fas');
                    saveButton.classList.add('far');
                    saveButton.classList.remove('saved');
                })
                .catch(error => console.error('Error unsaving:', error));
        } else {
            fetch('/save', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    saveButton.classList.remove('far');
                    saveButton.classList.add('fas');
                    saveButton.classList.add('saved');
                })
                .catch(error => console.error('Error saving:', error));
        }
    };

    likeButton.addEventListener('click', toggleLike);
    saveButton.addEventListener('click', toggleSave);

    // Fetch initial like and save data on page load
    fetchLikeData();
});



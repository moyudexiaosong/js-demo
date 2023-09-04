const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

const getPosts = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json()
    return data
}

const showPosts = async () => {
    const posts = await getPosts();   
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class='number'>${post.id}</div>
            <div class='post-info'>
                <h2 class='post-title'>${post.title}</h2>
                <p class='post-body'>${post.body}</p>
            </div>
        `;
        postsContainer.appendChild(postEl)
    });
}

const showLoading = () => {
    loading.classList.add('show')
    setTimeout(() => {
        loading.classList.remove('show')
        setTimeout(() => {
            page+=1;
            showPosts();
        }, 300)
    }, 1000)
}

const filterPosts = (e) => {
    const item = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post')
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase()
        const body = post.querySelector('.post-body').innerText.toUpperCase()
        if (title.indexOf(item) > -1 || body.indexOf(item) > -1) {
            post.style.display = 'flex'
        } else {
            post.style.display = 'none'
        }
    })
}
showPosts()
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight -scrollHeight >= -10) {
        showLoading()
    }
})
filter.addEventListener('input', filterPosts)
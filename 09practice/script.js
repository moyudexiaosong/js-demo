const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

const showData = (data) => {
    result.innerHTML = `<ul class='songs'>
        ${data.data.map(item => 
        `<li>
                <span><strong>${item.artist.name}</strong> - ${item.title}</span>
                <button class='btn' data-artist='${item.artist.name}' data-songtitle='${item.title}'>查看歌词</button>
            </li>`
    ).join('')}
    </ul>`;
    if (data.prev || data.next) {
        if(typeof(data.prev)!=="undefined"){
            const prev=document.createElement('div');
            prev.innerHTML=`<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            more.appendChild(prev)
        }
        if(typeof(data.next)!=="undefined"){
            const next=document.createElement('div');
            next.innerHTML=`<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            more.appendChild(next)
        }
        // more.innerHTML = `${data.prev
        //         ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
        //         : ''
        //     }
        //   ${data.next
        //         ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
        //         : ''
        //     }`
    } else {
        more.innerHTML = ''
    }

}

const searchSongs = async (term) => {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const songs = await res.json();
    showData(songs)
}


const getMoreSongs = async (url) => {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data)
}

const getLyrics = async (artist, songTitle) => {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    if (data.error) {
        result.innerHTML = data.error
    } else {
        //将回车符或者换行符替换为<br>换行标签
        const lyrics = data.lyrics.replace(/(\r|\n|\r\n)/g, '<br>')
        result.innerHTML = `
        <h2>
            <strong>${artist}</strong> - ${songTitle}
        </h2>
        <span>${lyrics}</span>
        `
    }
    more.innerHTML = ''
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchContent = search.value.trim();
    if (!searchContent) {
        alert("请输入搜索内容")
    } else {
        
        searchSongs(searchContent)
    }
})
result.addEventListener('click', e => {
    const clickedEl = e.target;
    if (clickedEl.tagName === 'BUTTON') {
        const art = clickedEl.getAttribute('data-artist')
        const song = clickedEl.getAttribute('data-songtitle')
        getLyrics(art, song)
    }
})
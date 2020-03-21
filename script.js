const form = document.getElementById('form'),
    search = document.getElementById('search'),
    result = document.getElementById('result'),
    more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

//function searchSongs(song){
   
    // fetch(`${apiURL}/suggest/${song}`)
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data);
    // });
    

//}

async function searchSongs(song){
    const res = await fetch(`${apiURL}/suggest/${song}`);
    const data = await res.json();

    //console.log(data);
    showData(data);
}

function showData(data){
    //let output = "";

    // data.data.forEach(song => {
    //     output += `
    //         <li>
    //         <span>
    //         <strong>${song.artist.name} - ${song.title}</strong>
    //         </span>
    //         <button class='btn' data-artist="${song.artist.name}" data-songtitle="${song.title}">
    //     Get Lyrics
    //         </button>
    //         </li>
    //     `
    // });

    // result.innerHTML = `
    // <ul class = "songs">
    //     ${output}
    // </ul>`


result.innerHTML = `
    <ul class="songs">
    ${data.data.map(song => `
    
    <li>
    <span>
    <strong>
    ${song.artist.name} - ${song.title}
    </strong>
    </span>

    <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">
    Get Lyrics
    </button>
    
    `).join('')}
    </ul>
`

if (data.prev || data.next) {
    more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')" >Previous</button>` : ""}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')" >Next</button>` : ""}
    `;
} else {
    more.innerHTML = '';
    
}

}

async function getMoreSongs(url){


    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);

    const data = await res.json();

    //console.log(data);
    showData(data);
}

async function getLyrics(artist, title){
    const res = await fetch(`${apiURL}/v1/${artist}/${title}`);

    const data = await res.json();

    //console.log(data);
    const lyrics =    data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

result.innerHTML = `<h2><strong>${artist}</strong> -- <strong>${title}</strong></h2><span>${lyrics}</span>`;

more.innerHTML = "";

}

//event listeners
form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    //console.log(searchTerm);
    if(!searchTerm){
        alert('Please Enter Into Search');
    }else{
        searchSongs(searchTerm);
    }
});

// get lyrics btn click
result.addEventListener('click', e => {
    const clickedEL = e.target;

    if (clickedEL.tagName === 'BUTTON') {
        //console.log('Working');
        const artist = clickedEL.getAttribute('data-artist');
        const title = clickedEL.getAttribute('data-title');

        getLyrics(artist, title);
    } else {
        
    }
})
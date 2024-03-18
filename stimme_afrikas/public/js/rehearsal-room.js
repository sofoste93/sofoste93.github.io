document.addEventListener('DOMContentLoaded', function () {
    const songData = {
        'abram': {
            title: 'Abram',
            key: 'F',
            tempo: '95bpm',
            soprano: 'path/to/abram_soprano.mp3',
            alto: 'path/to/abram_alto.mp3',
            tenor: 'path/to/abram_tenor.mp3',
            bass: 'path/to/abram_bass.mp3',
            full: 'path/to/abram_full.mp3',
            video: 'https://www.youtube.com/embed/VIDEO_ID'
        },
        // More songs here
    };

    const queryParams = new URLSearchParams(window.location.search);
    const songKey = queryParams.get('song');
    const song = songData[songKey];

    if (song) {
        document.getElementById('song-title').innerText = `${song.title} - Key: ${song.key}, Tempo: ${song.tempo}`;
        ['soprano', 'alto', 'tenor', 'bass', 'full'].forEach(part => {
            if (document.getElementById(`${part}-audio`)) {
                document.getElementById(`${part}-audio`).src = song[part];
            }
        });
        //newElement.classList.add('animate-fade-in');
        document.getElementById('video-iframe').src = song.video;
    } else {
        document.getElementById('song-details').innerHTML = '<p>Sorry, the requested song could not be found.</p>';
    }
});
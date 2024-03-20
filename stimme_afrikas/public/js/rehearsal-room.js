document.addEventListener('DOMContentLoaded', function () {
    const songData = {
        'abram': {
            title: 'Abram',
            key: 'F',
            tempo: '100bpm',
            soprano: 'path/to/abram_soprano.mp3',
            alto: 'path/to/abram_alto.mp3',
            tenor: 'path/to/abram_tenor.mp3',
            bass: 'path/to/abram_bass.mp3',
            full: '../../assets/audios/mp3/Abram.mp3',
            video: 'https://www.youtube.com/embed/FSROkdSA_ps?si=wXOVnU_5t3yF6-ty'
        },
        'louez': {
            title: 'Louez le Seigneur',
            key: 'G',
            tempo: '105bpm',
            soprano: 'path',
            alto: 'path',
            tenor: 'path',
            bass: 'path',
            full: '../../assets/audios/mp3/Louez_le_seigneur.mp3',
            video: 'https://www.youtube.com/watch?v=T5lH_d21eH0'
        },
        'abraham': {
            title: 'Abraham',
            key: 'F',
            tempo: '100bpm',
            soprano: 'path',
            alto: 'path',
            tenor: 'path',
            bass: 'path',
            full: '../../assets/audios/mp3/Abraham.mp3',
            video: "https://www.youtube.com/embed/FSROkdSA_ps?si=wXOVnU_5t3yF6-ty"
        }
    }

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
document.addEventListener('DOMContentLoaded', function () {
    const songData = {
        'abram': {
            title: 'Abram',
            key: 'F',
            tempo: '100bpm',
            soprano: '../mp3/Abraham.ogg',
            alto: '../mp3/Abraham.ogg',
            tenor: '../mp3/Abraham.ogg',
            bass: '../mp3/Abraham.ogg',
            full: '../mp3/Abram.mp3',
            video: 'https://www.youtube.com/embed/FSROkdSA_ps?si=wXOVnU_5t3yF6-ty'
        },
        'louez': {
            title: 'Louez le Seigneur',
            key: 'G',
            tempo: '105bpm',
            soprano: '../mp3/Abraham.ogg',
            alto: '../mp3/Abraham.ogg',
            tenor: '../mp3/Abraham.ogg',
            bass: '../mp3/Abraham.ogg',
            full: '../mp3/Louez_le_seigneur.mp3',
            video: 'https://www.youtube.com/watch?v=T5lH_d21eH0'
        },
        'abraham': {
            title: 'Abraham',
            key: 'F',
            tempo: '100bpm',
            soprano: '../mp3/Abraham.ogg',
            alto: '../mp3/Abraham.ogg',
            tenor: '../mp3/Abraham.ogg',
            bass: '../mp3/Abraham.ogg',
            full: '../mp3/Abraham.ogg',
            video: "https://www.youtube.com/embed/FSROkdSA_ps?si=wXOVnU_5t3yF6-ty"
        }
    }


    const queryParams = new URLSearchParams(window.location.search);
    const songKey = queryParams.get('song');
    const song = songData[songKey];

    if (song) {
        document.getElementById('song-title').innerText = `${song.title} - Key: ${song.key}, Tempo: ${song.tempo}`;
        ['soprano', 'alto', 'tenor', 'bass', 'full'].forEach(part => {
            const audioElement = document.getElementById(`${part}-audio`);
            const sourceElement = document.getElementById(`${part}-source`);
            const downloadLink = document.getElementById(`${part}-download`);
            if (audioElement && sourceElement && downloadLink) {
                sourceElement.src = song[part]; // Set the source element's src
                audioElement.load(); // Important: Load the audio element to update the source
                downloadLink.href = song[part]; // Set the download link's href
                downloadLink.download = song[part].split('/').pop(); // Optional: Set the download attribute to suggest a filename
            }
        });
        document.getElementById('video-iframe').src = song.video;
    } else {
        document.getElementById('song-details').innerHTML = '<p>Sorry, the requested song could not be found.</p>';
    }
});
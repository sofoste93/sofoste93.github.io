document.addEventListener('DOMContentLoaded', function () {
    const songs = [
        { title: 'Abram', key: 'F', tempo: '100bpm', link: 'rehearsal-room.html?song=abram' },
        { title: 'Abraham', key: 'F', tempo: '100bpm', link: 'rehearsal-room.html?song=abraham' },
        { title: 'Louez', key: 'G', tempo: '105bpm', link: 'rehearsal-room.html?song=louez' },
        { title: 'Tout est accompli', key: 'G', tempo: '70bpm', link: 'rehearsal-room.html?song=tout-est-accompli' },
        { title: 'Chris sois loué', key: 'C', tempo: '110bpm', link: 'rehearsal-room.html?song=chris-sois-loue' },
        { title: 'De peur qu\'étant rassasié', key: 'F', tempo: '95bpm', link: 'rehearsal-room.html?song=de-peur-qu-etant-rassasie' },
        { title: 'Toute famille divisée', key: 'F', tempo: '100bpm', link:'rehearsal-room.html?song=toute-famille' },
        { title: "Tu m'a sauvé", key: 'A', tempo:  '105bpm', link: 'rehearsal-room.html?song=tu-m-a-sauve' },
        { title: "Pour ta bonté", key: 'F', tempo: '115bpm', link: 'rehearsal-room.html?song=pour-ta-bonte' },
        { title: "You're God alone", key: "G", tempo: "92bmp", link: "rehearsal-room.html?song=you-are-god-alone" }
        //{ title: 'Ballade pour un inconnu', key: 'G', tempo: '' }
    ];

    const songListElement = document.getElementById('song-list');
    songs.forEach(song => {
        const div = document.createElement('div');
        div.className = 'list-group-item';

        const a = document.createElement('a');
        a.href = song.link;
        a.textContent = `${song.title} - Key: ${song.key}, Tempo: ${song.tempo}`;

        div.appendChild(a);
        songListElement.appendChild(div);
    });
});

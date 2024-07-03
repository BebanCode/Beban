module.exports = {
    client: {
        token: '',  // Ambil discord bot token yang bisa diambil di https://discord.com/developers/applications
        id: '', // Ambil discord bot id yang bisa diambil di https://discord.com/developers/applications
        guild: '', // Ambil server id sebagai server developer untuk bot ini
        database: '',  // Ambil url database di https://mongodb.com/ ( tutorial pembuatan dan pengambilan https://www.youtube.com/watch?v=HhHzCfrqsoE&t=192s&pp=ygUZaG93IHRvIGNyZWF0ZSBtb25nb2RiIHVybA%3D%3D )
        statusch: '', // Channel status store 

},
    embed: {
        color: '#2b2e35',  // Dapat diubah dengan color hex lain ( Default = Transparan )
        errcolor: '#FF0000', // Warna embed pesan error dapat diubah dengan color hex lain ( Default = merah )
        feedbackcolor: '#723391' // Warna embed rating dapat diubah dengan color hex lain ( Default = ungu )
},
    greetings: {
        welcomeimage: '', // Background welcome card
        welcomemessage: `Welcome to Beban Server`, // Text yang muncul dengan welcome image
        welcomeusercolor: '', // Warna hex teks username yang join ( tanpa # )
        welcomecardtext: '', // Tulisan dibawah teks welcome
        farewellimage: '', // Background farewell card
        farewellmessage: `Goodbye , We hope you visit us back!`, // Text yang muncul dengan farewall image
        farewellusercolor: '', // Warna hex teks username yang leave ( tanpa # )
        farewellcardtext: '', // Tulisan dibawah teks Goodbye
},
    
}
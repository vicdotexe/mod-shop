const connection = require('../config/connection');
const {User, Post} = require('../models');
const moment = require('moment');

connection.on('error', (err) => err);

connection.once('open', async()=>{
    console.log('connected');
    await User.deleteMany({});
    await Post.deleteMany({});

    await User.create([{
        username:"vicdotexe",
        email:"vicdotexe@gmail.com",
        password:"password1",
        admin:true
    },
    {
        username:"riley",
        email:"rileyn@gmail.com",
        password:"password1",
        admin:true
    }]);

    await Post.create({
        title:'Xbox one future proof',
        content:`<p>Today I started installing all my backwards compatible xbox and xbox 360 disc's to my xbox one, when you put a disc in the console has to do an "update" which is actually just the console reaching out to Microsoft servers and downloading a perfect copy of the game, the console isn't actually reading from your disc. Someday the xbox one won't be supported by Microsoft servers but if your console already has the game installed you'll be able to play anyway.<img src="https://res.cloudinary.com/dadxsisd4/image/upload/v1667454988/modshop/mwyuh9zonohyaxdizwjq.jpg"></p>`,
        createdAt: moment('Wednesday, Nov 2nd 2022', 'dddd, MMM Do YYYY').toDate()
    })

    await Post.create({
        title:'GBA SP',
        content:`<p>Last Night I finished up this Gameboy Advance SP, USB C mod and new IPS screen with all white buttons and shell.</p><p><img src="https://res.cloudinary.com/dadxsisd4/image/upload/v1669239602/modshop/iugcgiem6uj4hussf2ps.webp"><img src="https://res.cloudinary.com/dadxsisd4/image/upload/v1669239616/modshop/nygvz5ph5zhegft5kzxv.jpg"><img src="https://res.cloudinary.com/dadxsisd4/image/upload/v1669239635/modshop/p673pviari90ofajpn5a.jpg"></p>`,
        createdAt: moment('Wednesday, Nov 23rd 2022', 'dddd, MMM Do YYYY').toDate()
    })

    console.log('Seeded!');
    process.exit(0);
})
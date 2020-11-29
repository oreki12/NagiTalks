const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

let comments = [
    {
        id: uuid() ,
        username: 'Ritesh',
        comment: 'Nagisa is the best! Nagisa is a cute girl with short wavy red hair that reaches a little below her shoulders. She has a frail physique, as noted by Tomoya Okazaki, therefore she is petite for her age, due to her poor health and weak immune system.'
    },
    {
        id: uuid() ,
        username: 'Tomoya',
        comment: 'She also has two prominent ahoge sticking out on top of her head. The two ahoges resemble the letter M, and she inherited that physical trait from both of her parents (Akio Furukawa and Sanae Furukawa).'
    },
    {
        id: uuid() ,
        username: 'okazaki',
        comment: 'Nagisa Furukawa is a shy girl who is always kind and sweet towards others, even going out of her way to assist a stranger to a fault. She is selfless and self-depreciating as she thinks lowly of herself and values other people’s happiness more than her own. Nagisa is naive and optimistic, as she always sees the good in everyone. In After Story, she is noted to be smart and diligent by the manager of the restaurant she is working in.'
    },
    {
        id: uuid() ,
        username: 'Zero two',
        comment: 'Though Nagisa is airheaded, she is perceptive of other peoples thoughts and feelings. Nagisa is thoughtful and catches on to how people feel and the situation that causes them to be the way they are.'

    },
]

app.get('/comments',(req, res) =>{
   res.render('index', { comments });
});

app.get('/comments/new', (req, res) =>{
    res.render('new');
});

app.post('/comments', (req, res)=>{
    const{username, comment} = req.body;
    comments.push({username, comment, id: uuid() });
    res.redirect('/comments')
});

app.get('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('show', { comment })
});

app.get('/comments/:id/edit', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('edit', { comment })
})

app.patch('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
});

app.delete('/comments/:id', (req, res)=>{
    const {id} = req.params;
    comments =  comments.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})




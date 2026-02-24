import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path'; 

import fs from 'fs';

const DATA_FILE = './posts.json';

// Function to read posts from the JSON file
function loadPosts() {
    try{
        if(fs.existsSync(DATA_FILE)){
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        }
    }catch(err){
        console.error("Error reading posts:", err);
        return [];
    }
}

// Function to save posts to the JSON file
// Helper function to save current posts to the file
function savePosts() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}



let posts = loadPosts();
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
})

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', { posts: posts });
})

app.post("/submit", upload.array('image', 5), (req, res) => {
    //1. Create a variable to hold the image path
    let imagePaths = [];

    //2. The if/else logic
    if(req.files && req.files.length > 0){
        // if files were uploaded, set the image paths to the filepaths
        imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    } else {
        // if no file was uploaded, set the image path to a default image
        imagePaths = ['/uploads/default.jpg'];
    }

    const newPost = {
        id: Date.now(),
        title: req.body.title,
        city: req.body.city,
        people: req.body.people,
        content: req.body.content,
        year: req.body.year,
        images: imagePaths
    }

    posts.push(newPost);
    savePosts();

    res.redirect('/');
})

app.post("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== id);
    savePosts();
    res.redirect('/');
})

app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    res.render("edit.ejs", { post: post });
})

app.post("/update/:id", upload.array('image', 5), (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1){
        // 1. Get the existing post
        const existingPost = posts[index];
        // create an updated post
        const updatedPost = {
            ...existingPost, // keep existing data
            title:req.body.title,
            city: req.body.city,
            people: req.body.people,
            year: req.body.year,
            content: req.body.content
            
        }
        if (req.files && req.files.length > 0) {
            const newImagePaths = req.files.map(file => `/uploads/${file.filename}`);
            // This joins the OLD array with the NEW array
            updatedPost.images = existingPost.images.concat(newImagePaths);
}
        // update the post in the array
        posts[index] = updatedPost;
        savePosts();
        
    }
    res.redirect('/');
})



app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
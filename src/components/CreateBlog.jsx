import { useEffect, useState } from "react";
import BlogController from "./BlogController";

import { auth, storage } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import '../styles/bloglogin.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "firebase/compat/storage";
import { BeatLoader } from "react-spinners";

export default function CreateBlog({ isLogin }) {


    const storageRef = ref(storage);
    const [imgurl, setImgurl] = useState("");
    const [file, setFile] = useState(null);

    const [title, setTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [imgloc, setImgloc] = useState("");
    const navigate = useNavigate();
    const [imgloading, setImgloading] = useState(false);

    const handleChange = (e) => {
        
        toast.info("Uploading please wait...");
        setImgloading(true);
        const selectedFile = e.target.files[0];
        if (selectedFile) {//this is done to avoid error if we click on upload and close explorer without selecting any file
            //In case of reupload , first delete the previous image
            if (file !== null) {
                deleteObject(ref(storageRef, `blogs/${file.name}`)).then(() => {
                    console.log("Previous Image deleted");
                }).catch((error) => {
                    console.error("Error deleting previous image:", error);
                });
            }
            setFile(selectedFile);
            const imageRef = ref(storageRef, `blogs/${selectedFile.name}`);
            setImgloc(`blogs/${selectedFile.name}`);
            console.log("Uploading please wait...");
            uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
                console.log('Uploaded new image');
                const url = await getDownloadURL(imageRef);
                setImgurl(url);
                console.log('File available at', url);
                toast.success("Image uploaded successfully");
                setImgloading(false);

            });
        }
       
    }
    const handleSubmit = async () => {
        if (title !== "" && blogContent !== "") {
            try {
                const url = "https://personalwebsitebackend.onrender.com/blogs/create";
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uid: auth.currentUser.uid,
                        title: title,
                        content: blogContent,
                        author: auth.currentUser.displayName,
                        imgUrl: imgurl,
                        imgRefToFirebase: imgloc
                    })
                });

                if (response.ok) {
                    // Blog created successfully
                    navigate('/blogs');
                } else {
                    throw new Error('Failed to create blog');
                }
            } catch (error) {
                setTitle("");
                setBlogContent("");

                console.error("Error creating post:", error);
                toast.error("An error occurred while creating post");
            }
        } else {
            toast.error("Title or Content can't be empty");
        }
    };

    useEffect(() => {
        if (!isLogin) {
            navigate("/blogs/login");
            toast.warning("Login to create Blog");
        }
    })



    return (
        <div className="footer-fix">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <BlogController isLogin={isLogin} />
            <div className="createPostPage">
                <div className="cpContainer">
                    <h1>Create a Blog</h1>
                    <div className="inputGp">
                        <label >Article Title:</label>
                        <input placeholder="Title.." value={title} onChange={(event) => {
                            setTitle(event.target.value);
                        }} />
                    </div>
                    <div className="inputGp">
                        <label>Content:</label>
                        <textarea placeholder="Start writing..." value={blogContent} id="" cols="30" rows="10" onChange={(event) => {
                            setBlogContent(event.target.value);
                        }}></textarea>
                    </div>
                    {!imgloading &&
                        <div >
                            <label htmlFor="fileInput" id="imageUpload">Choose Image</label>
                            <input style={{ display: "none" }} id="fileInput" type="file"  onChange={handleChange} accept="image/*" />
                        </div>
                    }
                    {imgloading &&
                        <BeatLoader color="#05386B" />
                    }


                    {imgurl &&
                        <div>
                            <p>Image preview</p>
                            <img className="imagePreview" src={imgurl} alt="blog_image" />
                        </div>
                    }
                    <button onClick={(e) => { handleSubmit(e) }}>Submit</button>

                </div>
            </div>
        </div>
    )
};

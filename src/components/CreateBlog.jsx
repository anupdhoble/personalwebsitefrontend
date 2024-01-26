import { useEffect, useState } from "react";
import BlogController from "./BlogController";
import { auth} from '../firebaseConfig';
import { useNavigate } from "react-router-dom";
import '../styles/bloglogin.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function CreateBlog({ isLogin }) {

    const [title, setTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (title !== "" && blogContent !== "") {
            try {
                const url ="https://anuppersonalwebsitebackend.azurewebsites.net/blogs/create";
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uid: auth.currentUser.uid,
                        title: title,
                        content: blogContent,
                        author: auth.currentUser.displayName
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
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
};

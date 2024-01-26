import { useEffect, useState } from "react";
import BlogController from "./BlogController";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";
import '../styles/bloglogin.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function CreateBlog({ isLogin }) {

    const [title, setTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const postsCollectionRef = collection(db, "blogs");
    const navigate = useNavigate();
    const createPost = async () => {
        if (title !== "" && blogContent !== "") {
            try {

                // Get IP address
                const ipAddressResponse = await fetch('https://api.ipify.org?format=json');
                const ipAddressData = await ipAddressResponse.json();
                const ipAddress = ipAddressData.ip;

                // Get device information
                const userAgent = window.navigator.userAgent;

                const currentDate = new Date();
                const formatDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
                await addDoc(postsCollectionRef, {
                    title,
                    blogContent,
                    uploadDate: formatDate,
                    uploadTime: serverTimestamp(),
                    author: {
                        name: auth.currentUser.displayName,
                        id: auth.currentUser.uid
                    },
                    ipAddress,
                    userAgent
                });

                // Show a success message to the user
                toast.success("Post created successfully");

                setTitle("");
                setBlogContent("");

                // Navigate after success
                navigate('/blogs');
            } catch (error) {
                setTitle("");
                setBlogContent("");

                console.error("Error creating post:", error);
                toast.error("An error occurred while creating post");
            }
        }
        else {
            toast.error("Title or Content can't be empty")
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
                    <button onClick={createPost}>Submit</button>
                </div>
            </div>
        </div>
    )
};

import React, { useEffect, useState } from "react";
import BlogController from "./BlogController";
import { auth, storage } from '../firebaseConfig';
import blogPageImg from "../assets/img/blogPageImg.png";
import { ref, deleteObject } from "firebase/storage";
import { HashLoader } from "react-spinners";
import likeicon from "../assets/img/like.png";
import commenticon from "../assets/img/comment.png";
import shareicon from "../assets/img/share.png";


const Blogs = ({ isLogin, showNotification }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAllBlogs();
    }, []);

    //for share button
    function shareCurrentPage(blogtitle,blogauthor) {
        // Get the current URL
        var currentUrl = window.location.href;

        // Check if the Web Share API is supported by the browser
        if (navigator.share) {
            // Use the Web Share API to share the current URL
            navigator.share({
                title: "Blog: "+blogtitle+" || By: "+blogauthor,
                url: currentUrl
            })
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            // Fallback for browsers that do not support the Web Share API
            alert('Your browser does not support the share functionality. You can manually copy the URL.');
        }
    }


    const handleDelete = async (blogId, blogImgUrl, imgRefToFirebase) => { // Receive blogId as a parameter
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                // showNotification("Deleting Blog..","info");
                const url = `https://personalwebsitebackend.onrender.com/blogs/remove/${blogId}`; // Use blogId in the URL
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    // showNotification("Blog deleted successfully","success");
                    console.log("Blog deleted, cleaning up resources..");
                    if (blogImgUrl) {

                        const storageRef = ref(storage);
                        deleteObject(ref(storageRef, imgRefToFirebase)).then(() => {
                            console.log("Previous image deleted");
                        }).catch((error) => {
                            // showNotification("Blog deletion failed","error");
                            console.error("Error deleting previous image:", error);
                        });
                    }

                    fetchAllBlogs();
                } else {
                    // showNotification("Blog deletion failed","error");
                    throw new Error("Failed to delete blog");
                }
            } catch (error) {
                // showNotification("Blog deletion failed","error");
                console.error("Error deleting blog:", error);
            }
        }
    }

    const fetchAllBlogs = async () => {
        try {
            const url = "https://personalwebsitebackend.onrender.com/blogs/getAll";
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const data = await response.json();
                const formattedBlogs = data.map(blog => ({
                    ...blog,
                    createdAt: new Date(blog.createdAt).toLocaleDateString()
                })).reverse();
                setLoading(false);
                setBlogs(formattedBlogs);
            } else {
                throw new Error("Failed to fetch blogs");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    return (
        <>

            <div className="title-content max-width-1">
                <div className="title-content-left">
                    <h1 className="blog-title-welcome">Welcome to Blogs!!</h1>
                    <p>Create Your Own Blogs By Logging In!!!</p>
                    <p className="thoughts">I think of us as journalists; the medium we work in is blogging. <br />--Joshua Marshall</p>
                </div>
                <div className="title-content-right">
                    <img src={blogPageImg} alt="home.png" />
                </div>
            </div>
            <BlogController isLogin={isLogin} />
            <div className="blog-articles footer-fix max-width-1">
                <h2 className="color2">Featured Articles</h2>
                {loading && <div className="HashSpinner" ><HashLoader color="#05386B" /></div>}
                {blogs.map((blog) => (
                    <article key={blog._id} className="blog-article">
                        <div className="article-header">
                            <span className="article-title">{blog.title}</span>
                            {auth.currentUser && isLogin && auth.currentUser.displayName === blog.author && (
                                <span><button onClick={() => handleDelete(blog._id, blog.imgUrl, blog.imgRefToFirebase)}>🗑️</button></span> // Pass blogId to handleDelete
                            )}
                            <span className="article-right">
                                <div className="article-author">@{blog.author}</div>
                                <div className="article-time">{blog.createdAt}</div>
                            </span>
                        </div>
                        <div className="hr-nav m-auto"><hr /></div>
                        <div className="article-content">

                            <p>
                                {blog.imgUrl && <img className="blogImage" src={blog.imgUrl} alt="blog" />}
                                {blog.content}
                                
                            </p>
                        </div>
                        <div className="socialpanel">
                                    <img className="likeicon" src={likeicon} alt="like" />
                                    <div className="likecount">2</div>
                                    <img className="commenticon" src={commenticon} alt="comment" />
                                    <div className="commentcount">3</div>
                                    <img className="shareicon" src={shareicon} onClick={()=>{shareCurrentPage(blog.title,blog.author)}} alt="share" />
                                </div>
                    </article>
                ))}
            </div>
        </>
    );
};

export default Blogs;

import React, { useEffect, useState } from "react";
import BlogController from "./BlogController";
import { auth, storage } from '../firebaseConfig';
import blogPageImg from "../assets/img/blogPageImg.png";
import { ref, deleteObject } from "firebase/storage";


const Blogs = ({ isLogin,toast }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    const handleDelete = async (blogId, blogImgUrl, imgRefToFirebase) => { // Receive blogId as a parameter
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                toast.info("Deleting blog..");
                const url = `https://personalwebsitebackend.onrender.com/blogs/remove/${blogId}`; // Use blogId in the URL
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    toast.success("Blog deleted successfully");
                    console.log("Blog deleted, cleaning up resources..");
                    if (blogImgUrl) {

                        const storageRef = ref(storage);
                        deleteObject(ref(storageRef, imgRefToFirebase)).then(() => {
                            console.log("Previous image deleted");
                        }).catch((error) => {
                            toast.error("Blog deletion failed");
                            console.error("Error deleting previous image:", error);
                        });
                    }

                    fetchAllBlogs();
                } else {
                    toast.error("Blog deletion failed");
                    throw new Error("Failed to delete blog");
                }
            } catch (error) {
                toast.error("Blog deletion failed");
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
                    </article>
                ))}
            </div>
        </>
    );
};

export default Blogs;

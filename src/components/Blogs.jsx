import React, { useEffect, useState } from "react";
import BlogController from "./BlogController";
import blogPageImg from "../assets/img/blogPageImg.png";

const Blogs = ({ isLogin }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    const fetchAllBlogs = async () => {
        try {
            const url = "https://personalwebsitebackend.onrender.com/blogs/getAll"; // Correct endpoint
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
                })).reverse(); // Reverse the order of blogs
                setBlogs(formattedBlogs);
            } else {
                throw new Error("Failed to fetch blogs");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    // Rest of the code...

};

export default Blogs;

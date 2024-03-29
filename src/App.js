import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Post from "./Post";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const transformedPosts = response.data.map(post => ({
          title:post.title,
          username: `User ${post.userId}`,
          message: post.body, 
          timestamp: new Date(), 
        }));
        setPosts(transformedPosts);
      } catch (error) {
        console.error("There was an error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div>
      <Navbar />
      <div className="posts">
        {posts?.map((post, index) => (
          <Post
          key={index}
          title={post.title}
          username={post.username}
          message={post.message}
          timestamp={post.timestamp}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default App;

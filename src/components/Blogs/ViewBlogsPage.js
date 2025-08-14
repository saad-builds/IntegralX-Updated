import React, { useState, useEffect } from 'react'; 
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import BlogCard from './BlogCard'; 
import { getBlogs } from '../../services/api'; 

const ViewBlogsPage = () => {
    const [blogs, setBlogs] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
        });
    }, []);
    useEffect(() => {
    document.title = 'integralX - Blogs';
  }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);
                const fetchedBlogs = await getBlogs(); 
                setBlogs(fetchedBlogs); 
            } catch (err) {
                console.error("Failed to fetch blogs:", err);
                setError('Failed to load blog posts. Please try again later.'); 
            } finally {
                setLoading(false); 
            }
        };

        fetchBlogs(); 
    }, []); 

    const renderBlogContent = () => {
        if (loading) {
            return <p className="text-center text-gray-400 mt-16">Loading blog posts...</p>;
        }

        if (error) {
            return <p className="text-center text-red-500 mt-10">{error}</p>;
        }

        if (blogs.length > 0) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 md:mt-20">
                    {blogs.map(blog => (
                        <BlogCard key={blog.slug} blog={blog} />
                    ))}
                    
                </div>
            );
        }

        return <p className="text-center text-gray-500 mt-10">No blog posts available at the moment.</p>;
    };

    return (
        <>
            <div id="blogs" className="flex flex-col min-h-screen bg-[linear-gradient(251.24deg,#1B2435_3.41%,#000000_96.59%)]">
                <Header />
                <main className="flex-grow"> 
                    <section className="py-16 lg:py-24">
                        <div className="container mx-auto px-4"> 
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <span className="inline-block h-10 w-1.5 bg-brand-yellow mr-4"></span>
                                    <h2 className="text-3xl lg:text-5xl font-bold uppercase tracking-wider text-white">
                                        Our Blogs
                                    </h2>
                                </div>
                                <p className="text-xl text-white max-w-2xl mx-auto mt-6">
                                    Get the latest updates, expert insights, and industry trends –<br /> all in one place. Learn, grow, and stay ahead with our curated content.
                                </p>
                            </div>
                            <div className='flex items-center justify-center mt-8 lg:mt-12'>
                            {renderBlogContent()}
                            </div>

                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default ViewBlogsPage;
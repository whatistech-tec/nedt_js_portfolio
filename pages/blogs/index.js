import { Swiper, SwiperSlide } from 'swiper/react';

import {useState} from 'react';
import useFetchData from "@/hooks/useFetchData";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';
import Link from 'next/link';

export default function blogs() {

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const[perPage] = useState(7);

    const [searchInput, setSearchInput] = useState(false);

    const handleSearchOpen = () => {
        setSearchInput(!searchInput);
    }

    const handleSearchClose = () => {
        setSearchInput(false);
    }
    //fetch blog data
    const [alldata, loading] = useFetchData('/api/blogs');

    //function to handle page change
    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }

    //total number of blogs
    const allblog = alldata.length;

    //filter all data based on search query
    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog => blog.title.tolowerCase().includes(searchQuery.tolowerCase()))

    //calculate index of the first blog displayed on thwe current page
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    //Get current page's blog
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const publishedData = currentBlogs.filter(ab => ab.status === 'publish');
    const sliderpubdata = alldata.filter(ab => ab.satus === 'publish'); 

    const pageNumbers = [];

    for(let i=1; i<= Math.ceil(allblog / perPage); i++){
        pageNumbers.push(1);
    }
   
    return <>
        <Head>
            <title>Blogs</title>
        </Head>
        <div className="blogpage">
            <section className='tophero'>
                <div className='container'>
                    <div className='toptitle'>
                        <div className='toptitlecont flex'>
                            <h1>Welcome to <span>Hesborn's Blogs</span></h1>
                            <p>I write about web, mobile development and modern JavaScript frameworks. The best articles, links and news related toweb and mobile development</p>
                            <div className="subemail">
                                <form className="flex">
                                    <input onClick={handleSearchOpen} placeholder="Saerch Blogs here..." type="text"/>
                                    <button>Search</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='featured'>
                        <div className='container'>
                            <div className='border'></div>
                            <div className='featuredposts'>
                                <div className='fetitle flex'>
                                    <h2>Featured Posts:</h2>
                                </div>
                                <div className='feposts flex'>
                                    <Swiper
                                        slidesPerView={'auto'}
                                        freeMode={true}
                                        spaceBetween={30}
                                        className='mySwiper'
                                        modules={[freeMode]}
                                    >
                                        {loading ? <Spinner/> : <>{sliderpubdata.slice(0, 6).map((blog) => {
                                            return <SwiperSlide key={blog._id}>
                                                <div className='fpost' key={blog._id}>
                                                    <Link href={`/blogs/${blog.slug}`}>
                                                        <img src={blog.images[0]} alt={blog.title}/>
                                                    </Link>
                                                    <div className='fpostinfo'>
                                                        <div className='tags flex'>
                                                            {blog.blogcategory.map((cat) => {
                                                                return <Link href={`/blog/category${cat}`} className='ai'><span></span>{cat}</Link>
                                                            })}
                                                        </div>
                                                        <h2><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h2>
                                                        <div className='fpostby flex'>
                                                            <img src='/img/dp.jpg' alt=''/>
                                                            <p>By Hesborn Nyang'ara</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        })}</>}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className="populartegssec">
                <div className='container'>
                    <div className='border'></div>
                    <div className='populartegsdata'>
                        <div className='fetitle'>
                            <h3>Popular Tags</h3>
                        </div>
                        <div className='poputegs'>
                            <Link href="/blogs/category/Next Js" className='pteg'>
                                <img src="" alt=''/>
                                <div className='tegs'>
                                    <div className="apps"><span></span>Next Js</div>
                                </div>
                            </Link>
                            <Link href="/blogs/category/Node Js" className='pteg'>
                                <img src="" alt=''/>
                                <div className='tegs'>
                                    <div className="apps"><span></span>Node Js</div>
                                </div>
                            </Link>
                            <Link href="/blogs/category/Digital Marketing" className='pteg'>
                                <img src="" alt=''/>
                                <div className='tegs'>
                                    <div className="apps"><span></span>Digital Marketing</div>
                                </div>
                            </Link>
                            <Link href="/blogs/category/Django" className='pteg'>
                                <img src="" alt=''/>
                                <div className='tegs'>
                                    <div className="apps"><span></span>Django</div>
                                </div>
                            </Link>
                            <Link href="/blogs/category/Next Js" className='pteg'>
                                <img src="" alt=''/>
                                <div className='tegs'>
                                    <div className="apps"><span></span>Next Js</div>
                                </div>
                            </Link>
                            <Link href="/blogs/category/Tailwind CSS" className='pteg'>
                                <img src="" alt=''/>
                                <div className='tegs'>
                                    <div className="apps"><span></span>Tailwind CSS</div>
                                </div>
                            </Link>
                           
                        </div>
                    </div>
                </div>
            </section>
            <section className='latestpostsec'>
                <div className="container">
                    <div className='border'></div>
                    <div className='latestpostsdata'>
                        <div className='fetitle'>
                            <h3>Latest Articles :</h3>
                        </div>
                        <div className='latestposts'>
                            {loading ? <Spinner/> : <>
                                {publishedData.map((blog) => {
                                    return <div className='lpost' key={blog._id}>
                                        <div className='lpostimg'>
                                            <Link href={`/blogs/${blog.slug}`}><img src={blog.image[0]} alt={blog.title}/></Link>
                                            <div className='tegs'>
                                                {blog.blogcategory.map((cat) => {
                                                    return <Link href={`/blog/category${cat}`} className='ai'><span></span>{cat}</Link>
                                                })}
                                            </div>
                                        </div>
                                        <div className="lpostinfo">
                                            <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                                            <p>I break down complex user experience to create integrity focused solutions that connect billions of people.
                                                We put our ideas and thus your wishes in the form of unique web project that inspires you and your customers</p>
                                                <h4 className='flex'><img src='/img/dp.jpg' alt=''/><span>by Hesborn Nyang'ara</span></h4>
                                        </div>
                                    </div>
                                })}
                            </>}
                        </div>
                    </div>
                     {/* for pagination */}
                    {publishedData.length === 0 ? ("") : (
                        <div className="blogspaginationbtn flex flex-center mt-3">
                            <button onClick={() => paginate(currentPage - 1)}disabled={currentPage === 1}>Previous</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                                <button key={number}
                                    onClick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active': ''}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                        </div>
                    )}
                </div>
                {searchInput ? <Blogsearch cls={handleSearchClose}/> : null}
            </section>
        </div>
    </>
}
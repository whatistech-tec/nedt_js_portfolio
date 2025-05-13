import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function Category() {

    const router = useRouter();
    const {category} = router.query;

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');

    const {alldata, loading} = useFetchData(`/api/blogs?blogcategory=${category}`);

    const filteredBlogs = alldata.filter((item) => item.category === item.category).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20);

    const blogcategoryData = [...filteredBlogs].reverse();

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
    };

    const allblog = alldata.length;

    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const publishedData = currentBlogs.filter(ab => ab.status === 'publish');

    const pageNumbers = [];

    for(let i=1; i<= Math.ceil(allblog / perPage); i++){
        pageNumbers.push(1);
    }

    return <>
        <Head>
            <title>Blog category page</title>
        </Head>
        <div className="blogcategory">
            <section className='tophero'>
                <div className='container'>
                    <div className='toptitle'>
                        <div className='toptitlecont flex'>
                            <h1>Category <span>{category}</span></h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className='latestpostsec'>
                <div className='container'>
                    <div className='border'></div>
                    <div className='latestpostsdata'>
                        <div className='fetitle'>
                            <h3>Next Js Articles : </h3>
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
                </div>
            </section>
        </div>
    </>
}
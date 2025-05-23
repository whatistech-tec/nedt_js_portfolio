import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";


export default function gallery() {

    const {alldata, loading} = useFetchData('/api/photos')

    return <>
        <Head>
            <title>Hesborn: Gallery Photos</title>
        </Head>
        <div className="gallerypage">
            <div className="container">
                <div className="gallerytopsec">
                    <div className="topphonesec">
                        <div className="lefttitlesec">
                            <h4 data-aos='fade-right'>HESBORN GALLARY PHOTOS</h4>
                            <h1 data-aos='fade-left'>Vaibhav <br/> Photography</h1>
                            <Link href='/gallery#galleryimages'><button data-aos='fade-right'>VIEW MORE</button></Link>
                        </div>
                    </div>
                    <div className="rightimgsec">
                        <img  src="./img/finalyear.jpg" alt="" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'/>
                    </div>
                    <div className="r_img_top">
                        <img src="./img/finalexam.jpg" alt="" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'/>
                        <img src="./img/topgees.jpg" alt="" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'/>
                    </div>
                </div>
            </div>
            <div className="gallerybtmphotos" id="galleryimages">
                <div className="container">
                    <div className="gbtmtitles text-center">
                        <h3 data-aos='fade-right'><span>01//</span> OUR PORTFOLIO</h3>
                        <h2 data-aos='fade-left'>Hesborn Captures <span>All of your</span><br/>beautiful memories</h2>
                    </div>
                    <div className="gallery_image_grid">
                        {loading ? <Spinner/> : <>
                            {alldata.map((photos) =>{
                                return <div className="image-item" >
                                    <img src={photos.images[0]} alt="" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'/>
                                    <div className="galeryimgiteminfo">
                                        <h2>{photo.title}</h2>
                                        <p>by Hesborn Nyang'ara</p>
                                    </div>
                                </div>
                            })}
                        </>}
                        
                    </div>
                </div>
            </div>
        </div>

    </>
}
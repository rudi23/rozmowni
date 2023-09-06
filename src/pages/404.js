import Image from 'next/image';
import image404 from '../../public/images/404.jpg';

export default function Page404() {
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-3 col-md-1" />
                <div className="col-lg-6 col-md-10">
                    <div className="img-block">
                        <Image
                            src={image404}
                            alt="Not found error"
                            placeholder="blur"
                            layout="responsive"
                            sizes="(min-width: 1200px) 540px, (min-width: 992px) 450px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                            quality="75"
                        />
                    </div>
                </div>
                <div className="col-lg-3 col-md-1" />
            </div>
        </div>
    );
}

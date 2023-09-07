import Banner from '../components/Banner';
import Features from '../components/Features';
import Idea from '../components/Idea';
import Conversations from '../components/Conversations';
import WhyUs from '../components/WhyUs';
import Opinions from '../components/Opinions';
import Notification from '../components/Notification';

export default function Home() {
    return (
        <>
            <Notification showLink />
            <Banner />
            <Features />
            <WhyUs />
            <Conversations />
            <Opinions />
            <Idea />
        </>
    );
}

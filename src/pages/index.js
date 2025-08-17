import Banner from '../components/Banner';
import SocialProofStats from '../components/SocialProofStats';
import Features from '../components/Features';
import WhyUsExpanded from '../components/WhyUsExpanded';
import Conversations from '../components/Conversations';
import TestBenefits from '../components/TestBenefits';
import Opinions from '../components/Opinions';
import TestFAQ from '../components/TestFAQ';
import FinalCTA from '../components/FinalCTA';
import Idea from '../components/Idea';
import StickyCTA from '../components/StickyCTA';

export default function Home() {
    return (
        <>
            <Banner />
            <Features />
            <SocialProofStats />
            <WhyUsExpanded />
            <Conversations />
            <Idea />
            <TestBenefits />
            <Opinions />
            <TestFAQ />
            <FinalCTA />
            <StickyCTA />
        </>
    );
}

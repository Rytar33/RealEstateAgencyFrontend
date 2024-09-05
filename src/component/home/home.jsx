
import Header from '../header/header';
import Hero from '../hero/hero';
import Slider from '../slider/slider';
import About from '../about/about';
import Team from '../team/team';
import Footer from '../footer/footer';
import FaqItem from '../faq/faq';
import TransactionItem from '../feature/feature';
// import Filter from './component/filter/filter';
// import Cards from './component/cards/cards';
// import DetailCard from './component/card_detail/cards_details';

function Home() {
  return (
    <div className='wrapper'>
      <Header />
      <Hero />
      <Slider />
      <About />
      <Team/>
      <FaqItem />
      {/* <TransactionItem /> */}
      <Footer />
    </div>
  );
}

export default Home;


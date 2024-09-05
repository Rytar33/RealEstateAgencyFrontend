import Header from "../header/header";
import Footer from "../footer/footer";
import Filter from '../filter/filter';
import Cards from '../cards/cards';

function MainFilter() {

    return (
        <div className='wrapper'>
            <Header />
            <Filter />
            <Cards />
            <Footer />
        </div>

    );
}
export default MainFilter;
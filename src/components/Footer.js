import { Link } from 'react-router-dom';
import { GiDinosaurRex } from 'react-icons/gi';



const Footer = () => {
    return (
        <footer>
            <p><GiDinosaurRex />Copyright &copy; 2021</p>
            <nav>
            <Link to='about'>About</Link>
            </nav>
        </footer>
    )
}
export default Footer  
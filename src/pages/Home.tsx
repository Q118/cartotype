import { Link } from 'react-router-dom';
import { BsFillCameraFill } from 'react-icons/bs';
import { GiStabbedNote } from 'react-icons/gi';
import { useTheme } from '../context/ThemeContext';

const h5_spanStyle = {
    marginTop: "1rem",
    display: "flex",
    gap: ".5rem",
    justifyContent: "flex-end",
};



function Home() {

    const { currentTheme } = useTheme();

    const DIV_CLASS = currentTheme === 'dark' ? 'bg-secondary' : 'bg-white text-dark';


    return (
        <>
            <h1>Home</h1>
            <div
                className={`shadow p-3 mb-5 rounded ${DIV_CLASS}`}
                style={{ position: "absolute" }}>
                <h5 style={h5_spanStyle}>
                    <BsFillCameraFill />
                    All Photos By <a className={`style-link link-${currentTheme}`} href="https://unsplash.com/?utm_source=cartotype&utm_medium=referral" target="_blank">Unsplash</a>
                </h5>
                <h3>Welcome to Cartotype; research, shop, sell, & more!</h3>
                <p>Vist the <Link className={`style-link link-${currentTheme}`} to="/store">store</Link> to buy items.</p>
                <p>Visit the <Link to="/admin" className={`style-link link-${currentTheme}`}>admin</Link> page to add or edit items in your vendor shop.</p>
                <p>And visit the <Link to="/notes" className={`style-link link-${currentTheme}`}>notes</Link> page to research the store products. There you can add your own notes to the community research pool.</p>
                <span style={{ ...h5_spanStyle, justifyContent: 'center' }}>
                    <small>
                        <li>notes are markdown supported text that review product information</li>
                        <li>
                            you can also view the notes per product directly from the store. Look for the <GiStabbedNote size={35} /> on a store item.
                        </li>
                    </small>
                </span>
            </div>
        </>
    );
}

export { Home };
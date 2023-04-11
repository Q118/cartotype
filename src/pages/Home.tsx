import { Link } from 'react-router-dom';
import { BsFillCameraFill } from 'react-icons/bs';
import { GiStabbedNote } from 'react-icons/gi';
import { Col, Row } from 'react-bootstrap';

function Home() {
    return (
        <>
            <h1>
                Home
            </h1>
            <h5 style={{
                marginTop: "1rem",
                display: "flex",
                gap: ".5rem",
                justifyContent: "flex-end",
            }}>
                <BsFillCameraFill />
                All Photos By <a href="https://unsplash.com/?utm_source=cartotype&utm_medium=referral" target="_blank">Unsplash</a>
            </h5>
            <h3>Welcome to Cartotype; research, shop, sell, & more!</h3>

            <p>Vist the <Link to="/store">store</Link> to buy items.</p>

            <p>Visit the <Link to="/admin">admin</Link> page to add or edit items in your vendor shop.</p>
            <p>And visit the <Link to="/notes">notes</Link> page to research the store products. There you can add your own notes to the community research pool.</p>
            <span style={{
                marginTop: "1rem",
                display: "flex",
                gap: ".5rem",
                justifyContent: "flex-end",
            }}>
                <small>- notes are markdown supported text that review product information <br />
                - you can also view the notes per product directly from the store. Look for the <GiStabbedNote size={35} /> on a store item.</small>
            </span>
        </>
    );
}

export { Home };
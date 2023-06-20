/**
 * footer component for the bottom of the App
 * should have a link to the github repo...
 * padding/margin to not loose anythign at the bottom of the page
 */

export function CartoFooter() {
    return (
        <footer style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            height: '2.5rem',
            marginTop: '1rem',
        }}>
            <div className="d-flex justify-content-center align-items-center">
                <span className="me-2">Cartotype</span>
            </div>
        </footer>
    )
}
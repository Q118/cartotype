import Container from 'react-bootstrap/Container';
import { useTheme } from '../../context/ThemeContext';
import { useMultistepForm } from '../../hooks/useMultistepForm';


export function FormApp() {
    const { currentTheme } = useTheme();

    // const steps = []; // gives us access to the steps
    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        next,
        back,
    } = useMultistepForm([
        <div>1</div>,
        <div>2</div>,
        <div>3</div>,
    ]);


    return (
        <Container
            style={{
                border: `1px solid ${currentTheme === 'dark' ? 'white' : 'black'}`,
                borderRadius: '5px',
                padding: '1rem',
                position: "relative",
                // maxWidth: "max-content",
            }}
        >
            <form>
                {/* top corner position of step display */}
                <div style={{
                    position: 'absolute',
                    top: '.5rem',
                    right: '.5rem'
                }}>
                    {currentStepIndex + 1} / {steps.length}
                </div>
                {step}
                <div
                    style={{
                        marginTop: "1rem",
                        // this will get our buttons to the far right side
                        display: "flex",
                        gap: ".5rem",
                        justifyContent: "flex-end",
                    }}
                >
                    {!isFirstStep && <button type="button" onClick={back}>Back</button>}
                    <button type="button" onClick={next}>
                        {isLastStep ? "Finish" : "Next"}
                    </button>
                </div>
            </form>
        </Container>
    )
}
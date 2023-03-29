import { FormEvent } from 'react';
import Container from 'react-bootstrap/Container';
import { useTheme } from '../../context/ThemeContext';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { SelectForm } from './SelectForm';
import { DetailForm } from './DetailForm';
import { InputSearchForm } from './InputSearchForm';

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
        <InputSearchForm />,
        <SelectForm />,
        <DetailForm />,
    ]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        next();
    }

    return (
        <Container
            style={{
                border: `1px solid ${currentTheme === 'dark' ? 'white' : 'black'}`,
                borderRadius: '5px',
                padding: '1rem',
                position: "relative",
                maxWidth: "max-content",
            }}
        >
            <form onSubmit={handleSubmit}>
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
                    <button type="submit">
                        {isLastStep ? "Finish" : "Next"}
                    </button>
                </div>
            </form>
        </Container>
    )
}
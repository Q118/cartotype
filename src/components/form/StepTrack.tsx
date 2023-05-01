import { Button } from "react-bootstrap";

type StepTrackProps = {
    editMode?: boolean;
    stepLength: number;
    currentStepIndex: number;
    step: JSX.Element;
    isFirstStep: boolean;
    isLastStep: boolean;
    back: () => void;
}

export function StepTrack({
    editMode = false,
    stepLength,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
}: StepTrackProps) {


    const BTN_STYLE = {
        width: "3rem",
        minWidth: 'fit-content',
        height: "3rem",
        padding: "0.3rem",
    };

    const renderBtn = (type: any) => {
        return (
            <Button
                type={type}
                variant="outline-light"
                className="rounded-circle cart-button"
                onClick={type === "button" ? back : () => { }}
                style={BTN_STYLE}>
                {type === "button" ? "Back" : isLastStep ? "Finish" : (isFirstStep && !editMode) ? "Search" : "Next"}
            </Button>
        )
    };

    return (
        <>
            {/* top corner position of step display */}
            <div style={{
                position: 'absolute',
                top: '.5rem',
                right: '.5rem'
            }}>
                {currentStepIndex + 1} / {stepLength}
            </div>
            {step}
            <div style={{
                marginTop: "1rem",
                // this will get our buttons to the far right side
                display: "flex",
                gap: ".5rem",
                justifyContent: "flex-end",
            }}>
                {!isFirstStep && renderBtn("button")}
                {renderBtn("submit")}
            </div>
        </>
    )
}

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
            {/* the stuff below will be in bottom right corner */}
            <div style={{
                marginTop: "1rem",
                // this will get our buttons to the far right side
                display: "flex",
                gap: ".5rem",
                justifyContent: "flex-end",
            }}>
                {!isFirstStep && <button type="button" onClick={back}>Back</button>}
                <button type="submit">
                    {isLastStep ? "Finish" : (isFirstStep && !editMode) ? "Search" : "Next"}
                </button>
            </div>
        </>
    )
}
import { ReactElement, useState } from "react";



export function useMultistepForm(steps: ReactElement[]) {

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    // console.log('currentStepIndex', currentStepIndex); // debug

    function next() {
        setCurrentStepIndex(i => {
            if (i >= steps.length - 1) return i; // bc already at last step
            return i + 1;
        });
    }

    function back() {
        setCurrentStepIndex(i => {
            if (i <= 0) return i; // bc already at first step
            return i - 1;
        });
    }

    function goTo(index: number) {
        setCurrentStepIndex(index);
    }



    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        back,
    };
}
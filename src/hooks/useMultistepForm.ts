import { ReactElement, useState, useEffect } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";


export function useMultistepForm(steps: ReactElement[], startStep: number | null = 0) {
    const { addNotificationToast } = useShoppingCart();
    const [ currentStepIndex, setCurrentStepIndex ] = useState(startStep || 0);

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

    function goTo(index: number) { setCurrentStepIndex(index); }

    function notify(message: string) { addNotificationToast(message); }


    return {
        currentStepIndex,
        step: steps[ currentStepIndex ],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        back,
        notify
    };
}
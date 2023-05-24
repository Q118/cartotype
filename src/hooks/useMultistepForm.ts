import { ReactElement, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
// import stuff from react-router-dom that will add # in to the urls that signify the step number
// for example, /checkout#1, /checkout#2, /checkout#3, etc.
// import { useLocation, useHistory } from "react-router-dom";



//? is there a way to tell the form component what step its on SO THAT it can render at any point step it wants? 



export function useMultistepForm(steps: ReactElement[]) {
    const { addNotificationToast } = useShoppingCart();
    const [ currentStepIndex, setCurrentStepIndex ] = useState(0);
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

    function notify(message: string) {
        // setNotificationToasts([...notificationToasts, { message, show: true }]);
        addNotificationToast(message);
    }

    /**
     * @function renderAtStep - renders the component at the given step index supplied by its parent component
     * @param {number} stepIndex - the index of the step to render
     */
    // wait goTo already does this
    // function renderAtStep(stepIndex: number) {
    //     if (stepIndex < 0 || stepIndex > steps.length - 1) {
    //         console.error(`Invalid step index supplied to renderAtStep: ${stepIndex}`);
    //         return null;
    //     }
    //     return steps[ stepIndex ];
    // }



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
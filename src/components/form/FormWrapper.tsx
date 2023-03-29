/**
 * This component is used to wrap the form fields and the submit button
 * for consistency in styling.
 * and we pass in the title as a prop
 * what about querying, handle in here or in FormApp?
 * 
 */

import { ReactNode } from "react";

type FormWrapperProps = {
    title: string
    children: ReactNode
}

export function FormWrapper({ title, children }: FormWrapperProps) {
    return (
        <>
            <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
                {title}
            </h2>
            <div
                style={{
                    display: "grid",
                    gap: "1rem .5rem",
                    justifyContent: "flex-start",
                    gridTemplateColumns: "auto minmax(auto, 400px)",
                }}
            >
                {children}
            </div>
        </>
    )
}

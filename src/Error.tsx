import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>Fehler {error.status}</h1>
    
                <div>
                    {error.statusText}
                </div>
            </div>
        );
    } else {
        // TODO: kein Fehler
    }
}
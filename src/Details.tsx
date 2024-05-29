import { useLoaderData, Params, useOutletContext, /* ActionFunctionArgs, ParamParseKey, LoaderFunction */ } from "react-router-dom";
import { Item } from "./models/item";
import { editItem } from "./App";
import './Details.css'

export async function loader({ params }: { params: Params<"id"> }) {
    const id = params.id;
    return { id };
}

export function DetailsPage(): React.ReactElement {
    const [items, setItems]: [Item[], React.Dispatch<React.SetStateAction<Item[]>>] = useOutletContext();

    const data = useLoaderData() as { id: string };

    const itemIndex = items.findIndex((x) => x.id === data?.id);
    const item = items[itemIndex];

    if (item !== undefined) {
        return (
            <>
                <div>
                    <h1>Details: {item.title}</h1>
                </div>

                <div className="details__description">
                    <input value={item.description} onChange={(event) => editItem(items, setItems, itemIndex, {...item, description: event.target.value })} />
                </div>
            </>
        );
    } else {
        return ( <></> )
    }
}
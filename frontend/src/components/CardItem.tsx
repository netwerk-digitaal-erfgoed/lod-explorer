import Link from "next/link";
import React from "react";

type CardProps = {
    title: string;
    goPage: string;
    description?: string;
}

function CardItem(props: CardProps) {
  return (
    <div className="bg-white rounded overflow-hidden shadow-md">
        <Link href={props.goPage} className="">
            <div className="m-4">
                <h5 className="h-auto text-xl font-medium text-black">{props.title}</h5>
                <p className="text-slate-500">{props.description}</p>
            </div>
        </Link>
    </div>
  );
}

export default CardItem;

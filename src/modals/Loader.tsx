import React, {JSX} from "react";
import {Loader2} from "lucide-react";

export default function Loader(): JSX.Element{
    return (
        <div className="bg-white h-[150px] w-[220px] rounded-xl flex flex-col justify-center items-center">
            <Loader2 className="text-primary animate-spin w-12 h-12"/>
            <p className="text-primary font-semibold text-sm mt-4">Un instant s&#39;il vous plait ...</p>
        </div>
    )
}
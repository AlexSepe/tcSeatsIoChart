import { Component, ReactNode, createElement } from "react";
import { TcSeatsioChartPreviewProps } from "../typings/TcSeatsioChartProps";

export class preview extends Component<TcSeatsioChartPreviewProps> {
    render(): ReactNode {
        return <div>NO RENDER</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/TcSeatsioChart.css");
}

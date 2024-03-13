/**
 * This file was generated from TcSeatsioChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, EditableValue } from "mendix";

export interface TcSeatsioChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    workspace_key: DynamicValue<string>;
    event_key: DynamicValue<string>;
    selectedSeats: EditableValue<string>;
}

export interface TcSeatsioChartPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    workspace_key: string;
    event_key: string;
    selectedSeats: string;
    onChange: {} | null;
}

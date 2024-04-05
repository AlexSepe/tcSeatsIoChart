/**
 * This file was generated from TcSeatsioChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export type CategoryFiltersSortByEnum = "none" | "name" | "price" | "priceDescending";

export interface TcSeatsioChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    workspace_key: DynamicValue<string>;
    event_key: DynamicValue<string>;
    holdToken: DynamicValue<string>;
    pricing: DynamicValue<string>;
    selectedObjsList: EditableValue<string>;
    filteredCategories?: EditableValue<string>;
    dynamicDataSource?: ListValue;
    MessageKeyAttribute?: ListAttributeValue<string>;
    MessageValueAttribute?: ListAttributeValue<string>;
    categoryFiltersEnabled: boolean;
    categoryFiltersMultiSelect: boolean;
    categoryFiltersZoomOnSelect: boolean;
    categoryFiltersSortBy: CategoryFiltersSortByEnum;
    onChange?: ActionValue;
    onChartRendered?: ActionValue;
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
    holdToken: string;
    pricing: string;
    selectedObjsList: string;
    filteredCategories: string;
    dynamicDataSource: {} | { caption: string } | { type: string } | null;
    MessageKeyAttribute: string;
    MessageValueAttribute: string;
    categoryFiltersEnabled: boolean;
    categoryFiltersMultiSelect: boolean;
    categoryFiltersZoomOnSelect: boolean;
    categoryFiltersSortBy: CategoryFiltersSortByEnum;
    onChange: {} | null;
    onChartRendered: {} | null;
}

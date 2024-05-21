"use client";

import { Component, ReactNode, createElement } from "react";
import { ObjectItem } from "mendix";

import { TcSeatsioChartContainerProps } from "../typings/TcSeatsioChartProps";

import "./ui/TcSeatsioChart.css";
import {
    Pricing,
    SeatingChart,
    SeatsioSeatingChart,
    SelectableObjectProps,
    SelectionLimiter,
    TicketTypeJson
} from "@seatsio/seatsio-react";

export const { format: formatPrice } = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

declare global {
    interface Window {
        _seatingChart: SeatingChart | any;
    }
}

export class TcSeatsioChart extends Component<TcSeatsioChartContainerProps> {
    private chart: any;
    private readonly onObjectSelectedHandle = this.onObjectSelected.bind(this);
    private readonly onObjectDeselectedHandle = this.onObjectDeselected.bind(this);
    private readonly onChartRenderedHandle = this.onChartRendered.bind(this);

    private updateSelectedSeats(): void {
        const chartCast = this.chart as SeatingChart;
        if (chartCast.listSelectedObjects) {
            chartCast
                .listSelectedObjects()
                // .then(values => selectedList2 = values)
                .then((values: SelectableObjectProps[]) => {
                    const valuesMap = values.map(v => {
                        const selObj = {
                            seatId: (v as any).seatId,
                            // category: v.category,
                            categoryKey: v.category?.key,
                            ticketType: v.selectedTicketType,
                            // pricing: v.pricing,
                            price:
                                v.pricing.price ||
                                v.pricing.ticketTypes?.find(p => p.ticketType === v.selectedTicketType)?.price,
                            label: v.label
                        };
                        return selObj;
                    });
                    console.log("updateSelectedSeats1 -> listSelectedObjects:: ", values);
                    console.log("updateSelectedSeats2 -> listSelectedObjectsMAP :: ", valuesMap);

                    const selectedObjsListJson = JSON.stringify(valuesMap);
                    this.props.selectedObjsList.setValue(selectedObjsListJson);

                    if (this.props.onChange) {
                        this.props.onChange.execute();
                    }
                });
        }

        const selectedObjects = chartCast.selectedObjects;
        console.log("updateSelectedSeats -> selectedObjects:: ", selectedObjects);

        // this.props.selectedSeats.setValue(selectedObjects.toString());
    }
    private onObjectSelected(object: SelectableObjectProps, selectedTicketType: TicketTypeJson): void {
        console.log("onObjectSelected -> object:: ", object, " selectedTicketType::", selectedTicketType);
        this.updateSelectedSeats();
    }

    private onObjectDeselected(object: SelectableObjectProps, selectedTicketType: TicketTypeJson): void {
        console.log("onObjectDeselected -> object:: ", object, " selectedTicketType::", selectedTicketType);
        this.updateSelectedSeats();
    }

    private onChartRendered(createdChart: SeatingChart): void {
        this.chart = createdChart;
        window._seatingChart = createdChart;
        console.log("onChartRendered -> object:: ", createdChart);
        if (this.props.onChartRendered) {
            this.props.onChartRendered.execute();
        }
    }

    render(): ReactNode {
        const pricingString = this.props.pricing.value || "[]";
        const workspaceKey = this.props.workspace_key.value || "workspace_key_undefined";
        const event = this.props.event_key.value || "event_key_undefined";
        const holdToken = this.props.holdToken.value || "";

        const pricing = JSON.parse(pricingString);
        console.log("render -> workspaceKey:: ", workspaceKey, " event::", event, " pricing::", pricing);

        const maxSelectedObjectsString = this.props.maxSelectedObjects.value || "8";
        const maxSelectedObjects = JSON.parse(maxSelectedObjectsString);

        const categoryFilterOptions = {
            enabled: this.props.categoryFiltersEnabled,
            multiSelect: this.props.categoryFiltersMultiSelect,
            zoomOnSelect: this.props.categoryFiltersZoomOnSelect,
            sortBy: this.props.categoryFiltersSortBy
        };

        type MessageStringRec = Record<string, string>;
        const customMessages: MessageStringRec = {};

        this.props.dynamicDataSource?.items?.forEach((item: ObjectItem) => {
            const messageKey = this.props.MessageKeyAttribute?.get(item)?.value || "ignored";
            const messageValue = this.props.MessageValueAttribute?.get(item).value || "ignored";
            customMessages[messageKey] = messageValue;
        });

        return (
            <SeatsioSeatingChart
                workspaceKey={workspaceKey}
                event={event}
                pricing={pricing as Pricing}
                priceFormatter={price => formatPrice(price)}
                region="sa"
                language="pt"
                chartJsUrl={"https://cdn-sa.seatsio.net/chart.js"}
                onChartRendered={this.onChartRenderedHandle}
                session="manual"
                categoryFilter={categoryFilterOptions}
                showFullScreenButton={false}
                holdToken={holdToken}
                onObjectSelected={this.onObjectSelectedHandle}
                onObjectDeselected={this.onObjectDeselectedHandle}
                messages={customMessages}
                maxSelectedObjects={maxSelectedObjects as SelectionLimiter}
            />
        );
    }
}

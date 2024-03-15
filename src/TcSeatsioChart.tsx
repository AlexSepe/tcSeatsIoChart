"use client";

import { Component, ReactNode, createElement } from "react";

import { TcSeatsioChartContainerProps } from "../typings/TcSeatsioChartProps";

import "./ui/TcSeatsioChart.css";
import {
    Pricing,
    SeatingChart,
    SeatsioSeatingChart,
    SelectableObjectProps,
    TicketTypeJson
} from "@seatsio/seatsio-react";

export const { format: formatPrice } = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

export class TcSeatsioChart extends Component<TcSeatsioChartContainerProps> {
    private chart: any;
    private readonly onObjectSelectedHandle = this.onObjectSelected.bind(this);
    private readonly onObjectDeselectedHandle = this.onObjectDeselected.bind(this);

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

    render(): ReactNode {
        const pricingString = this.props.pricing.value || "[]";
        const workspaceKey = this.props.workspace_key.value || "workspace_key_undefined";
        const event = this.props.event_key.value || "event_key_undefined";
        const holdToken = this.props.holdToken.value || "";

        const pricing = JSON.parse(pricingString);
        console.log("render -> workspaceKey:: ", workspaceKey, " event::", event, " pricing::", pricing);

        return (
            <SeatsioSeatingChart
                workspaceKey={workspaceKey}
                event={event}
                pricing={pricing as Pricing}
                priceFormatter={price => formatPrice(price)}
                region="sa"
                language="pt"
                chartJsUrl={"https://cdn-sa.seatsio.net/chart.js"}
                onChartRendered={createdChart => {
                    this.chart = createdChart;
                }}
                session="continue"
                holdToken={holdToken}
                onObjectSelected={this.onObjectSelectedHandle}
                onObjectDeselected={this.onObjectDeselectedHandle}
            />
        );
    }
}

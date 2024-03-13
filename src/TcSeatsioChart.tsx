"use client"

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

export class TcSeatsioChart extends Component<TcSeatsioChartContainerProps> {
    private chart: any;
    private readonly onObjectSelectedHandle = this.onObjectSelected.bind(this);
    private readonly onObjectDeselectedHandle = this.onObjectDeselected.bind(this);

    private updateSelectedSeats(): void {
        const chartCast =  this.chart as SeatingChart
        //let selectedList2: SelectableObjectProps[];
        chartCast
            .listSelectedObjects()
            //.then(values => selectedList2 = values)
            .then((values: SelectableObjectProps[]) => {
                console.log("updateSelectedSeats -> listSelectedObjects:: ", values);
            });

        const selectedObjects = chartCast.selectedObjects;
        console.log("updateSelectedSeats -> selectedObjects:: ", selectedObjects);

        this.props.selectedSeats.setValue(selectedObjects.toString());
        
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
        const pricing: Pricing = [
            { category: "1", price: 30 },
            { category: "2", price: 40 }
        ];

        const workspaceKey = this.props.workspace_key.value || "workspace_key_undefined";
        const event = this.props.event_key.value || "event_key_undefined";

        console.log("render -> workspaceKey:: ", workspaceKey, " event::", event);

        return (
            <SeatsioSeatingChart
                workspaceKey={workspaceKey}
                event={event}
                pricing={pricing}
                region="sa"
                chartJsUrl={"https://cdn-sa.seatsio.net/chart.js"}
                onChartRendered={createdChart => {
                    this.chart = createdChart;
                }}
                onObjectSelected={this.onObjectSelectedHandle}
                onObjectDeselected={this.onObjectDeselectedHandle}
            />
        );
    }
}

import * as React from "react";

const { ReactDataGrid, ReactDataGridColumnLevel, ReactDataGridColumn, ReactInstance } = require('flexicious-react-datagrid');
const { ReactDataGridStyles } = require('flexicious-react-datagrid-styles');

const filterSearchDataPath = "searchModel";

let dynamicColumnsCounter = 0;
let counter = 0;

export class BaseGridView extends React.Component<null, null> {
    gridRef: any;

    constructor(props: any) {
        super(props);
    }

    render() {

        let contStyle: React.CSSProperties = {
            position: "relative",
            height: '100%'
        }

        const styles = {
            headerColors: 0x8A8888,
            headerRollOverColors: 0x8A8888,
            alternatingItemColors: [0xFFFFFF, 0xFFFFFF],

            rollOverColor: 0xAABFE8,
            activeCellColor: 0xAABFE8,
            selectionColor: 0xC9D6F1,

            alternatingTextColors: [0x000000, 0x000000],
            textSelectedColor: 0x000000,
            textRollOverColor: 0x000000,

            verticalGridLineColor: 0x666666, //696969
            horizontalGridLineColor: 0x999999,

            footerVerticalGridLineColor: 0x999999,
            footerVerticalGridLines: true,
            footerVerticalGridLineThickness: 1,
            footerRollOverColors: 0xBFBFBF,
            footerColors: 0xBFBFBF,
            fontSize: "0.6875rem",

            columnGroupVerticalGridLineColor: 0x666666,
            columnGroupVerticalGridLines: true,
            columnGroupVerticalGridLineThickness: 1,

            columnGroupHorizontalGridLineColor: 0x666666,
            columnGroupHorizontalGridLines: true,
            columnGroupHorizontalGridLineThickness: 1,
            columnGroupDrawTopBorder: true,

            lockedSeperatorColor: 0x6f6f6f,
			lockedSeperatorThickness: 1,

            verticalGridLines: false
        }

        const data = [{"projectStageShortName":"Delivery","projectName":"Target 1","projectCode":"P001131-002","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":8,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":501311,"projectLabel":"Target 1 (P001131-002)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607348287","systemRevenue":240},{"projectStageShortName":"Delivery","projectName":"ETEAM - R16","projectCode":"P001140-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":521875,"projectLabel":"ETEAM - R16 (P001140-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607368851","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Parkview Engagement (FP)","projectCode":"P001190-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":20,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":536925,"projectLabel":"Parkview Engagement (FP) (P001190-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607383901","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Bulk Loader","projectCode":"E001183-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":541619,"projectLabel":"Bulk Loader (E001183-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607388595","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Time Project","projectCode":"P001212-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":542945,"projectLabel":"Time Project (P001212-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607389921","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Task Notifications - FLAT","projectCode":"P001230-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547146,"projectLabel":"Task Notifications - FLAT (P001230-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394122","systemRevenue":50000},{"projectStageShortName":"Delivery","projectName":"Time Entry Refactoring","projectCode":"P001231-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547150,"projectLabel":"Time Entry Refactoring (P001231-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394126","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Revenue Schedule - B15","projectCode":"P001243-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":16,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547195,"projectLabel":"Revenue Schedule - B15 (P001243-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394171","systemRevenue":100000},{"projectStageShortName":"Delivery","projectName":"Copy of Time Project","projectCode":"P001244-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547197,"projectLabel":"Copy of Time Project (P001244-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394173","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"SC-B17-Main","projectCode":"P001248-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547205,"projectLabel":"SC-B17-Main (P001248-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394181","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"SC-Keep-Main-II","projectCode":"P001249-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547206,"projectLabel":"SC-Keep-Main-II (P001249-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394182","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Service Contracts - A","projectCode":"P001250-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547207,"projectLabel":"Service Contracts - A (P001250-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394183","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Payment Voucher Tests","projectCode":"P001313-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547323,"projectLabel":"Payment Voucher Tests (P001313-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394299","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Parkview Engagement (FP2)","projectCode":"P001190-003","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547370,"projectLabel":"Parkview Engagement (FP2) (P001190-003)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394346","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Anton Invoice Milestone Test","projectCode":"AIMT-P-01","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":5,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547373,"projectLabel":"Anton Invoice Milestone Test (AIMT-P-01)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394349","systemRevenue":500},{"projectStageShortName":"Delivery","projectName":"Anton Invoice Milestone Test 2","projectCode":"AIMT-P-02","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547374,"projectLabel":"Anton Invoice Milestone Test 2 (AIMT-P-02)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394350","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Anton Invoice Milestone Test 3","projectCode":"AIMT-P-03","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547375,"projectLabel":"Anton Invoice Milestone Test 3 (AIMT-P-03)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394351","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Closed Accounting Period","projectCode":"P001330-001","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547422,"projectLabel":"Closed Accounting Period (P001330-001)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394398","systemRevenue":0},{"projectStageShortName":"Delivery","projectName":"Active Project","projectCode":"P001330-002","primaryClientName":"Projector PSA","engagementTypeShortName":"T&M","projectManagerUserDisplayName":"Bettina Borces","engagementTypeBillableFlag":true,"hours":0,"engagementCurrencyCode":"USD","engagementCurrencyDecimalDigits":2,"projectID":547423,"projectLabel":"Active Project (P001330-002)","projectManagerUserEmailAddress":"bettina@projectorpsa.com","projectUid":"1152921504607394399","systemRevenue":0}];

        return (
            <div style={contStyle}>
                <ReactDataGrid
                    width={"100%"}
                    height={400}
                    borderThickness={0}
                    dataProvider={data}
                    ref={(grid: any) => { this.gridRef = grid; }}
                    variableHeaderHeight
                    rowHeight={25}
                    generateColumns={false}
                    styles={styles}
                    enableDrillDown
                    enableFooters
                    enableDynamicLevels
                    parentGridView={this}
                    enableHeightAutoAdjust={false}>
                        <ReactDataGridColumnLevel>
                            <ReactDataGridColumn key={0} width={80} headerText={"Project Stage Short Name"} dataField={"projectStageShortName"} headerWordWrap={true} enableCellClickRowSelect={false} />
                            <ReactDataGridColumn key={1} width={180} headerText={"Project Name"} dataField={"projectName"} headerWordWrap={true} enableCellClickRowSelect={false} />
                            <ReactDataGridColumn key={2} width={100} headerText={"System Hourly Rate"} dataField={"systemHourlyRate"} headerWordWrap={true} enableCellClickRowSelect={false} />
                            <ReactDataGridColumn key={3} width={130} headerText={"Project Code"} dataField={"projectCode"} headerWordWrap={true} enableCellClickRowSelect={false} />
                            <ReactDataGridColumn key={4} width={180} headerText={"Primary Client Name"} dataField={"primaryClientName"} headerWordWrap={true} enableCellClickRowSelect={false} />
                            <ReactDataGridColumn key={5} width={80} headerText={"Engagement Type Short Name"} dataField={"engagementTypeShortName"} headerWordWrap={true} enableCellClickRowSelect={false} />
                            <ReactDataGridColumn key={6} width={130} headerText={"Project Manager Display Name"} dataField={"projectManagerUserDisplayName"} headerWordWrap={true} enableCellClickRowSelect={false} />
                            <ReactDataGridColumn key={7} width={80} headerText={"Engagement Type Billable?"} dataField={"engagementTypeBillableFlag"} headerWordWrap={true} enableCellClickRowSelect={false} />
                            <ReactDataGridColumn key={8} width={60} headerText={"Hours"} dataField={"hours"} headerWordWrap={true} enableCellClickRowSelect={false} />
                        </ReactDataGridColumnLevel>
                </ReactDataGrid>
			</div>
		);
    }

    
}



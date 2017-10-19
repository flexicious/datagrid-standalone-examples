/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
(function (window) {
    "use strict";
    var ExcelBuilderExporter, uiUtil = flexiciousNmsp.UIUtils, flxConstants = flexiciousNmsp.Constants;
    /**
     * Exports the grid in CSV format
     * @constructor
     * @namespace
     * @extends Exporter
     */
    ExcelBuilderExporter = function () {

        /**
         * Writes the header of the grid (columns) in csv format
         * @param grid
         * @return
            *
         */


        /**
         * object representing the columns
         */
        this.columns = [];

        /**
         * object representing the data
         */
        this.data = [];

    };
    flexiciousNmsp.ExcelBuilderExporter = ExcelBuilderExporter; //add to name space
    ExcelBuilderExporter.prototype = new flexiciousNmsp.Exporter(); //setup hierarchy
    ExcelBuilderExporter.prototype.typeName = ExcelBuilderExporter.typeName = 'ExcelBuilderExporter';//for quick inspection
    ExcelBuilderExporter.prototype.getClassNames = function () {
        return ["ExcelBuilderExporter", "Exporter"];
    };
    ExcelBuilderExporter.prototype.writeHeader = function (grid) {

        this.buildHeader(grid);
        return "";

    };
    /**
     * @private
     * @param grid
     * @return
        *
     */
    ExcelBuilderExporter.prototype.buildHeader = function (grid) {

        var colIndex = 0;

        for (var i = 0; i < grid.getExportableColumns().length; i++) {
            var col = grid.getExportableColumns()[i];
            if (!this.isIncludedInExport(col))
                continue;
            this.columns.push(flexiciousNmsp.Exporter.getColumnHeader(col, colIndex));
            colIndex++;
        }

    };
    ExcelBuilderExporter.prototype.uploadForEcho = function (body, exportOptions) {

        var workbook = ExcelBuilder.Builder.createWorkbook();
        var worksheet = workbook.createWorksheet({ name: 'TestSheet' });
        // var stylesheet = workbook.getStyleSheet();

        var table = new ExcelBuilder.Table();
        // table.styleInfo.themeStyle = "TableStyleDark2";
        table.setReferenceRange([1, 1], [this.columns.length, this.data.length]);
        table.setTableColumns(this.columns);
        worksheet.sheetView.showGridLines = true;
        worksheet.setData([this.columns, ...this.data]);

        workbook.addWorksheet(worksheet);
        worksheet.addTable(table);
        workbook.addTable(table);

        const isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g) || !!navigator.userAgent.match(/Edge/g);

        ExcelBuilder.Builder.createFile(workbook, { type: isIE ? 'blob' : 'base64' })
            .then(function (data) {
                if (isIE) {
                    var blob = new Blob([data], { type: 'base64' });
                    saveAs(blob, exportOptions.exportFileName + "." + ExcelBuilderExporter.prototype.getExtension());
                } else {
                    const saveLink = document.createElement("a");
                    saveLink.download = exportOptions.exportFileName + "." + ExcelBuilderExporter.prototype.getExtension();
                    saveLink.href = "data:" + ExcelBuilderExporter.prototype.getContentType() + ";base64," + data;
                    saveLink.style.display = "none";
                    document.body.appendChild(saveLink);
                    saveLink.click();
                    document.body.removeChild(saveLink);
                }
            });

        this.columns = [];
        this.data = [];

        uiUtil.removePopUp(exportOptions.exportOptionsView);
    };
    /**
     * Writes an individual record in csv format
     * @param grid
     * @param record
     * @return
        *
     */
    ExcelBuilderExporter.prototype.writeRecord = function (grid, record) {

        var colIndex = 0;

        var item = [];
        for (var i = 0; i < grid.getExportableColumns().length; i++) {
            var col = grid.getExportableColumns()[i];
            if (!this.isIncludedInExport(col))
                continue;
            var value = col.itemToLabel(record);
            item.push(isNaN(value) ? value : Number(value));
        }
        this.data.push(item);
        return "";

    };


    /**
     * Writes the footer in CSV format
     * @param grid
     * @param dataProvider
     */
    ExcelBuilderExporter.prototype.writeFooter = function (grid, dataProvider) {

        return "";

    };

    /**
     * Extension of the download file.
     * @return
        *
     */
    ExcelBuilderExporter.prototype.getExtension = function () {
        return "xlsx";
    };
    /**
     * Returns the content type so MS Excel launches
     * when the exporter is run.
     * @return
        *
     */
    ExcelBuilderExporter.prototype.getContentType = function () {
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    };
    /**
     * Name of the exporter
     * @return
        *
     */
    ExcelBuilderExporter.prototype.getName = function () {
        return "Excel Custom";
    };
}(window));
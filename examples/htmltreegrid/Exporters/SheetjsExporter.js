/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
(function (window) {
  "use strict";
  var Sheetjs_Exporter, uiUtil = flexiciousNmsp.UIUtils, flxConstants = flexiciousNmsp.Constants;
  /**
   * Exports the grid in CSV format
   * @constructor
   * @namespace
   * @extends Exporter
   */
  Sheetjs_Exporter = function () {

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
  flexiciousNmsp.Sheetjs_Exporter = Sheetjs_Exporter; //add to name space
  Sheetjs_Exporter.prototype = new flexiciousNmsp.Exporter(); //setup hierarchy
  Sheetjs_Exporter.prototype.typeName = Sheetjs_Exporter.typeName = 'Sheetjs_Exporter';//for quick inspection
  Sheetjs_Exporter.prototype.getClassNames = function () {
    return ["Sheetjs_Exporter", "Exporter"];
  };
  Sheetjs_Exporter.prototype.writeHeader = function (grid) {

    this.buildHeader(grid);
    return "";

  };
  /**
   * @private
   * @param grid
   * @return
   *
   */
  Sheetjs_Exporter.prototype.buildHeader = function (grid) {

    var colIndex = 0;

    for (var i = 0; i < grid.getExportableColumns().length; i++) {
      var col = grid.getExportableColumns()[i];
      if (!this.isIncludedInExport(col))
        continue;
      this.columns.push(flexiciousNmsp.Exporter.getColumnHeader(col, colIndex));
      colIndex++;
    }

  };
  Sheetjs_Exporter.prototype.uploadForEcho = function (body, exportOptions) {

    var new_ws = XLSX.utils.aoa_to_sheet([this.columns, ...this.data]);

    /* build workbook */
    var new_wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_wb, new_ws, 'SheetJS');

    /* write file and trigger a download */
    var wbout = XLSX.write(new_wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    var fname = exportOptions.exportFileName + "." + Sheetjs_Exporter.prototype.getExtension();
    try {
      saveAs(new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }), fname);
    } catch (e) { if (typeof console != 'undefined') console.log(e, wbout); }

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
  Sheetjs_Exporter.prototype.writeRecord = function (grid, record) {

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

  Sheetjs_Exporter.prototype.s2ab = function (s) {
    var b = new ArrayBuffer(s.length), v = new Uint8Array(b);
    for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i) & 0xFF;
    return b;
  }


  /**
   * Writes the footer in CSV format
   * @param grid
   * @param dataProvider
   */
  Sheetjs_Exporter.prototype.writeFooter = function (grid, dataProvider) {

    var colIndex = 0;
    var footerColumns = [];

    if (this.exportOptions.includeFooters) {
      var str = "";
      var i = 0;
      if (!this.reusePreviousLevelColumns) {
        while (i++ < this.getNestDepth()) {
          footerColumns.push('');
        }
      }

      for (var i = 0; i < grid.getExportableColumns().length; i++) {
        var col = grid.getExportableColumns()[i];
        if (!this.isIncludedInExport(col))
          continue;
        var spaces = this.getSpaces(col);
        var value = col.calculateFooterValue(dataProvider);
        footerColumns.push(spaces?spaces + value:(value?isNaN(value) ? value : Number(value):""));
        colIndex++;
      }
    }

    this.data.push(footerColumns);

  };

  /**
   * Extension of the download file.
   * @return
   *
   */
  Sheetjs_Exporter.prototype.getExtension = function () {
    return "xlsx";
  };
  /**
   * Returns the content type so MS Excel launches
   * when the exporter is run.
   * @return
   *
   */
  Sheetjs_Exporter.prototype.getContentType = function () {
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  };
  /**
   * Name of the exporter
   * @return
   *
   */
  Sheetjs_Exporter.prototype.getName = function () {
    return "Excel Custom";
  };
}(window));

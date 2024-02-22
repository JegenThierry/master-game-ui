/**
 * Corresponding C# Class
 * public DateTime Date { get; set; }
 * public string Text { get; set; }
 * public string Id { get; set; }
 * public string StartXPath { get; set; }
 * public string EndXPath { get; set; }
 * public int StartOffset { get; set; }
 * public int EndOffset { get; set; }
 */

import { MarkingType } from "./enums";

export class MarkingData {
  link: string;
  date: Date;
  text: string;
  id: string;
  startXPath: string;
  endXPath: string;
  startOffset: number;
  endOffset: number;
  markingType: MarkingType;

  constructor(markingData: MarkingData, link: string) {
    if (markingData) {
      this.date = new Date(markingData.date);
      this.text = markingData.text;
      this.id = markingData.id;
      this.startXPath = markingData.startXPath;
      this.endXPath = markingData.endXPath;
      this.startOffset = markingData.startOffset;
      this.endOffset = markingData.endOffset;
      this.link = link;
      this.markingType = markingData.markingType;
      return;
    }
    // Should not occur under normal circumstances
    this.link = link;
    this.date = new Date();
    this.text = "";
    this.id = "";
    this.startXPath = "";
    this.endXPath = "";
    this.startOffset = -1;
    this.endOffset = -1;
    this.markingType = MarkingType.NotUnderstandable;
  }

  getDataExceptLink = () => {
    return {
      date: this.date,
      text: this.text,
      id: this.id,
      startXPath: this.startXPath,
      endXPath: this.endXPath,
      startOffset: this.startOffset,
      endOffset: this.endOffset,
      markingType: this.markingType.toString(),
    };
  };
}

import { TeamId } from "./enums";

export class WebPage {
  public id: number;
  public title: string;
  public url: string;
  public description: string;
  public imageUrl: string;
  public controlledByTeam: TeamId;
  public contributionCountRed:number;
  public contributionCountBlue:number;

  constructor(wp: WebPage) {
    if (wp) {
      this.id = wp.id;
      this.title = wp.title;
      this.url = wp.url;
      this.description = wp.description;
      this.imageUrl = wp.imageUrl;
      this.controlledByTeam = wp.controlledByTeam || TeamId.Neutral;
      this.contributionCountRed = wp.contributionCountRed;
      this.contributionCountBlue = wp.contributionCountBlue;
      return;
    }
    this.id = -1;
    this.title = "";
    this.url = "";
    this.description = "";
    this.imageUrl = "";
    this.controlledByTeam = TeamId.Neutral;
    this.contributionCountBlue = 0;
    this.contributionCountRed = 0;
  }
}

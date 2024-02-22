export default class Location {
    public id: number = 0;
    public name: string = "";
    public gameName: string = "";
    public description: string = "";
    public groupTitle: string = "";
    public url: string = "" as string;
    public isMajorLocation: boolean = false;
    public isApproved: boolean = false;
    public imageSrc: string = "";
    public positionX: number = 0;
    public positionY: number = 0;
    public totalContributions: number = 0;

    constructor(location?: Location) {
        if (!location) return;

        this.id = location.id;
        this.name = location.name
        this.description = location.description
        this.groupTitle = location.groupTitle
        this.url = location.url
        this.isMajorLocation = location.isMajorLocation
        this.isApproved = location.isApproved
        this.imageSrc = location.imageSrc
        this.positionX = location.positionX
        this.positionY = location.positionY
        this.gameName = location.gameName
        this.totalContributions = location.totalContributions;
    }
}
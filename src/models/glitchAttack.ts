export default class GlitchAttack {
	public id = 0 as number;
	public locationName = "" as string;
	public attackValue = 0 as number;
	public attackDate = new Date() as Date;
	public defenseValue = 0 as number;
	public isDefended = false as boolean;
	public isConsecutiveAttack = false as boolean;

	constructor(attack?: GlitchAttack) {
		if (!attack) return;
		this.id = attack.id;
		this.locationName = attack.locationName;
		this.attackValue = attack.attackValue;
		this.attackDate = new Date(attack.attackDate);
		this.defenseValue = attack.defenseValue;
		this.isDefended = attack.isDefended;
		this.isConsecutiveAttack = attack.isConsecutiveAttack;
	}
}

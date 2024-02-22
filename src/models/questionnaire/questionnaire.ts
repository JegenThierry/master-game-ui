export default class Questionnaire {
	public id: number = -1;
	public name: string = "";
	public amountOfQuestions: number = -1;

	constructor(questionnaire?: Questionnaire) {
		if (!questionnaire) return;

		this.id = questionnaire.id;
		this.name = questionnaire.name;
		this.amountOfQuestions = questionnaire.amountOfQuestions;
	}
}

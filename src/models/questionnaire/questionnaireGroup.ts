import Questionnaire from "./questionnaire";

export default class QuestionnaireGroup {
	public id: number = -1;
	public urlExtension: string = "";
	public name: string = "";
	public questionnaires: Questionnaire[] = [];

	constructor(questionnaireGroup?: QuestionnaireGroup) {
		if (!questionnaireGroup) return;

		this.id = questionnaireGroup.id;
		this.urlExtension = questionnaireGroup.urlExtension;
		this.name = questionnaireGroup.name;
		this.questionnaires = questionnaireGroup.questionnaires.map((x) => new Questionnaire(x));
	}
}

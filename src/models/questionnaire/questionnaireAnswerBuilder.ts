import Answer from "./answer";

export class QuestionnaireAnswerBuilder {
	public questionnaireId: number = -1;
	public questionnaireGroupId: number = -1;
	public answers: Map<string, Answer> = new Map();

	public setAnswerForQuestion(question: string, answer: string): QuestionnaireAnswerBuilder {
		this.answers.set(question, new Answer(question, answer));
		return this;
	}

	public setQuestionnaireId(id: number): QuestionnaireAnswerBuilder {
		this.questionnaireId = id;
		return this;
	}

	public setQuestionnaireGroupId(id: number): QuestionnaireAnswerBuilder {
		this.questionnaireGroupId = id;
		return this;
	}

	private getAnswerArray(): Answer[] {
		return Array.from(this.answers.values());
	}

	public build(): { questionnaireId: number; questionnaireGroupId: number; answers: Answer[] } {
		return {
			questionnaireId: this.questionnaireId,
			questionnaireGroupId: this.questionnaireGroupId,
			answers: this.getAnswerArray(),
		};
	}
}
